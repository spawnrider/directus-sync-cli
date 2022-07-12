/* eslint-disable max-depth */
import {Command, Flags} from '@oclif/core'
import {DirectusConfig, getConfig, listConfig} from '../../api/config'
import * as chalk from 'chalk'
import utils from '../../shared/utils'
import directusApi from '../../api/directus-api'
import Table = require('cli-table')

export default class Status extends Command {
  static description = 'Get the status for an environment'

  static examples = [
    '$ oex status',
    '$ oex status -n <NAME>',
    '$ oex status -d -n <NAME>',
  ]

  static flags = {
    name: Flags.string({
      char: 'n',
      description: 'Get the status of one configuration',
      required: false,
    }),
    detailed: Flags.boolean({
      char: 'd',
      description: 'Get services status of one configuration',
      required: false,
    }),
  }

  static args = []

  private configPath = `${this.config.configDir}/config.json`

  async run(): Promise<void> {
    const {flags} = await this.parse(Status)

    let configsToCheck = listConfig(this.configPath)

    if (flags.name) {
      const config = getConfig(flags.name!, this.configPath)

      if (!config) {
        this.error(`Configuration with name ${chalk.red(flags.name)} was not found`)
      }

      configsToCheck = [config]
    }

    const results = []
    for (const conf of configsToCheck) {
      results.push(this.getConfigurationStatus(conf, flags))
    }

    await Promise.all(results)
  }

  async getConfigurationStatus(config: DirectusConfig, flags: any): Promise<void> {
    const healthResponse: any = await directusApi.getHealth(config)
    const infoResponse: any = await directusApi.getInfo(config)

    const table = new Table({
      head: [
        chalk.bold.blueBright('service Id'),
        chalk.bold.blueBright('status'),
        chalk.bold.blueBright('release Id'),
        chalk.bold.blueBright('OS Type'),
        chalk.bold.blueBright('OS Version'),
        chalk.bold.blueBright('OS Uptime'),
        chalk.bold.blueBright('node Version'),
        chalk.bold.blueBright('node Uptime'),
      ],
    })
    table.push([healthResponse.serviceId, utils.getChalkForKeyword(healthResponse.status)(healthResponse.status), healthResponse.releaseId, infoResponse.os.type, infoResponse.os.version, infoResponse.os.uptime, infoResponse.node.version, infoResponse.node.uptime])

    this.log(chalk.bold.blueBright(`Instance status for configuration ${config.name}`))
    this.log(table.toString())

    if (healthResponse.checks && flags.detailed) {
      const fullTable = new Table({
        head: [
          chalk.bold.blueBright('name'),
          chalk.bold.blueBright('status'),
          chalk.bold.blueBright('componentType'),
          chalk.bold.blueBright('observedUnit'),
          chalk.bold.blueBright('observedValue'),
          chalk.bold.blueBright('threshold'),
        ],
      })

      for (const key of Object.keys(healthResponse.checks)) {
        for (const serviceStatus of healthResponse.checks[key]) {
          const data: any = {
            name: key,
            status: '',
            componentType: '',
            observedUnit: '',
            observedValue: '',
            threshold: '',
          }

          for (const key of Object.keys(data)) {
            if (serviceStatus[key]) {
              if (key === 'status') {
                data[key] = utils.getChalkForKeyword(serviceStatus[key])(serviceStatus[key])
              } else {
                data[key] = serviceStatus[key]
              }
            }
          }

          const list = Object.entries(data).map(data => data[1])
          fullTable.push([...list])
        }
      }

      this.log(chalk.bold.blueBright('Services status'))
      this.log(fullTable.toString())
    }
  }
}

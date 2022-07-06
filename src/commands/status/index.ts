import {Command, Flags} from '@oclif/core'
import {directusApi} from '../../api/directus-api'
import {DirectusConfig, getConfig, listConfig} from '../../api/config'
import * as chalk from 'chalk'
import Table = require('cli-table')
import {table} from '@oclif/core/lib/cli-ux/styled/table'
import flags = table.flags

export default class Status extends Command {
  static description = 'Get the status for an environment'

  static examples = [
    `$ oex hello world
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {
    all: Flags.boolean({
      char: 'a',
      description: 'Get the status of all configurations',
      required: false,
      exclusive: ['name'],
    }),
    name: Flags.string({
      char: 'n',
      description: 'Get the status of one configuration',
      required: false,
      exclusive: ['all'],
    }),
  }

  static args = []

  private configPath = `${this.config.configDir}/config.json`

  async run(): Promise<void> {
    const {flags} = await this.parse(Status)

    if (!flags.all && !flags.name) {
      this.error('A config name or flag all must be specified')
    }

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
      results.push(this.getConfigurationStatus(conf))
    }

    await Promise.all(results)
  }

  async getConfigurationStatus(config: DirectusConfig): Promise<void> {
    const response: any = await directusApi.getHealth(config)

    const table = new Table({
      head: [
        chalk.bold.blueBright('name'),
        chalk.bold.blueBright('status'),
        chalk.bold.blueBright('releaseId'),
      ],
    })
    table.push([response.serviceId, response.status, response.releaseId])
    this.log(chalk.bold.blueBright(`Instance status for configuration ${config.name}`))
    this.log(table.toString())

    if (response.checks) {
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

      for (const key of Object.keys(response.checks)) {
        for (const serviceStatus of response.checks[key]) {
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
              data[key] = serviceStatus[key]
            }
          }

          const list = Object.entries(data).map(data => data[1])
          fullTable.push([...list])
        }
      }

      this.log(chalk.bold.blueBright('Service status'))
      this.log(fullTable.toString())
    }
  }
}

import {Command, Flags} from '@oclif/core'
import {getHealth} from '../../api/directus'
import {getConfig} from '../../api/config'
import Table = require('cli-table')
import * as chalk from 'chalk'

export default class Status extends Command {
  static description = 'Get the status for an environment'

  static examples = [
    `$ oex hello world
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {
    name: Flags.string({char: 'n', description: 'Name of the environement to check', required: true}),
  }

  static args = []

  private configPath = `${this.config.configDir}/config.json`

  async run(): Promise<void> {
    const {flags} = await this.parse(Status)
    const config = getConfig(flags.name, this.configPath)

    if (!config) {
      this.error(`No configuration with name ${flags.name} was found`)
    }

    const response: any = await getHealth(config)

    const table = new Table({
      head: [
        chalk.bold.blueBright('name'),
        chalk.bold.blueBright('status'),
        chalk.bold.blueBright('releaseId'),
      ],
    })
    table.push([response.serviceId, response.status, response.releaseId])
    this.log(chalk.bold.blueBright('Instance status'))
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

import {Command, Flags} from '@oclif/core'
import {listConfig} from '../../api/config'
import * as inquirer from 'inquirer'
import directusApi from '../../api/directus-api'

export default class Presets extends Command {
  static description = 'Get the status for an environment'

  static examples = [
    `$ oex hello world
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {
    force: Flags.boolean({
      char: 'f',
      description: 'Force comand if the version are not identical',
      required: false,
    }),
  }

  static args = []

  private configPath = `${this.config.configDir}/config.json`

  async run(): Promise<void> {
    const {flags} = await this.parse(Presets)

    const configList = listConfig(this.configPath)

    if (configList.length < 2) {
      this.error('At least two configurations must be added')
    }

    const {from} = await inquirer.prompt([
      {
        name: 'from',
        message: 'From configuration',
        type: 'list',
        choices: configList.map(config => {
          return {
            name: config.name,
            key: config.name,
            value: config,
          }
        }),
      },
    ])

    const {to} = await inquirer.prompt([
      {
        name: 'to',
        message: 'To configuration',
        type: 'list',
        choices: configList.filter(c => c.name !== from.name).map(config => {
          return {
            name: config.name,
            key: config.name,
            value: config,
          }
        }),
      },
    ])

    const statusFrom = await directusApi.getHealth(from)

    if (statusFrom.status !== 'ok') {
      this.error(`Directus instance ${from.name} is not up`)
    }

    const statusTo = await directusApi.getHealth(to)

    if (statusTo.status !== 'ok') {
      this.error(`Directus instance ${from.name} is not up`)
    }

    if (statusFrom.releaseId !== statusTo.releaseId && !flags.force) {
      this.error('Directus versions are not identical, moving preset might break, use -f')
    }

    this.log('ok')
  }
}

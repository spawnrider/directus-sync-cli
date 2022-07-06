import {Command, Flags} from '@oclif/core'
import {listConfig} from '../../api/config'
import * as inquirer from 'inquirer'

export default class Preset extends Command {
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
    const {flags} = await this.parse(Preset)

    const configList = listConfig(this.configPath)

    const response = await inquirer.prompt([
      {
        name: 'from configuration',
        type: 'list',
        choices: configList.map(config => {
          return {
            name: config.name,
            key: config.name,
            value: config.name,
          }
        }),
      },
    ])

    console.log(response)
  }
}

import {Command, Flags} from '@oclif/core'
import {DirectusConfig, listConfig, saveConfig} from '../../api/config'

export default class Remove extends Command {
  static description = 'Remove one or all directus config'

  static examples = [
    '$ oex env remove -a',
    '$ oex env remove -n <NAME>',
  ]

  static flags = {
    all: Flags.boolean({char: 'a', description: 'Remove all configuration', required: false}),
    name: Flags.string({char: 'n', description: 'Remove one configuration', required: false}),
  }

  static args = []

  private configPath = `${this.config.configDir}/config.json`

  async run(): Promise<void> {
    const {flags} = await this.parse(Remove)

    if (!flags.all && !flags.name) {
      this.error('A config name or flag -a must be specified')
    }

    if (flags.all) {
      saveConfig([], this.configPath)
      return
    }

    const environmentList: DirectusConfig[] = listConfig(this.configPath).filter(env => env.name !== flags.name)
    saveConfig(environmentList, this.configPath)
    this.log(JSON.stringify(environmentList))
  }
}

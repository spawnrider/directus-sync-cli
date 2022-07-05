import {Command, Flags} from '@oclif/core'
import {DirectusConfig, listConfig, saveConfig} from '../../api/config'

export default class Add extends Command {
  static description = 'Add a directus configuration'

  static examples = [
    '$ oex env add -n <NAME> -u <URL> -t <TOKEN>',
  ]

  static flags = {
    name: Flags.string({char: 'n', description: 'Name of the directus environment', required: true}),
    url: Flags.string({char: 'u', description: 'Base url of the directus', required: true}),
    token: Flags.string({char: 't', description: 'Access token of the directus', required: true}),
  }

  static args = []

  private configPath = `${this.config.configDir}/config.json`

  async run(): Promise<void> {
    const {flags} = await this.parse(Add)
    const environmentList: DirectusConfig[] = listConfig(this.configPath)

    environmentList.push({
      name: flags.name,
      url: flags.url,
      token: flags.token,
    })

    saveConfig(environmentList, this.configPath)

    this.log(JSON.stringify(environmentList))
  }
}

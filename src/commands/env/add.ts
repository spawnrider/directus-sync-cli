import {Command, Flags} from '@oclif/core'
import * as chalk from 'chalk'
import {DirectusConfig, listConfig, saveConfig} from '../../api/config'
import directusApi from '../../api/directus-api'

export default class Add extends Command {
  static description = 'Add a directus configuration'

  static examples = [
    '$ oex env add -n <NAME> -u <URL> -t <TOKEN>',
  ]

  static flags = {
    name: Flags.string({char: 'n', description: 'Name of the directus environment', required: true}),
    url: Flags.string({char: 'u', description: 'Base url of the directus', required: true}),
    token: Flags.string({char: 't', description: 'Access token of the directus', required: true}),
    check: Flags.boolean({char: 'c', description: 'Force adding environment without verification', required: false, default: true,  allowNo: true}),
  }

  static args = []

  private configPath = `${this.config.configDir}/config.json`

  async run(): Promise<void> {
    const {flags} = await this.parse(Add)
    const environmentList: DirectusConfig[] = listConfig(this.configPath)

    const config: DirectusConfig = {
      name: flags.name,
      url: flags.url,
      token: flags.token,
    }

    // Ping only if check is true
    const check: boolean = flags.check ? await this.doPing(config) : true

    if (check) {
      environmentList.push(config)
      saveConfig(environmentList, this.configPath)
      this.log(JSON.stringify(environmentList))
    } else {
      this.log(chalk.bold.red('Ping failed on this environment'))
      this.log('Use --no-check option if you really want to add it')
    }
  }

  async doPing(config: DirectusConfig): Promise<boolean> {
    try {
      const pong = await directusApi.getPing(config)
      return pong === 'pong'
    } catch (error: any) {
      const e: Error = error
      this.log(e.message)
      return false
    }
  }
}

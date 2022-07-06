import {Command} from '@oclif/core'
import {listConfig} from '../../api/config'
import * as chalk from 'chalk'
import Table = require('cli-table')

export default class List extends Command {
  static description = 'List all saved directus configs'

  static examples = [
    '$ oex list',
  ]

  static flags = {}

  static args = []

  private configPath = `${this.config.configDir}/config.json`

  async run(): Promise<void> {
    const table = new Table({
      head: [
        chalk.blueBright('name'),
        chalk.blueBright('url'),
        chalk.blueBright('token'),
      ],
    })

    for (const conf of listConfig(this.configPath)) {
      table.push([conf.name, conf.url, conf.token])
    }

    this.log(table.toString())
  }
}

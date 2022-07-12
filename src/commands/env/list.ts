import * as chalk from 'chalk';
import {DirectusSyncCliCommand} from '../../types/directus-sync-cli-command';
import Table = require('cli-table')

export default class List extends DirectusSyncCliCommand {
  static description = 'List all saved directus configs'

  static examples = [
    '$ oex list',
  ]

  static flags = {}

  static args = []

  async run(): Promise<void> {
    const table = new Table({
      head: [
        chalk.blueBright('name'),
        chalk.blueBright('url'),
        chalk.blueBright('token'),
      ],
    });

    for (const conf of this.listConfig()) {
      table.push([conf.name, conf.url, conf.token]);
    }

    this.log(table.toString());
  }
}

import {Flags} from '@oclif/core';
import * as chalk from 'chalk';
import {DirectusConfig, DirectusSyncCliCommand} from '../../types/directus-sync-cli-command';

export default class Remove extends DirectusSyncCliCommand {
  static description = 'Remove one or all directus config'

  static examples = [
    '$ oex env remove -a',
    '$ oex env remove -n <NAME>',
  ]

  static flags = {
    all: Flags.boolean({char: 'a', description: 'Remove all configurations', required: false, exclusive: ['name']}),
    name: Flags.string({char: 'n', description: 'Remove one configuration', required: false, exclusive: ['all']}),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(Remove);

    if (!flags.all && !flags.name) {
      this.error('A config name or flag all must be specified');
    }

    if (flags.all) {
      this.saveConfig([]);
      this.log('All configuration were removed');
      return;
    }

    const currentConfList = this.listConfig();
    const filteredConfList: DirectusConfig[] = currentConfList.filter(env => env.name !== flags.name);

    if (filteredConfList.length === currentConfList.length) {
      this.error(`Configuration with name ${chalk.red(flags.name)} was not found`);
    }

    this.saveConfig(filteredConfList);

    this.log(`Configuration ${chalk.red(flags.name)} was removed`);
  }
}

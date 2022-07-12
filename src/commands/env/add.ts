import {Flags} from '@oclif/core';
import {DirectusConfig, DirectusSyncCliCommand} from '../../types/directus-sync-cli-command';
import * as chalk from 'chalk';
import directusApi from '../../api/directus-api';

export default class Add extends DirectusSyncCliCommand {
  static description = 'Add a directus configuration'

  static examples = [
    '$ oex env add -n <NAME> -u <URL> -t <TOKEN>',
    '$ oex env add -n <NAME> -u <URL> -t <TOKEN> --no-check',
  ]

  static flags = {
    name: Flags.string({char: 'n', description: 'Name of the directus environment', required: true}),
    url: Flags.string({char: 'u', description: 'Base url of the directus', required: true}),
    token: Flags.string({char: 't', description: 'Access token of the directus', required: true}),
    check: Flags.boolean({char: 'c', description: 'Force adding environment without verification', required: false, default: true,  allowNo: true}),
    override: Flags.boolean({char: 'o', description: 'Force updating an existing environment', required: false, default: false}),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(Add);
    let environmentList: DirectusConfig[] = this.listConfig();

    const config: DirectusConfig = {
      name: flags.name,
      url: flags.url,
      token: flags.token,
    };

    // Ping only if check is true
    const check: boolean = flags.check ? await directusApi.getPing(config, this) : true;

    if (check) {
      // Check if we have to override an existing environment
      if (!flags.override && environmentList.some(conf => conf.name === config.name)) {
        this.log(chalk.red(`The environment ${config.name} already exist`));
        this.log('Use --override option if you want to update it');
      } else {
        environmentList = environmentList.filter(item => item.name !== config.name);
        environmentList.push(config);
        this.saveConfig(environmentList);
        this.log(chalk.green(`Environment ${config.name} successfully added`));
      }
    } else {
      this.log(chalk.bold.red('Ping failed on this environment'));
      this.log('Use --no-check option if you really want to add it');
    }
  }
}

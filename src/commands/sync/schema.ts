import {Flags} from '@oclif/core';
import directusApi from '../../api/directus-api';
import * as chalk from 'chalk';
import {DirectusConfig, DirectusSyncCliCommand} from '../../types/directus-sync-cli-command';

export default class Schema extends DirectusSyncCliCommand {
  static description = 'Sync schema between multiple environment'

  static examples = [
    '$ directus-sync-cli hello world hello world! (./src/commands/hello/world.ts)',
  ]

  static flags = {
    from: Flags.string({
      description: 'Name of the configuration to use as base for export',
      required: true,
    }),
    to: Flags.string({
      description: 'Name of the configuration to use as target for export',
      required: true,
    }),
    force: Flags.boolean({
      char: 'f',
      description: 'Force comand if the version are not identical',
      required: false,
    }),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(Schema);

    const fromConfig = this.getConfig(flags.from);

    const toConfig = this.getConfig(flags.to);
    if (!toConfig) {
      this.error(`Configuration with name ${chalk.red(flags.to)} was not found`);
    }

    await this.compareDirectusRelease(fromConfig, toConfig);
    await this.checkDirectusConfiguration(fromConfig);
    await this.checkDirectusConfiguration(toConfig);
    await this.importSchemaToTarget(fromConfig, toConfig);
  }

  private async compareDirectusRelease(from: DirectusConfig, to: DirectusConfig) {
    const {flags} = await this.parse(Schema);
    const statusFrom = await directusApi.getHealth(from, this);
    const statusTo = await directusApi.getHealth(to, this);

    if (statusFrom.releaseId !== statusTo.releaseId && !flags.force) {
      this.error(chalk.bold.red('Directus instances versions are not identical, moving the schema might break the instance, use -f to force'));
    } else {
      this.log(chalk.bold.green('Directus instances versions are identical'));
    }
  }

  private async checkDirectusConfiguration(config: DirectusConfig) {
    // TODO change with getPing when branch is merged
    await directusApi.getHealth(config, this);
    await directusApi.checkSnapshotExtension(config, this);
    this.log(chalk.bold.green(`Directus instance ${config.name} is up and has the extension installed`));
  }

  private async importSchemaToTarget(from: DirectusConfig, to: DirectusConfig) {
    this.log(chalk.bold.blueBright(`Exporting Directus schema from ${from.name}`));
    const schema = await directusApi.exportDirectusSchema(from, this);
    this.log(chalk.bold.green(`Directus schema successfully exported from ${from.name}`));
    this.log(chalk.bold.blueBright(`Importing Directus schema to ${to.name}`));
    await directusApi.importDirectusSchema(to, schema, this);
    this.log(chalk.bold.green(`Directus schema successfully imported to ${to.name}`));
  }
}

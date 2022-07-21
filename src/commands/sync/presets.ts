import {Flags} from '@oclif/core';
import {DirectusConfig, DirectusSyncCliCommand} from '../../types/directus-sync-cli-command';
import * as chalk from 'chalk';
import directusApi from '../../api/directus-api';
import Table = require('cli-table')

export default class Presets extends DirectusSyncCliCommand {
  static description = ` Sync presets between multiple environment.
  The token must be an admin token.
  Process of the command:
    - Get the presets on the origin environment, with user email and name of the role of the preset if specified.
    - Find matching uuid of the users / role on the target environment because it could not be the same.
    - Get the presets of the target environment
    - Delete presets that match the pair (uuid,collection) to avoid conflicts or if global preset, (user: null,collection)
    - Create presets in the target environment.
  `

  static examples = [
    '$ directus-sync-cli sync presets -o <origin> -t <target>',
    '$ directus-sync-cli sync presets -o <origin> -t <target> --force',
  ]

  static flags = {
    origin: Flags.string({
      char: 'o',
      description: 'Name of the configuration to use as base for export',
      required: true,
    }),
    to: Flags.string({
      char: 't',
      description: 'Name of the configuration to use as target for export',
      required: true,
    }),
    force: Flags.boolean({
      char: 'f',
      description: 'Force flag if the version are not identical',
      required: false,
    }),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(Presets);

    const fromConfig = this.getConfig(flags.origin);
    const toConfig = this.getConfig(flags.to);

    const healthFrom = await this.checkDirectusConfiguration(fromConfig);
    const healthTo = await this.checkDirectusConfiguration(toConfig);
    await this.compareDirectusRelease(healthFrom, healthTo);
    await this.importPresetsToTarget(fromConfig, toConfig);
  }

  private async compareDirectusRelease(healthFrom: any, healthTo: any) {
    const {flags} = await this.parse(Presets);
    if (healthFrom.releaseId !== healthTo.releaseId && !flags.force) {
      this.error(chalk.bold.red('Directus target and origin versions are not identical, moving the presets might break the instance, use -f to force'));
    } else if (flags.force) {
      this.log(chalk.bold.yellow('Directus target and origin versions are not identical'));
    } else {
      this.log(chalk.bold.green('Directus instances versions are identical'));
    }
  }

  private async checkDirectusConfiguration(config: DirectusConfig) {
    const pong = await directusApi.getPing(config, this);

    if (!pong) {
      this.error(`Directus instance ${config.name} is not available`);
    }

    const health = await directusApi.getHealth(config, this);
    await directusApi.checkSnapshotExtension(config, this);
    this.log(chalk.bold.green(`Directus instance ${config.name} is up and has the extension installed`));
    return health;
  }

  private async importPresetsToTarget(from: DirectusConfig, to: DirectusConfig) {
    this.log(chalk.bold.blueBright(`Exporting presets from ${from.name}`));
    const {data: fromPresets}: { data: any[] } = await directusApi.getPresets(from, this);
    this.log(chalk.bold.blueBright(`Exporting presets from ${to.name}`));
    const {data: toPresets}: { data: any[] } = await directusApi.getPresets(to, this);

    this.log(chalk.bold.blueBright('Computing list of unique user and roles'));
    const userSet: Set<string> = new Set();
    const roleSet: Set<string> = new Set();

    // Get unique list of email and role of the origin preset
    for (const preset of fromPresets) {
      if (preset.user) {
        userSet.add(preset.user?.email);
      }

      if (preset.role) {
        roleSet.add(preset.role?.name);
      }
    }

    // Get the corresponding roles/email ids in target environment
    const {data: targetRoles} = await directusApi.getRolesIds(to, [...roleSet], this);
    const {data: targetUsers} = await directusApi.getUsersIds(to, [...userSet], this);

    const tableUser = new Table({
      head: [
        chalk.bold.blueBright('type'),
        chalk.bold.blueBright(`id in ${to.name}`),
        chalk.bold.blueBright('value'),
      ],
    });
    tableUser.push(...targetUsers.map((r: any) => ['user', r.id, r.email]), ...targetRoles.map((r: any) => ['role', r.id, r.name]));
    this.log(chalk.bold.blueBright('List of users and roles present in origin and target instance:'));
    this.log(tableUser.toString());

    // Create a map of previous ids
    const replacedMap = new Map<string, string>();
    for (const role of targetRoles) {
      replacedMap.set(role.name, role.id);
    }

    for (const user of targetUsers) {
      replacedMap.set(user.email, user.id);
    }

    this.log('Creating new presets list');
    // eslint-disable-next-line unicorn/no-array-reduce
    const newPresets: any[] = fromPresets.reduce((acc: any[], preset: any) => {
      const clone = JSON.parse(JSON.stringify(preset));
      if (replacedMap.has(preset?.user?.email)) {
        clone.user = replacedMap.get(preset.user.email);
        delete clone.id;
        acc.push(clone);
        return acc;
      }

      if (replacedMap.has(preset?.role?.name)) {
        clone.role = replacedMap.get(preset.role.name);
        delete clone.id;
        acc.push(clone);
        return acc;
      }

      if (clone.user === null && clone.role === null) {
        delete clone.id;
        acc.push(clone);
        return acc;
      }

      return acc;
    }, []);

    this.log('Computing duplicate presets in the target environment');
    const idsToDelete = toPresets.filter(preset => {
      return newPresets.some(newPreset => preset.collection === newPreset.collection && (preset.user === newPreset.user || preset.role === newPreset.role || (preset.user === null && preset.role === null)));
    }).map(p => p.id);
    this.log('Theses preset will be removed:');
    this.log(idsToDelete.toString());
    this.log('Removing duplicate presets in the target environment');
    await directusApi.deletePresets(to, idsToDelete, this);
    this.log('Presets removed');
    this.log('Importing new presets in the target environment');
    await directusApi.postPresets(to, newPresets, this);
    this.log('Presets successfully imported');
  }
}

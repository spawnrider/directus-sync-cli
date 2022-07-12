import {Flags} from '@oclif/core';
import {DirectusSyncCliCommand} from '../../types/directus-sync-cli-command';

export default class Presets extends DirectusSyncCliCommand {
  static description = 'Sync presets between multiple environment'

  static examples = [
    `$ oex hello world
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {
    force: Flags.boolean({
      char: 'f',
      description: 'Force comand if the version are not identical',
      required: false,
    }),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(Presets);
    this.log('ok', flags, 'todo implement');
  }
}

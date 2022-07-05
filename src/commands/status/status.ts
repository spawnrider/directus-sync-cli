import {Command, Flags} from '@oclif/core'

export default class Status extends Command {
  static description = 'Say hello world'

  static examples = [
    `$ oex hello world
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {
    from: Flags.string({char: 'f', description: 'Whom is saying hello', required: true}),
  }

  static args = []

  async run(): Promise<void> {
    this.log('hello world! (./src/commands/hello/status.ts)')
  }
}

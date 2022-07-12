directus-sync-cli
=================

directus-sync-cli Preset CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/directus-sync-cli.svg)](https://npmjs.org/package/directus-sync-cli)
[![Downloads/week](https://img.shields.io/npm/dw/directus-sync-cli.svg)](https://npmjs.org/package/directus-sync-cli)
[![License](https://img.shields.io/npm/l/directus-sync-cli.svg)](https://github.com/spawnrider/directus-sync-cli/blob/master/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g directus-sync-cli
$ directus-sync-cli COMMAND
running command...
$ directus-sync-cli (--version)
directus-sync-cli/0.0.4 darwin-x64 node-v14.19.0
$ directus-sync-cli --help [COMMAND]
USAGE
  $ directus-sync-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`directus-sync-cli env add`](#directus-sync-cli-env-add)
* [`directus-sync-cli env list`](#directus-sync-cli-env-list)
* [`directus-sync-cli env remove`](#directus-sync-cli-env-remove)
* [`directus-sync-cli help [COMMAND]`](#directus-sync-cli-help-command)
* [`directus-sync-cli status`](#directus-sync-cli-status)
* [`directus-sync-cli sync presets`](#directus-sync-cli-sync-presets)
* [`directus-sync-cli sync schema`](#directus-sync-cli-sync-schema)

## `directus-sync-cli env add`

Add a directus configuration

```
USAGE
  $ directus-sync-cli env add -n <value> -u <value> -t <value> [-c] [-o]

FLAGS
  -c, --[no-]check     Force adding environment without verification
  -n, --name=<value>   (required) Name of the directus environment
  -o, --override       Force updating an existing environment
  -t, --token=<value>  (required) Access token of the directus
  -u, --url=<value>    (required) Base url of the directus

DESCRIPTION
  Add a directus configuration

EXAMPLES
  $ oex env add -n <NAME> -u <URL> -t <TOKEN>

  $ oex env add -n <NAME> -u <URL> -t <TOKEN> --no-check
```

## `directus-sync-cli env list`

List all saved directus configs

```
USAGE
  $ directus-sync-cli env list

DESCRIPTION
  List all saved directus configs

EXAMPLES
  $ oex list
```

## `directus-sync-cli env remove`

Remove one or all directus config

```
USAGE
  $ directus-sync-cli env remove [-a | -n <value>]

FLAGS
  -a, --all           Remove all configurations
  -n, --name=<value>  Remove one configuration

DESCRIPTION
  Remove one or all directus config

EXAMPLES
  $ oex env remove -a

  $ oex env remove -n <NAME>
```

## `directus-sync-cli help [COMMAND]`

Display help for directus-sync-cli.

```
USAGE
  $ directus-sync-cli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for directus-sync-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `directus-sync-cli status`

Get the status for an environment

```
USAGE
  $ directus-sync-cli status [-n <value>] [-d]

FLAGS
  -d, --detailed      Get services status of one configuration
  -n, --name=<value>  Get the status of one configuration

DESCRIPTION
  Get the status for an environment

EXAMPLES
  $ oex status

  $ oex status -n <NAME>

  $ oex status -d -n <NAME>
```

_See code: [dist/commands/status/index.ts](https://github.com/spawnrider/directus-sync-cli/blob/v0.0.4/dist/commands/status/index.ts)_

## `directus-sync-cli sync presets`

Get the status for an environment

```
USAGE
  $ directus-sync-cli sync presets [-f]

FLAGS
  -f, --force  Force comand if the version are not identical

DESCRIPTION
  Get the status for an environment

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `directus-sync-cli sync schema`

Get the status for an environment

```
USAGE
  $ directus-sync-cli sync schema --from <value> --to <value> [-f]

FLAGS
  -f, --force     Force comand if the version are not identical
  --from=<value>  (required) Name of the configuration to use as base for export
  --to=<value>    (required) Name of the configuration to use as target for export

DESCRIPTION
  Get the status for an environment

EXAMPLES
  $ oex hello world hello world! (./src/commands/hello/world.ts)
```
<!-- commandsstop -->

oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

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
directus-sync-cli/0.0.0 darwin-x64 node-v14.19.0
$ directus-sync-cli --help [COMMAND]
USAGE
  $ directus-sync-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`directus-sync-cli hello PERSON`](#directus-sync-cli-hello-person)
* [`directus-sync-cli hello world`](#directus-sync-cli-hello-world)
* [`directus-sync-cli help [COMMAND]`](#directus-sync-cli-help-command)
* [`directus-sync-cli plugins`](#directus-sync-cli-plugins)
* [`directus-sync-cli plugins:install PLUGIN...`](#directus-sync-cli-pluginsinstall-plugin)
* [`directus-sync-cli plugins:inspect PLUGIN...`](#directus-sync-cli-pluginsinspect-plugin)
* [`directus-sync-cli plugins:install PLUGIN...`](#directus-sync-cli-pluginsinstall-plugin-1)
* [`directus-sync-cli plugins:link PLUGIN`](#directus-sync-cli-pluginslink-plugin)
* [`directus-sync-cli plugins:uninstall PLUGIN...`](#directus-sync-cli-pluginsuninstall-plugin)
* [`directus-sync-cli plugins:uninstall PLUGIN...`](#directus-sync-cli-pluginsuninstall-plugin-1)
* [`directus-sync-cli plugins:uninstall PLUGIN...`](#directus-sync-cli-pluginsuninstall-plugin-2)
* [`directus-sync-cli plugins update`](#directus-sync-cli-plugins-update)

## `directus-sync-cli hello PERSON`

Say hello

```
USAGE
  $ directus-sync-cli hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/ArthurSamy/directus-sync-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `directus-sync-cli hello world`

Say hello world

```
USAGE
  $ directus-sync-cli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
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

## `directus-sync-cli plugins`

List installed plugins.

```
USAGE
  $ directus-sync-cli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ directus-sync-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `directus-sync-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ directus-sync-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ directus-sync-cli plugins add

EXAMPLES
  $ directus-sync-cli plugins:install myplugin 

  $ directus-sync-cli plugins:install https://github.com/someuser/someplugin

  $ directus-sync-cli plugins:install someuser/someplugin
```

## `directus-sync-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ directus-sync-cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ directus-sync-cli plugins:inspect myplugin
```

## `directus-sync-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ directus-sync-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ directus-sync-cli plugins add

EXAMPLES
  $ directus-sync-cli plugins:install myplugin 

  $ directus-sync-cli plugins:install https://github.com/someuser/someplugin

  $ directus-sync-cli plugins:install someuser/someplugin
```

## `directus-sync-cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ directus-sync-cli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ directus-sync-cli plugins:link myplugin
```

## `directus-sync-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ directus-sync-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ directus-sync-cli plugins unlink
  $ directus-sync-cli plugins remove
```

## `directus-sync-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ directus-sync-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ directus-sync-cli plugins unlink
  $ directus-sync-cli plugins remove
```

## `directus-sync-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ directus-sync-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ directus-sync-cli plugins unlink
  $ directus-sync-cli plugins remove
```

## `directus-sync-cli plugins update`

Update installed plugins.

```
USAGE
  $ directus-sync-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->

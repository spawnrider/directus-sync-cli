import {Command} from '@oclif/core';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as chalk from 'chalk';

export interface DirectusConfig {
  token: string;
  url: string;
  name: string;
}

export abstract class DirectusSyncCliCommand extends Command {
  public configPath = `${this.config.configDir}/config.json`

  public saveConfig = (configList: DirectusConfig[]): void => {
    // make folder for the first run
    if (!fs.existsSync(path.dirname(this.configPath))) {
      fs.mkdirSync(path.dirname(this.configPath));
    }

    const data = JSON.stringify(configList);
    fs.writeFileSync(this.configPath, data, {encoding: 'utf-8'});
  }

  public listConfig = (): DirectusConfig[] => {
    let config = [];
    try {
      config = JSON.parse(fs.readFileSync(this.configPath, {encoding: 'utf-8'}));
    } catch {
      this.error(`Could not read config file from the computer, check the file at ${this.configPath}`);
    }

    return config;
  }

  public getConfig = (name: string): DirectusConfig => {
    const config: DirectusConfig[] = JSON.parse(fs.readFileSync(this.configPath, {encoding: 'utf-8'}));
    const conf = config.find(conf => conf.name === name);

    if (!conf) {
      this.error(`Configuration with name ${chalk.red(name)} was not found`);
    }

    return conf;
  }
}

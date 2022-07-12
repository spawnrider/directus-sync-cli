import * as fs from 'node:fs'
import * as path from 'node:path'

export interface DirectusConfig {
  token: string;
  url: string;
  name: string;
}

export const saveConfig = (configList: DirectusConfig[], configPath: string): void => {
  // make folder for the first run
  if (!fs.existsSync(path.dirname(configPath))) {
    fs.mkdirSync(path.dirname(configPath))
  }

  const data = JSON.stringify(configList)
  fs.writeFileSync(configPath, data, {encoding: 'utf-8'})
}

export const listConfig = (configPath: string): DirectusConfig[] => {
  let config = []
  try {
    config = JSON.parse(fs.readFileSync(configPath, {encoding: 'utf-8'}))
  } catch {}

  return config
}

export const getConfig = (name: string, configPath: string): DirectusConfig | undefined => {
  const config: DirectusConfig[] = JSON.parse(fs.readFileSync(configPath, {encoding: 'utf-8'}))
  return config.find(conf => conf.name === name)
}

export const hasConfig = (name: string, configPath: string): boolean => {
  const config: DirectusConfig[] = JSON.parse(fs.readFileSync(configPath, {encoding: 'utf-8'}))
  return config.some(conf => conf.name === name)
}

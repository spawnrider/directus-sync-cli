import axios from 'axios';
import {Command} from '@oclif/core';
import {DirectusConfig} from '../types/directus-sync-cli-command';
import * as FormData from 'form-data';
import * as chalk from 'chalk';

const getPing = async (config: DirectusConfig, command: Command): Promise<boolean> => {
  try {
    const {data} = await axios.get(`${config.url}/server/ping`, {headers: {Authorization: `Bearer ${config.token}`}});
    return data === 'pong';
  } catch (error: any) {
    const message = (error.isAxiosError && error.message) || error.toString();
    command.log(chalk.bold.red(`Directus instance ${config.name} is not available, error ${message}`));
    return false;
  }
};

const getInfo = async (config: DirectusConfig): Promise<any> => {
  const res = await axios.get(`${config.url}/server/info`, {headers: {Authorization: `Bearer ${config.token}`}});
  return res.data.data;
};

const getHealth = async (config: DirectusConfig, command: Command): Promise<any> => {
  try {
    const res = await axios.get(`${config.url}/server/health`, {headers: {Authorization: `Bearer ${config.token}`}});
    return res.data;
  } catch (error: any) {
    const message = (error.isAxiosError && error.message) || error.toString();
    command.error(chalk.bold.red(`Directus instance ${config.name} is not available, error ${message}`));
  }
};

const getPresets = async (config: DirectusConfig): Promise<any> => {
  const res = await axios.get(`${config.url}/presets`, {headers: {Authorization: `Bearer ${config.token}`}});
  return res.data;
};

const postPresets = async (config: DirectusConfig, presets: any): Promise<any> => {
  const res = await axios.post(`${config.url}/presets`, presets, {headers: {Authorization: `Bearer ${config.token}`}});
  return res.data;
};

const checkSnapshotExtension = async (config: DirectusConfig, command: Command): Promise<any> => {
  try {
    const res = await axios.get(`${config.url}/snapshot`, {headers: {Authorization: `Bearer ${config.token}`}});
    return res.data;
  } catch (error: any) {
    const message = (error.isAxiosError && error.message) || error.toString();
    command.error(chalk.bold.red(`Directus instance ${config.name} does not have the extension install go to ....., error ${message}`));
  }
};

const exportDirectusSchema = async (config: DirectusConfig, command: Command): Promise<any> => {
  try {
    const res = await axios.get(`${config.url}/snapshot/export`, {headers: {Authorization: `Bearer ${config.token}`}});
    return res.data;
  } catch (error: any) {
    const message = (error.isAxiosError && error.message) || error.toString();
    command.error(chalk.bold.red(`Could not export schema from instance ${config.name}, error ${message}`));
  }
};

const importDirectusSchema = async (config: DirectusConfig, file: string, command: Command): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', Buffer.from(file));
    const res = await axios.post(`${config.url}/snapshot/import`, formData, {
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error: any) {
    const message = (error.isAxiosError && error.message) || error.toString();
    command.error(chalk.bold.red(`Could not import schema to instance ${config.name}, error ${message}`));
  }
};

export default {
  getPing,
  getInfo,
  getHealth,
  getPresets,
  postPresets,
  checkSnapshotExtension,
  exportDirectusSchema,
  importDirectusSchema,
};

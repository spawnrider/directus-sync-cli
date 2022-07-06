import axios from 'axios'
import {DirectusConfig} from './config'

const getHealth = async (config: DirectusConfig): Promise<any> => {
  // eslint-disable-next-line camelcase
  const res = await axios.get(`${config.url}/server/health`, {params: {access_token: config.token}})
  return res.data
}

const getPresets = async (config: DirectusConfig): Promise<any> => {
  // eslint-disable-next-line camelcase
  const res = await axios.get(`${config.url}/presets`, {params: {access_token: config.token}})
  return res.data
}

export const directusApi = {
  getHealth,
  getPresets,
}
import axios from 'axios'
import {DirectusConfig} from './config'

const getHealth = async (config: DirectusConfig): Promise<any> => {
  const res = await axios.get(`${config.url}/server/health`, {headers: {Authorization: `Bearer ${config.token}`}})
  return res.data
}

const getPresets = async (config: DirectusConfig): Promise<any> => {
  const res = await axios.get(`${config.url}/presets`, {headers: {Authorization: `Bearer ${config.token}`}})
  return res.data
}

const postPresets = async (config: DirectusConfig, presets: any): Promise<any> => {
  const res = await axios.post(`${config.url}/presets`, presets, {headers: {Authorization: `Bearer ${config.token}`}})
  return res.data
}

export default {
  getHealth,
  getPresets,
  postPresets,
}

import axios from 'axios'
import {DirectusConfig} from './config'

const getPing = async (config: DirectusConfig): Promise<any> => {
  const res = await axios.get(`${config.url}/server/ping`, {headers: {Authorization: `Bearer ${config.token}`}})
  return res.data
}

const getInfo = async (config: DirectusConfig): Promise<any> => {
  const res = await axios.get(`${config.url}/server/info`, {headers: {Authorization: `Bearer ${config.token}`}})
  return res.data.data
}

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
  getPing,
  getInfo,
  getHealth,
  getPresets,
  postPresets,
}

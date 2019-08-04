import axios from 'axios'

export const BASE_URL = 'http://jeans.ntzyr.xyz/'
export const API_URL = BASE_URL + 'api/'
export const STORAGE_URL = BASE_URL + 'storage/'

const API = axios.create({
  baseURL: API_URL
})

export default API

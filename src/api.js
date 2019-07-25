import axios from 'axios'

const API = axios.create({
  baseURL: 'http://jeans.ntzyr.xyz/api/'
})

export default API

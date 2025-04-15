import axios from 'axios'
import { getToken } from '../utils'

const BASE_URL = 'http://localhost:8080'

export const publicAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const privateAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

privateAPI.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('Final request headers:', config.headers)
    return config
  },
  (error) => Promise.reject(error)
)

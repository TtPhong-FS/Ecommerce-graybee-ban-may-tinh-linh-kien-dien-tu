import i18n from '@/i18n/i18n'
import { getToken } from '@/utils'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_TECHSTORE_API_BASE_URL
const currentLang = i18n.language || 'vi'

export const publicAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': currentLang
  }
})

export const privateAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': currentLang
  }
})

privateAPI.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

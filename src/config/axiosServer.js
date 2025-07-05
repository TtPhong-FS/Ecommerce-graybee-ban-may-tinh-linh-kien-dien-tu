import i18n from '@/i18n/i18n'
import { getSession, getToken, session } from '@/utils'
import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_TECHSTORE_API_BASE_URL
const currentLang = i18n.language || 'vi'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': currentLang
  }
})

api.interceptors.request.use(
  async (config) => {
    const token = getToken()
    let sessionId = getSession()

    if (!token && !sessionId) {
      sessionId = await session()
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    } else if (sessionId) {
      config.headers['X-Session-Id'] = sessionId
    }

    return config
  },
  (error) => Promise.reject(error)
)

import { HOME_URL } from '@/api/constants'
import i18n from '@/i18n/i18n'
import { getSession, getToken } from '@/utils'
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

publicAPI.interceptors.request.use((config) => {
  const sessionId = getSession()

  if (!sessionId) {
    const fetchSession = async () => {
      await axios.get(`${BASE_URL}${HOME_URL}/session`, {
        withCredentials: true
      })
    }
    fetchSession()
  }
  return config
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
    const sessionId = getSession()

    if (!token && !sessionId) {
      const fetchSession = async () => {
        return await axios.get(`${BASE_URL}${HOME_URL}/session`, {
          withCredentials: true
        })
      }
      fetchSession()
    }

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

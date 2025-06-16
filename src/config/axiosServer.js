import i18n from '@/i18n/i18n'
import { getToken } from '@/utils'
import axios from 'axios'
import { toast } from 'sonner'

const BASE_URL = 'http://localhost:8080'
const currentLang = i18n.language || 'vi'

export const publicAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': currentLang
  }
})

export const privateAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
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

publicAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error

    const { status, data } = response

    switch (status) {
      case 401:
        toast.warning('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
        window.location.href = '/login'
        break

      case 403:
        toast.warning('Bạn không có quyền truy cập chức năng này.')
        break

      case 500:
        toast.info('Hệ thống đang sửa hoặc bảo trì, vui lòng thử lại sau.')
        break

      case 503:
        toast.info('Dịch vụ hiện tại chưa sẵn sàng, vui lòng thử lại sau')
        break
    }

    return Promise.reject(error)
  }
)
privateAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error

    const { status, data } = response
    switch (status) {
      case 401:
        toast.warning('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
        window.location.href = '/login'
        break

      case 403:
        toast.warning('Bạn không có quyền truy cập chức năng này.')
        break

      case 500:
        toast.info('Hệ thống đang sửa hoặc bảo trì, vui lòng thử lại sau.')
        break

      case 503:
        toast.info('Dịch vụ hiện tại chưa sẵn sàng, vui lòng thử lại sau')
        break
    }

    return Promise.reject(error)
  }
)

import { AUTH_URL } from '@/api/constants'
import { api } from '@/config'

export const loginApi = (request) => api.post(`${AUTH_URL}/login`, request)
export const logout = () => api.get(`${AUTH_URL}/logout`)
export const signUpApi = (request) => api.post(`${AUTH_URL}/signup`, request)
export const verifyEmailApi = (email) => api.post(`${AUTH_URL}/forgot-password/verify-email/${email}`)
export const verifyOtpApi = (otp, email) => api.post(`${AUTH_URL}/forgot-password/verify-otp/${otp}/${email}`)
export const resetPasswordApi = (email, request) =>
  api.post(`${AUTH_URL}/forgot-password/reset-password/${email}`, request)

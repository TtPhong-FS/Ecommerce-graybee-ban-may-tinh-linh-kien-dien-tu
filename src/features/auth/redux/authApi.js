import { AUTH_URL } from '@/api/constants'
import { publicAPI } from '@/config'

export const loginApi = (request) => publicAPI.post(`${AUTH_URL}/login`, request)
export const signUpApi = (request) => publicAPI.post(`${AUTH_URL}/signup`, request)
export const verifyEmailApi = (email) => publicAPI.post(`${AUTH_URL}/forgot-password/verify-email/${email}`)
export const verifyOtpApi = (otp, email) => publicAPI.post(`${AUTH_URL}/forgot-password/verify-otp/${otp}/${email}`)
export const resetPasswordApi = (email, request) =>
  publicAPI.post(`${AUTH_URL}/forgot-password/reset-password/${email}`, request)

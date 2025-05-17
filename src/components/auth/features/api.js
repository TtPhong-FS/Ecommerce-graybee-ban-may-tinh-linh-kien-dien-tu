import { publicAPI } from '../../../config/axiosServer'

const auth_endpoint = '/api/v1/auth'

export const loginApi = (request) => publicAPI.post(`${auth_endpoint}/login`, request, {})
export const signUpApi = (request) => publicAPI.post(`${auth_endpoint}/signup`, request, {})
export const verifyEmailApi = (email) => publicAPI.post(`${auth_endpoint}/forgot-password/verify-email/${email}`)
export const verifyOtpApi = (otp, email) =>
  publicAPI.post(`${auth_endpoint}/forgot-password/verify-otp/${otp}/${email}`)
export const resetPasswordApi = (email, request) =>
  publicAPI.post(`${auth_endpoint}/forgot-password/reset-password/${email}`, request)

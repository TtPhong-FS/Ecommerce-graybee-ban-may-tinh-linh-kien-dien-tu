import { handleCreateAsyncThunk } from '@/lib'
import { loginApi, logout, resetPasswordApi, signUpApi, verifyEmailApi, verifyOtpApi } from './authApi'

export const loginUserAsync = handleCreateAsyncThunk('auth/loginApi', async (request) => {
  const response = await loginApi(request)
  return response.data
})

export const logoutAsync = handleCreateAsyncThunk('auth/logoutAsync', async () => {
  const response = await logout()
  return response.data
})

export const verifyEmailAsync = handleCreateAsyncThunk('auth/verifyEmailApi', async (email) => {
  const response = await verifyEmailApi(email)
  return response.data
})
export const verifyOtpAsync = handleCreateAsyncThunk('auth/verifyOtpApi', async ({ otp, email }) => {
  const response = await verifyOtpApi(otp, email)
  return response.data
})
export const resetPasswordAsync = handleCreateAsyncThunk('auth/resetPasswordApi', async ({ email, request }) => {
  const response = await resetPasswordApi(email, request)
  return response.data
})

export const registerUserAsync = handleCreateAsyncThunk('auth/registerUserAsync', async (request) => {
  const response = await signUpApi(request)
  return response.data
})

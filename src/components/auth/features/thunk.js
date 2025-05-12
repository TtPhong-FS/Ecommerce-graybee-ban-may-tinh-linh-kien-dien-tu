import { handleCreateAsyncThunk } from '@/components/func'
import { loginApi, signUpApi } from './api'

export const handleLogin = handleCreateAsyncThunk('auth/loginApi', async (request) => {
  const response = await loginApi(request)
  return response.data
})

export const handleSignUp = handleCreateAsyncThunk('auth/signUpApi', async (request) => {
  const response = await signUpApi(request)
  return response.data
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, signUpApi } from './api'

export const Login = createAsyncThunk('auth/loginApi', async ({ request }, { rejectWithValue }) => {
  try {
    if (!navigator.connection) {
      return rejectWithValue('No internet connection')
    }
    const response = await loginApi(request)
    return response.data
  } catch (error) {
    if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
      return rejectWithValue({
        unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
      })
    }
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    }
  }
})

export const SignUp = createAsyncThunk('auth/signUpApi', async ({ request }, { rejectWithValue }) => {
  try {
    if (!navigator.connection) {
      return rejectWithValue('No internet connection')
    }
    const response = await signUpApi(request)
    return response.data
  } catch (error) {
    if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
      return rejectWithValue({
        unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
      })
    }
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    }
  }
})

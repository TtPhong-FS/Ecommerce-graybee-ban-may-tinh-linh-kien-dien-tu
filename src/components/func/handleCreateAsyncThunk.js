import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export function handleCreateAsyncThunk(typePrefix, asyncCallback) {
  return createAsyncThunk(typePrefix, async (arg, { rejectWithValue }) => {
    try {
      const res = await asyncCallback(arg)
      return res
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }

      if (axios.isAxiosError?.(error) && error.response?.data) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue({ detail: 'Đã xảy ra lỗi không xác định!' })
    }
  })
}

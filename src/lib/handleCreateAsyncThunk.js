import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export function handleCreateAsyncThunk(typePrefix, asyncCallback) {
  return createAsyncThunk(typePrefix, async (arg, { rejectWithValue, extra }) => {
    const { t } = extra
    try {
      const res = await asyncCallback(arg)
      return res
    } catch (error) {
      console.log(error)
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: t('common:unconnect')
        })
      }

      if (axios.isAxiosError?.(error) && error.response?.data) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue({ detail: t('common:unknown') })
    }
  })
}

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../../config/axiosServer'

const sidebar_endpoint = '/api/v1/public/sidebar'

const sidebarApi = () => API_URL.get(sidebar_endpoint, {})

export const getSidebar = createAsyncThunk('sidebar/getSidebar', async (_, { rejectWithValue }) => {
  try {
    const response = await sidebarApi()
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

const initialState = {
  error: null,
  status: 'idle',
  menus: []
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSidebar.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(getSidebar.fulfilled, (state, aciton) => {
        state.status = 'success'
        state.menus = aciton.payload?.data
      })
      .addCase(getSidebar.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default sidebarSlice.reducer

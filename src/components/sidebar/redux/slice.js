import { handleCreateAsyncThunk } from '@/lib'
import { createSlice } from '@reduxjs/toolkit'
import { publicAPI } from '../../../config/axiosServer'

const sidebar_endpoint = '/api/v1/public/sidebar'

const getSidebar = () => publicAPI.get(sidebar_endpoint, {})

export const fetchSidebar = handleCreateAsyncThunk('sidebar/fetchSidebar', async () => {
  const response = await getSidebar()
  return response.data
})

const initialState = {
  active: false,
  menus: []
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    onFocusSidebar: (state) => {
      state.active = true
    },
    unFocusSidebar: (state) => {
      state.active = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSidebar.fulfilled, (state, aciton) => {
      state.menus = aciton.payload?.data
    })
  }
})

export const { onFocusSidebar, unFocusSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer

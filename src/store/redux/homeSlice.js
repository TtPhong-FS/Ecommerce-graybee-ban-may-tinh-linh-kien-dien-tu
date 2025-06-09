import { publicAPI } from '@/config'
import { handleCreateAsyncThunk } from '@/lib'
import { createSlice } from '@reduxjs/toolkit'

const home_endpoint = '/api/v1/public/home'

const getSidebar = () => publicAPI.get(`${home_endpoint}/sidebar`)

export const fetchSidebar = handleCreateAsyncThunk('sidebar/fetchSidebar', async () => {
  const response = await getSidebar()
  return response.data
})

const initialState = {
  active: false,
  sidebar: []
}

const homeSlice = createSlice({
  name: 'home',
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
    builder.addCase(fetchSidebar.fulfilled, (state, aciton) => {
      state.sidebar = aciton.payload?.data
    })
  }
})

export const { onFocusSidebar, unFocusSidebar } = homeSlice.actions

export default homeSlice.reducer

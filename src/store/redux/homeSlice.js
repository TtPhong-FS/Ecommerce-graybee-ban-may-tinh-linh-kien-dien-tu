import { HOME_URL } from '@/api/constants'
import { api } from '@/config'
import { handleCreateAsyncThunk } from '@/lib'
import { createSlice } from '@reduxjs/toolkit'

const getSidebar = () => api.get(`${HOME_URL}/sidebar`)
const getSessionId = () => api.get(`${HOME_URL}/session`)

export const fetchSidebar = handleCreateAsyncThunk('sidebar/fetchSidebar', async () => {
  const response = await getSidebar()
  return response.data
})
export const initialSession = handleCreateAsyncThunk('sidebar/fetchSidebar', async () => {
  const response = await getSessionId()
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
      state.sidebar = aciton.payload.data || []
    })
  }
})

export const { onFocusSidebar, unFocusSidebar } = homeSlice.actions

export default homeSlice.reducer

import { publicAPI } from '@/config'
import { handleCreateAsyncThunk } from '@/lib'
import { createSlice } from '@reduxjs/toolkit'

const carousel_endpoint = '/api/v1/public/home/carousel'
const fetchProductByCategory = (category) => publicAPI.get(`${carousel_endpoint}/${category}`)

export const fetchCarouselAsync = handleCreateAsyncThunk('carousel/fetchCarouselAsync', async (category) => {
  const response = await fetchProductByCategory(category)
  return { category: category, data: response.data }
})

const initialState = {
  carousels: {}
}

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCarouselAsync.fulfilled, (state, action) => {
      const { category, data } = action.payload
      if (!state.carousels[category]) state.carousels[category] = {}
      state.carousels[category] = data.data
    })
  }
})

export default carouselSlice.reducer

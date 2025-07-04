import { HOME_URL } from '@/api/constants'
import { api } from '@/config'
import { handleCreateAsyncThunk } from '@/lib'
import { slugify } from '@/utils'
import { createSlice } from '@reduxjs/toolkit'

const fetchProductByCategory = (category) => api.get(`${HOME_URL}/carousel/${category}`)

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
      let formatCategory = slugify(category)
      if (!state.carousels[formatCategory]) state.carousels[formatCategory] = {}
      state.carousels[formatCategory] = {
        categorySlug: data.data.categorySlug,
        products: data.data.products
      }
    })
  }
})

export default carouselSlice.reducer

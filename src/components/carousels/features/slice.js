import { handleCreateAsyncThunk } from '@/components/func'
import { createSlice } from '@reduxjs/toolkit'
import { publicAPI } from '../../../config'
import { categoryMap } from '../data/load'

const carousel_endpoint = '/api/v1/public/carousel'
const product_endpoint = '/api/v1/public/products'
const fetchProductByCategory = (category, page, size, sortBy, order) =>
  publicAPI.get(`${product_endpoint}/${category}`, {
    params: {
      page,
      size,
      sortBy,
      order
    }
  })

export const fetchCarousel = handleCreateAsyncThunk(
  'carousel/fetchProductsByCategoryForCarousel',
  async ({ category, page = 0, size = 20, sortBy = 'createdAt', order = 'desc' }) => {
    const response = await fetchProductByCategory(category, page, size, sortBy, order)
    return { category: category, data: response.data }
  }
)

export const preLoadCarousel = handleCreateAsyncThunk('carousel/preloadCarousel', async ({ dispatch }) => {
  for (const categoryName of categoryMap) {
    await dispatch(fetchCarousel({ category: categoryName }))
  }
})

const initialState = {
  carousels: {}
}

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCarousel.fulfilled, (state, action) => {
      const { category, data } = action.payload
      if (!state.carousels[category]) state.carousels[category] = {}
      state.carousels[category] = data.data
    })
  }
})

export default carouselSlice.reducer

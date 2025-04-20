import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

export const fetchCarousel = createAsyncThunk(
  'carousel/fetchProductsByCategoryForCarousel',
  async ({ category, page = 0, size = 20, sortBy = 'createdAt', order = 'desc' }, { rejectWithValue }) => {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await fetchProductByCategory(category, page, size, sortBy, order)
    return { category: category, data: response.data }
  }
)

export const preLoadCarousel = createAsyncThunk('carousel/preloadCarousel', async (_, { dispatch }) => {
  for (const categoryName of categoryMap) {
    await dispatch(fetchCarousel({ category: categoryName }))
  }
})

const initialState = {
  loading: false
}

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCarousel.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCarousel.fulfilled, (state, action) => {
      const { category, data } = action.payload
      state.loading = false
      if (!state[category]) state[category] = {}
      state[category] = data.data
    })
    builder.addCase(fetchCarousel.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default carouselSlice.reducer

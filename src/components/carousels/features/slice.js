import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../../config'
import { carouselType, categoryMap } from '../data/load'

const carousel_endpoint = '/api/v1/public/carousel'

const fetchProductByCategory = (type, category, size, sortBy, order) =>
  API_URL.get(`${carousel_endpoint}?type=${type}&category=${category}&size=${size}&sortBy=${sortBy}&order=${order}`, {})

export const fetchCarousel = createAsyncThunk(
  'carousel/fetchProductsByCategoryForCarousel',
  async ({ type, category, size = 20, sortBy = 'position', order = 'asc' }, { rejectWithValue }) => {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await fetchProductByCategory(type, category, size, sortBy, order)
    return { category: category, type: type, data: response.data }
  }
)

export const preLoadCarousel = createAsyncThunk('carousel/preloadCarousel', async (_, { dispatch }) => {
  for (const categoryName of categoryMap) {
    for (const type of carouselType) {
      await dispatch(fetchCarousel({ type: type, category: categoryName }))
    }
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
      const { category, type, data } = action.payload
      state.loading = false
      if (!state[category]) state[category] = {}
      state[category][type] = data.data
    })
    builder.addCase(fetchCarousel.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default carouselSlice.reducer

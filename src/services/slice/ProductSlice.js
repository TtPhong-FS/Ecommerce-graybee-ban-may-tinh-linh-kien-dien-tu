import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { productApi } from '../../pages/product/features/api'

export const fetchByCategory = createAsyncThunk('product/fetchByCategory', async ({ categoryId }) => {
  const response = await productApi.fetchByCategory(categoryId)
  return response.data
})

const initialState = {
  products: [],
  status: 'idle',
  error: null
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByCategory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.status = 'success'
        state.error = null
        state.products = action.payload.data
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default productSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { findByCategory, getDetailById } from './thunk'

const initialState = {
  products: {},
  details: null,
  error: null,
  productId: null,
  status: 'idle'
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    saveIdToState: (state, action) => {
      console.log(action.payload)
      state.productId = action.payload
    },
    clearProductId: (state) => {
      state.productId = null
    },
    clearDetails: (state) => {
      state.details = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(findByCategory.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(findByCategory.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const data = action.payload?.data
        state.products = data.reduce((id, product) => {
          id[product?.id] = product
          return id
        }, {})
      })
      .addCase(findByCategory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getDetailById.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(getDetailById.fulfilled, (state, action) => {
        state.status = 'success'
        state.details = action.payload.data
      })
      .addCase(getDetailById.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })
  }
})

export const { clearProductId, saveIdToState, clearDetails } = productSlice.actions

export default productSlice.reducer

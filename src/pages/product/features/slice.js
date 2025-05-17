import { createSlice } from '@reduxjs/toolkit'
import { findProductDetailByIdAsync, searchProductByNameAsync } from './thunk'

const initialState = {
  listProductSearch: [],
  details: null,
  productId: null
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    saveIdToState: (state, action) => {
      state.productId = action.payload
    },
    leaveDetailPage: (state) => {
      state.details = null
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(findProductDetailByIdAsync.fulfilled, (state, action) => {
        state.details = action.payload?.data || null
      })

      .addCase(searchProductByNameAsync.fulfilled, (state, action) => {
        state.listProductSearch = action.payload?.data || []
      })
  }
})

export const { leaveDetailPage, saveIdToState } = productSlice.actions

export default productSlice.reducer

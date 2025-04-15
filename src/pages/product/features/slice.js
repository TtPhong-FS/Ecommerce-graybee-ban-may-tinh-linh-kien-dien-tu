import { createSlice } from '@reduxjs/toolkit'
import { getDetailById, searchProductByName } from './thunk'

const initialState = {
  listProductSearch: [],
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
      state.productId = action.payload
    },
    leaveDetailPage: (state) => {
      state.details = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailById.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(getDetailById.fulfilled, (state, action) => {
        state.status = 'success'
        state.details = action.payload?.data || null
      })
      .addCase(getDetailById.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(searchProductByName.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(searchProductByName.fulfilled, (state, action) => {
        state.status = 'success'
        state.listProductSearch = action.payload?.data || []
      })
      .addCase(searchProductByName.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })
  }
})

export const { leaveDetailPage, saveIdToState } = productSlice.actions

export default productSlice.reducer

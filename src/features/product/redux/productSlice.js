import { deleteReviewProductAsync, editReviewProductAsync, reviewProductAsync } from '@/features/account'
import { createSlice } from '@reduxjs/toolkit'
import { fetchProductDetailByIdAsync, searchProductByNameAsync } from './productThunk'

const initialState = {
  search: [],
  products: {},
  details: null
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    leaveDetailPage: (state) => {
      state.details = null
    },
    setSearch: (state) => {
      state.search = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetailByIdAsync.fulfilled, (state, action) => {
        state.details = action.payload?.data || null
      })

      .addCase(searchProductByNameAsync.fulfilled, (state, action) => {
        state.search = action.payload?.data || []
      })

      .addCase(reviewProductAsync.fulfilled, (state, action) => {
        const review = action.payload.data
        state.details.reviews.push(review)
      })
      .addCase(editReviewProductAsync.fulfilled, (state, action) => {
        const review = action.payload.data
        const index = state.details?.reviews.findIndex((r) => r.id === review.id)
        if (index !== -1) {
          state.details.reviews[index] = {
            ...review
          }
        }
      })
      .addCase(deleteReviewProductAsync.fulfilled, (state, action) => {
        const deletedReview = action.payload.data
        state.details.reviews = state.details.reviews.filter((r) => r.id !== deletedReview.reviewId)
      })
  }
})

export const { leaveDetailPage, setSearch } = productSlice.actions

export default productSlice.reducer

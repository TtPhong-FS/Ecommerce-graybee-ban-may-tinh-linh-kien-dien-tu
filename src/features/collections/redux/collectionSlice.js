import { createSlice } from '@reduxjs/toolkit'
import { fetchProductByCategorySlugAsync } from './collectionThunk'

const initialState = {
  collections: {}
}

const collectionSlice = createSlice({
  initialState,
  name: 'collections',
  extraReducers: (builder) => {
    builder.addCase(fetchProductByCategorySlugAsync.fulfilled, (state, action) => {
      const { categorySlug, data, page, sortBy, order } = action.payload

      const key = `page:${page}-sortBy:${sortBy}-order:${order}`

      if (!state.collections[categorySlug]) {
        state.collections[categorySlug] = {}
      }

      state.collections[categorySlug][key] = data.data
    })
  }
})

export default collectionSlice.reducer

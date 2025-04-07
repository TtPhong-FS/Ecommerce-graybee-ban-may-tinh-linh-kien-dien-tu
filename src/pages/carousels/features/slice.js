import { createSlice } from '@reduxjs/toolkit'
import {
  getProductCategoryByCpu,
  getProductCategoryByKeyboard,
  getProductCategoryByLaptop,
  getProductCategoryByMonitor,
  getProductCategoryByMouse,
  getProductCategoryByPc
} from './thunk'

const initialState = {
  laptops: [],
  pcs: [],
  cpus: [],
  monitors: [],
  mouses: [],
  keyboards: [],
  vgas: []
}

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategoryByLaptop.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.laptops = data || []
      })
      .addCase(getProductCategoryByPc.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.pcs = data || []
      })
      .addCase(getProductCategoryByCpu.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.cpus = data || []
      })
      .addCase(getProductCategoryByMonitor.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.monitors = data || []
      })
      .addCase(getProductCategoryByMouse.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.mouses = data || []
      })
      .addCase(getProductCategoryByKeyboard.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.keyboards = data || []
      })
  }
})

export default carouselSlice.reducer

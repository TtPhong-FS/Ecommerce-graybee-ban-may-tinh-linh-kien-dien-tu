import { createAsyncThunk } from '@reduxjs/toolkit'
import { carouselApi } from './api'

export const getProductCategoryByLaptop = createAsyncThunk('product/laptop', async () => {
  if (navigator.onLine) {
    const response = await carouselApi.getProductCategoryByLaptop()
    return response.data
  }
})

export const getProductCategoryByPc = createAsyncThunk('product/getProductCategoryByPc', async () => {
  if (navigator.onLine) {
    const response = await carouselApi.getProductCategoryByPc()
    return response.data
  }
})

export const getProductCategoryByCpu = createAsyncThunk('product/getProductCategoryByCpu', async () => {
  if (navigator.onLine) {
    const response = await carouselApi.getProductCategoryByCpu()
    return response.data
  }
})

export const getProductCategoryByMonitor = createAsyncThunk('product/getProductCategoryByMonitor', async () => {
  if (navigator.onLine) {
    const response = await carouselApi.getProductCategoryByMonitor()
    return response.data
  }
})

export const getProductCategoryByMouse = createAsyncThunk('product/getProductCategoryByMouse', async () => {
  if (navigator.onLine) {
    const response = await carouselApi.getProductCategoryByMouse()
    return response.data
  }
})

export const getProductCategoryByKeyboard = createAsyncThunk(
  'product/getProductCategoryByKeyboard',
  async (_, { rejectWithValue }) => {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await carouselApi.getProductCategoryByKeyboard()
    return response.data
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import { productApi } from './api'

export const findByCategory = createAsyncThunk('product/findByCategory', async ({ category }) => {
  const response = await productApi.findByCategory(category)
  return response.data
})

export const findByCategoryAndSubcategoryAndTag = createAsyncThunk(
  'product/findByCategoryAndSubcategoryAndTag',
  async ({ category, subcategory, tag }) => {
    const response = await productApi.findByCategoryAndSubcategoryAndTag(category, subcategory, tag)
    return response.data
  }
)

export const findByCategoryAndManufacturer = createAsyncThunk(
  'product/findByCategoryAndManufacturer',
  async ({ category, manufacturer }) => {
    const response = await productApi.findByCategoryAndManufacturer(category, manufacturer)
    return response.data
  }
)

export const getDetailById = createAsyncThunk('product/getDetailById', async ({ id }) => {
  const response = await productApi.getDetailById(id)
  return response.data
})

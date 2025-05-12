import { handleCreateAsyncThunk } from '@/components/func'
import { productApi } from './api'

export const findByCategory = handleCreateAsyncThunk('product/findByCategory', async (category) => {
  const response = await productApi.findByCategory(category)
  return response.data
})

export const findByCategoryAndSubcategoryAndTag = handleCreateAsyncThunk(
  'product/findByCategoryAndSubcategoryAndTag',
  async ({ category, subcategory, tag }) => {
    const response = await productApi.findByCategoryAndSubcategoryAndTag(category, subcategory, tag)
    return response.data
  }
)

export const findByCategoryAndManufacturer = handleCreateAsyncThunk(
  'product/findByCategoryAndManufacturer',
  async ({ category, manufacturer }) => {
    const response = await productApi.findByCategoryAndManufacturer(category, manufacturer)
    return response.data
  }
)

export const searchProductByName = handleCreateAsyncThunk('product/searchProductByName', async (keyword) => {
  const response = await productApi.searchProductByName(keyword)
  return response.data
})

export const getDetailById = handleCreateAsyncThunk('product/getDetailById', async (id) => {
  const response = await productApi.getDetailById(id)
  return response.data
})

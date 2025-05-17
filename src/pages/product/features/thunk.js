import { handleCreateAsyncThunk } from '@/components/func'
import { productApi } from './api'

export const findByCategoryAsync = handleCreateAsyncThunk('product/findByCategory', async (category) => {
  const response = await productApi.findByCategoryApi(category)
  return response.data
})

export const findByCategoryAndSubcategoryAndTagAsync = handleCreateAsyncThunk(
  'product/findByCategoryAndSubcategoryAndTag',
  async ({ category, subcategory, tag }) => {
    const response = await productApi.findByCategoryAndSubcategoryAndTagApi(category, subcategory, tag)
    return response.data
  }
)

export const findByCategoryAndManufacturerAsync = handleCreateAsyncThunk(
  'product/findByCategoryAndManufacturer',
  async ({ category, manufacturer }) => {
    const response = await productApi.findByCategoryAndManufacturerApi(category, manufacturer)
    return response.data
  }
)

export const searchProductByNameAsync = handleCreateAsyncThunk('product/searchProductByName', async (keyword) => {
  const response = await productApi.searchProductByNameApi(keyword)
  return response.data
})

export const findProductDetailByIdAsync = handleCreateAsyncThunk('product/getDetailById', async (id) => {
  const response = await productApi.findProductDetailByIdApi(id)
  return response.data
})

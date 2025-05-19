import { handleCreateAsyncThunk } from '@/lib'
import { productApi } from './productApi'

export const fetchByCategoryAsync = handleCreateAsyncThunk('product/fetchByCategoryAsync', async (category) => {
  const response = await productApi.findByCategoryApi(category)
  return response.data
})

export const fetchProductByCategoryAndSubcategoryAndTagAsync = handleCreateAsyncThunk(
  'product/fetchProductByCategoryAndSubcategoryAndTagAsync',
  async ({ category, subcategory, tag }) => {
    const response = await productApi.getProductByCategoryAndSubcategoryAndTag(category, subcategory, tag)
    return response.data
  }
)

export const fetchByCategoryAndManufacturerAsync = handleCreateAsyncThunk(
  'product/fetchByCategoryAndManufacturerAsync',
  async ({ category, manufacturer }) => {
    const response = await productApi.getProductByCategoryAndManufacturer(category, manufacturer)
    return response.data
  }
)

export const searchProductByNameAsync = handleCreateAsyncThunk('product/searchProductByNameAsync', async (keyword) => {
  const response = await productApi.searchProductByName(keyword)
  return response.data
})

export const fetchProductDetailByIdAsync = handleCreateAsyncThunk('product/fetchProductDetailByIdAsync', async (id) => {
  const response = await productApi.getProductDetailById(id)
  return response.data
})

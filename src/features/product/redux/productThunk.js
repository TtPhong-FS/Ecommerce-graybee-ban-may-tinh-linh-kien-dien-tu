import { handleCreateAsyncThunk } from '@/lib'
import { productApi } from './productApi'

export const getAllProductAsync = handleCreateAsyncThunk('product/getAllProductAsync', async () => {
  const response = await productApi.getAllProduct()
  return response.data
})

export const searchProductByNameAsync = handleCreateAsyncThunk('product/searchProductByNameAsync', async (keyword) => {
  const response = await productApi.searchProductByName(keyword)
  return response.data
})

export const fetchProductDetailByIdAsync = handleCreateAsyncThunk(
  'product/fetchProductDetailByIdAsync',
  async (slug) => {
    const response = await productApi.getProductDetailById(slug)
    return response.data
  }
)

export const getProductByCategory = handleCreateAsyncThunk('product/getProductByCategory', async (category) => {
  const response = await productApi.getProductByCategory(category)
  return {
    category: category,
    products: response.data
  }
})

import { handleCreateAsyncThunk } from '@/lib'
import { collectionApi } from './collectionApi'

export const fetchProductByCategorySlugAsync = handleCreateAsyncThunk(
  'product/fetchProductByCategorySlugAsync',
  async (categorySlug) => {
    const response = await collectionApi.fetchProductByCategorySlug(categorySlug)
    return response.data
  }
)
export const fetchProductByTagSlugAsync = handleCreateAsyncThunk(
  'product/fetchProductByTagSlugAsync',
  async (tagSlug) => {
    const response = await collectionApi.fetchProductByTagSlug(tagSlug)
    return response.data
  }
)

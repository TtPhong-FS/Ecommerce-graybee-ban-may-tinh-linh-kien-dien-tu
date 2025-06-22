import { handleCreateAsyncThunk } from '@/lib'
import { collectionApi } from './collectionApi'

export const fetchProductByCategorySlugAsync = handleCreateAsyncThunk(
  'product/fetchProductByCategorySlugAsync',
  async ({ slug, type }) => {
    const response = await collectionApi.fetchProductByCategorySlugAndType(slug, type)
    return response.data
  }
)

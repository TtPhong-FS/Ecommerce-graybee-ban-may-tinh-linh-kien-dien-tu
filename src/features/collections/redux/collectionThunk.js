import { handleCreateAsyncThunk } from '@/lib'
import { collectionApi } from './collectionApi'

export const fetchProductByCategorySlugAsync = handleCreateAsyncThunk(
  'product/fetchProductByCategorySlugAsync',
  async ({ slug, page = 1, sortBy = 'updatedAt', order = 'desc' }) => {
    const response = await collectionApi.fetchProductByCategorySlugAndType(slug, page - 1, sortBy, order)
    return {
      categorySlug: slug,
      page,
      sortBy,
      order,
      data: response.data
    }
  }
)

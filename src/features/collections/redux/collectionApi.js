import { publicAPI } from '@/config'

export const COLLECTION_ENDPOINT = '/api/v1/public/collections'

export const collectionApi = {
  fetchProductByCategorySlugAndType: (slug, page, sortBy, order) =>
    publicAPI.get(`${COLLECTION_ENDPOINT}/${slug}`, {
      params: {
        page: page,
        sortBy: sortBy,
        order: order
      }
    })
}

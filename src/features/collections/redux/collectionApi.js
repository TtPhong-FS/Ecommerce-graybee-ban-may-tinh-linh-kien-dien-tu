import { publicAPI } from '@/config'

export const COLLECTION_ENDPOINT = '/api/v1/public/collections'

export const collectionApi = {
  fetchProductByCategorySlugAndType: (slug, type) => publicAPI.get(`${COLLECTION_ENDPOINT}/${slug}?type=${type}`)
}

import { publicAPI } from '@/config'

export const COLLECTION_ENDPOINT = '/api/v1/public/collections'

export const collectionApi = {
  fetchProductByCategorySlug: (categorySlug) => publicAPI.get(`${COLLECTION_ENDPOINT}/categories/${categorySlug}`),
  fetchProductByTagSlug: (tagSlug) => publicAPI.get(`${COLLECTION_ENDPOINT}/tags/${tagSlug}`)
}

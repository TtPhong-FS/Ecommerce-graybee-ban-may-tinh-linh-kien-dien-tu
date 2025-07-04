import { HOME_URL } from '@/api/constants'
import { publicAPI } from '@/config'

export const collectionApi = {
  fetchProductByCategorySlugAndType: (slug, page, sortBy, order) =>
    publicAPI.get(`${HOME_URL}/collections/${slug}`, {
      params: {
        page: page,
        sortBy: sortBy,
        order: order
      }
    })
}

import { HOME_URL } from '@/api/constants'
import { api } from '@/config'

export const collectionApi = {
  fetchProductByCategorySlugAndType: (slug, page, sortBy, order) =>
    api.get(`${HOME_URL}/collections/${slug}`, {
      params: {
        page: page,
        sortBy: sortBy,
        order: order
      }
    })
}

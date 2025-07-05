import { HOME_URL } from '@/api/constants'
import { api } from '@/config'

export const productApi = {
  getProductDetailById: (slug) => api.get(`${HOME_URL}/products/detail/${slug}`),
  searchProductByName: (keyword) => api.get(`${HOME_URL}/products/search/${keyword}`)
}

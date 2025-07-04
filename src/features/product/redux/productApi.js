import { HOME_URL } from '@/api/constants'
import { publicAPI } from '@/config'

export const productApi = {
  getProductDetailById: (slug) => publicAPI.get(`${HOME_URL}/products/detail/${slug}`),
  searchProductByName: (keyword) => publicAPI.get(`${HOME_URL}/products/search/${keyword}`)
}

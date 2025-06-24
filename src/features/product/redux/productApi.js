import { publicAPI } from '@/config'

const product_endpoint = 'api/v1/public/products'

export const productApi = {
  getProductDetailById: (slug) => publicAPI.get(`${product_endpoint}/detail/${slug}`),
  searchProductByName: (keyword) => publicAPI.get(`${product_endpoint}/search/${keyword}`),
  getAllProduct: () => publicAPI.get(product_endpoint)
}

import { publicAPI } from '../../../config/axiosServer'

const product_endpoint = 'api/v1/public/products'

export const productApi = {
  getProductDetailById: (slug) => publicAPI.get(`${product_endpoint}/${slug}`),
  searchProductByName: (keyword) => publicAPI.get(`${product_endpoint}/${keyword}`),
  getAllProduct: () => publicAPI.get(product_endpoint)
}

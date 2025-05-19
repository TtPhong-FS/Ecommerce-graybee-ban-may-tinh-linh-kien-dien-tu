import { publicAPI } from '../../../config/axiosServer'

const product_endpoint = 'api/v1/public/products'

export const productApi = {
  getProductByCategory: (category) => publicAPI.get(`${product_endpoint}/by-category?category=${category}`),
  getProductByCategoryAndManufacturer: (category, manufacturer) =>
    publicAPI.get(`${product_endpoint}/by-category-and-manufacturer?category=${category}&manufacturer=${manufacturer}`),
  getProductByCategoryAndSubcategoryAndTag: (category, subcategory, tag) =>
    publicAPI.get(
      `${product_endpoint}/by-category-and-subcategory-and-tag?category=${category}&subcategory=${subcategory}&tag=${tag}`
    ),
  getProductDetailById: (id) => publicAPI.get(`${product_endpoint}/detail/${id}`),
  searchProductByName: (keyword) => publicAPI.get(`${product_endpoint}/search?keyword=${keyword}`)
}

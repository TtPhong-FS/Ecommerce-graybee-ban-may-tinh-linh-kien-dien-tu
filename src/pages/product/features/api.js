import { publicAPI } from '../../../config/axiosServer'

const product_endpoint = 'api/v1/public/products'

export const productApi = {
  findByCategoryApi: (category) => publicAPI.get(`${product_endpoint}/by-category?category=${category}`),
  findByCategoryAndManufacturerApi: (category, manufacturer) =>
    publicAPI.get(`${product_endpoint}/by-category-and-manufacturer?category=${category}&manufacturer=${manufacturer}`),
  findByCategoryAndSubcategoryAndTagApi: (category, subcategory, tag) =>
    publicAPI.get(
      `${product_endpoint}/by-category-and-subcategory-and-tag?category=${category}&subcategory=${subcategory}&tag=${tag}`
    ),
  findProductDetailByIdApi: (id) => publicAPI.get(`${product_endpoint}/detail/${id}`),
  searchProductByNameApi: (keyword) => publicAPI.get(`${product_endpoint}/search?keyword=${keyword}`)
}

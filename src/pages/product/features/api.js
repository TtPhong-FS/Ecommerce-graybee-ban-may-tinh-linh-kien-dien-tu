import { API_URL } from '../../../config/axiosServer'

const product_endpoint = 'api/v1/public/products'

export const productApi = {
  findByCategory: (category) => API_URL.get(`${product_endpoint}/by-category?category=${category}`, {}),
  findByCategoryAndManufacturer: (category, manufacturer) =>
    API_URL.get(
      `${product_endpoint}/by-category-and-manufacturer?category=${category}&manufacturer=${manufacturer}`,
      {}
    ),
  findByCategoryAndSubcategoryAndTag: (category, subcategory, tag) =>
    API_URL.get(
      `${product_endpoint}/by-category-and-subcategory-and-tag?category=${category}&subcategory=${subcategory}&tag=${tag}`,
      {}
    ),
  getDetailById: (id) => API_URL.get(`${product_endpoint}/detail?id=${id}`, {}),
  searchProductByName: (keyword) => API_URL.get(`${product_endpoint}/search?keyword=${keyword}`, {})
}

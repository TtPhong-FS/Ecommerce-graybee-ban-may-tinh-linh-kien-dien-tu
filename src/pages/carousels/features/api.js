import { API_URL } from '../../../config/axiosServer'

const carousel_endpoint = '/api/v1/public/carousel/product'

export const carouselApi = {
  getProductCategoryByLaptop: () => API_URL.get(`${carousel_endpoint}?category=laptop`, {}),
  getProductCategoryByPc: () => API_URL.get(`${carousel_endpoint}?category=pc`, {}),
  getProductCategoryByMonitor: () => API_URL.get(`${carousel_endpoint}?category=monitor`, {}),
  getProductCategoryByKeyboard: () => API_URL.get(`${carousel_endpoint}?category=keyboard`, {}),
  getProductCategoryByMouse: () => API_URL.get(`${carousel_endpoint}?category=mouse`, {}),
  getProductCategoryByCpu: () => API_URL.get(`${carousel_endpoint}?category=cpu`, {})
}

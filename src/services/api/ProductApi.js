import { API_URL } from "../../axiosServer";

const PRODUCT_ENDPOINT = "/api/v1/admin/products";

export const productAPI = {
  fetchByCategory: (categoryId) => API_URL.get(`${PRODUCT_ENDPOINT}/category/${categoryId}`),
};

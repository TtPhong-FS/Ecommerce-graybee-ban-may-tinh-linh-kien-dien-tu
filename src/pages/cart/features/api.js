import { API_URL } from '../../../config/axiosServer'

const cart_endpoint = '/api/v1/public/carts'

export const cartApi = {
  addItemToCart: (request, token) =>
    API_URL.post(`${cart_endpoint}/add`, request, {
      headers: { Authorization: token }
    }),
  decreaseQuantityToCartItem: (request, token) =>
    API_URL.put(`${cart_endpoint}/item/decrease`, request, {
      headers: { Authorization: token }
    }),
  deleteItemToCart: (cartItemId, token) =>
    API_URL.delete(`${cart_endpoint}/item/delete?cartItemId=${cartItemId}`, {
      headers: { Authorization: token }
    }),
  findCartByUserUidOrSessionId: (token) => API_URL.get(cart_endpoint, { headers: { Authorization: token } }),
  clearItemsToCart: (token) =>
    API_URL.delete(cart_endpoint, {
      headers: {
        Authorization: token
      }
    })
}

import { privateAPI } from '../../../config/axiosServer'

const cart_endpoint = '/api/v1/public/carts'

export const cartApi = {
  postCart: (request) => privateAPI.post(`${cart_endpoint}/add`, request),
  putQuantityToCartItem: (request) => privateAPI.put(`${cart_endpoint}/item/decrease`, request),
  deleteItemToCart: (cartItemId) => privateAPI.delete(`${cart_endpoint}/item/delete?cartItemId=${cartItemId}`),
  getCartByUserUidOrSessionId: () => privateAPI.get(cart_endpoint),
  deleteItemsToCart: () => privateAPI.delete(cart_endpoint)
}

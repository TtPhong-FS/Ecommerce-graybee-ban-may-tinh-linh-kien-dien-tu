import { privateAPI } from '../../../config/axiosServer'

const cart_endpoint = '/api/v1/public/carts'

export const cartApi = {
  addItemToCart: (request) => privateAPI.post(`${cart_endpoint}/add`, request),
  decreaseQuantityToCartItem: (request) => privateAPI.put(`${cart_endpoint}/item/decrease`, request),
  deleteItemToCart: (cartItemId) => privateAPI.delete(`${cart_endpoint}/item/delete?cartItemId=${cartItemId}`),
  findCartByUserUidOrSessionId: () => privateAPI.get(cart_endpoint),
  clearItemsToCart: () => privateAPI.delete(cart_endpoint)
}

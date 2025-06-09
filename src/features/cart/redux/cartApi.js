import { privateAPI } from '@/config'

const cart_endpoint = '/api/v1/public/carts'

export const cartApi = {
  addItemToCart: (request) => privateAPI.post(cart_endpoint, request),
  decreaseQuantity: (request) => privateAPI.put(`${cart_endpoint}/decrease/quantity`, request),
  deleteItemToCart: (cartItemId) => privateAPI.delete(`${cart_endpoint}/${cartItemId}`),
  getCartByUserUidOrSessionId: () => privateAPI.get(cart_endpoint),
  clearCartItems: () => privateAPI.delete(`${cart_endpoint}/clear-items`)
}

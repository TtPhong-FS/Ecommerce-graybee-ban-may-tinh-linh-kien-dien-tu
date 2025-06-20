import { privateAPI } from '@/config'

const cart_endpoint = '/api/v1/public/carts'

export const cartApi = {
  addItemToCart: (productId) => privateAPI.post(`${cart_endpoint}/products/${productId}`, productId),
  decreaseQuantity: (productId) => privateAPI.put(`${cart_endpoint}/decrease/${productId}`),
  updateQuantity: (cartItemId, quantity) => privateAPI.put(`${cart_endpoint}/quantity/${cartItemId}/${quantity}`),
  deleteItemToCart: (cartItemId) => privateAPI.delete(`${cart_endpoint}/${cartItemId}`),
  getCartByUserUidOrSessionId: () => privateAPI.get(cart_endpoint),
  clearCartItems: () => privateAPI.delete(`${cart_endpoint}/clear-items`)
}

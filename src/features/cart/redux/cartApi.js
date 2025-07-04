import { CART_URL } from '@/api/constants'
import { privateAPI } from '@/config'

export const cartApi = {
  addItemToCart: (productId) => privateAPI.post(`${CART_URL}/products/${productId}`, productId),
  decreaseQuantity: (productId) => privateAPI.put(`${CART_URL}/decrease/${productId}`),
  updateQuantity: (cartItemId, quantity) => privateAPI.put(`${CART_URL}/quantity/${cartItemId}/${quantity}`),
  deleteItemToCart: (cartItemId) => privateAPI.delete(`${CART_URL}/${cartItemId}`),
  getCartByUserUidOrSessionId: () => privateAPI.get(CART_URL),
  clearCartItems: () => privateAPI.delete(`${CART_URL}/clear-items`)
}

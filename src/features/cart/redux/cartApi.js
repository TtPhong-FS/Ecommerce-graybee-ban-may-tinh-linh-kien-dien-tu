import { CART_URL } from '@/api/constants'
import { api } from '@/config'

export const cartApi = {
  addItemToCart: (productId) => api.post(`${CART_URL}/products/${productId}`, productId),
  decreaseQuantity: (productId) => api.put(`${CART_URL}/decrease/${productId}`),
  updateQuantity: (cartItemId, quantity) => api.put(`${CART_URL}/quantity/${cartItemId}/${quantity}`),
  deleteItemToCart: (cartItemId) => api.delete(`${CART_URL}/${cartItemId}`),
  getCartByUserUidOrSessionId: () => api.get(CART_URL),
  clearCartItems: () => api.delete(`${CART_URL}/clear-items`)
}

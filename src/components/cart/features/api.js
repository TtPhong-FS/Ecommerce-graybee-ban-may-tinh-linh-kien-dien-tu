import { privateAPI } from '../../../config/axiosServer'

const cart_endpoint = '/api/v1/public/carts'

export const cartApi = {
  addItemToCartApi: (request) => privateAPI.post(`${cart_endpoint}/add`, request),
  decreaseQuantityToCartItemApi: (request) => privateAPI.put(`${cart_endpoint}/item/decrease`, request),
  deleteItemToCartApi: (cartItemId) => privateAPI.delete(`${cart_endpoint}/item/delete?cartItemId=${cartItemId}`),
  findCartByUserUidOrSessionIdApi: () => privateAPI.get(cart_endpoint),
  clearItemsToCartApi: () => privateAPI.delete(cart_endpoint)
}

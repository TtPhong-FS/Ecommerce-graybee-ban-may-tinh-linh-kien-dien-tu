import { handleCreateAsyncThunk } from '@/lib'
import { cartApi } from './cartApi'

export const addItemToCartAsync = handleCreateAsyncThunk('cart/addItemToCartAsync', async (productId) => {
  const response = await cartApi.addItemToCart(productId)
  return response.data
})

export const decreaseQuantityAsync = handleCreateAsyncThunk('cart/decreaseQuantityAsync', async (productId) => {
  const response = await cartApi.decreaseQuantity(productId)
  return response.data
})

export const getCartByUserUidOrSessionIdAsync = handleCreateAsyncThunk(
  'cart/getCartByUserUidOrSessionIdAsync',
  async () => {
    const response = await cartApi.getCartByUserUidOrSessionId()
    return response.data
  }
)

export const deleteItemToCartAsync = handleCreateAsyncThunk('cart/deleteItemToCartAsync', async (cartItemId) => {
  const response = await cartApi.deleteItemToCart(cartItemId)
  return response.data
})

export const clearCartItemsAsync = handleCreateAsyncThunk('cart/clearCartItemsAsync', async () => {
  const response = await cartApi.clearCartItems()
  return response.data
})

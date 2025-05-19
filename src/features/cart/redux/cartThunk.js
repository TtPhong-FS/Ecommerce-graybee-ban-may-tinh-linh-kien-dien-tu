import { handleCreateAsyncThunk } from '@/lib'
import { cartApi } from './cartApi'

export const createCartAsync = handleCreateAsyncThunk('cart/createCartAsync', async (request) => {
  const response = await cartApi.postCart(request)
  return response.data
})

export const updateQuantityToCartItemAsync = handleCreateAsyncThunk(
  'cart/updateQuantityToCartItemAsync',
  async (request) => {
    const response = await cartApi.putQuantityToCartItem(request)
    return response.data
  }
)

export const fetchCartByUserUidOrSessionIdAsync = handleCreateAsyncThunk(
  'cart/fetchCartByUserUidOrSessionIdAsync',
  async () => {
    const response = await cartApi.getCartByUserUidOrSessionId()
    return response.data
  }
)

export const deleteItemToCartAsync = handleCreateAsyncThunk('cart/deleteItemToCartAsync', async (cartItemId) => {
  const response = await cartApi.deleteItemToCart(cartItemId)
  return response.data
})

export const deleteItemsToCartAsync = handleCreateAsyncThunk('cart/deleteItemsToCartAsync', async () => {
  const response = await cartApi.deleteItemsToCart()
  return response.data
})

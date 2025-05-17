import { handleCreateAsyncThunk } from '@/components/func'
import { cartApi } from './api'

export const addItemToCartAsync = handleCreateAsyncThunk('cart/addItemToCart', async (request) => {
  const response = await cartApi.addItemToCartApi(request)
  return response.data
})

export const decreaseQuantityToCartItemAsync = handleCreateAsyncThunk(
  'cart/decreaseQuantityToCartItem',
  async (request) => {
    const response = await cartApi.decreaseQuantityToCartItemApi(request)
    return response.data
  }
)

export const findCartByUserUidOrSessionIdAsync = handleCreateAsyncThunk(
  'cart/findCartByUserUidOrSessionId',
  async () => {
    const response = await cartApi.findCartByUserUidOrSessionIdApi()
    return response.data
  }
)

export const deleteItemToCartAsync = handleCreateAsyncThunk('cart/deleteItemToCart', async (cartItemId) => {
  const response = await cartApi.deleteItemToCartApi(cartItemId)
  return response.data
})

export const clearItemsToCartAsync = handleCreateAsyncThunk('cart/clearItemsToCart', async () => {
  const response = await cartApi.clearItemsToCartApi()
  return response.data
})

import { handleCreateAsyncThunk } from '@/components/func'
import { cartApi } from './api'

export const addItemToCart = handleCreateAsyncThunk('cart/addItemToCart', async (request) => {
  const response = await cartApi.addItemToCart(request)
  return response.data
})

export const decreaseQuantityToCartItem = handleCreateAsyncThunk('cart/decreaseQuantityToCartItem', async (request) => {
  const response = await cartApi.decreaseQuantityToCartItem(request)
  return response.data
})

export const findCartByUserUidOrSessionId = handleCreateAsyncThunk('cart/findCartByUserUidOrSessionId', async () => {
  const response = await cartApi.findCartByUserUidOrSessionId()
  return response.data
})

export const deleteItemToCart = handleCreateAsyncThunk('cart/deleteItemToCart', async (cartItemId) => {
  const response = await cartApi.deleteItemToCart(cartItemId)
  return response.data
})

export const clearItemsToCart = handleCreateAsyncThunk('cart/clearItemsToCart', async () => {
  const response = await cartApi.clearItemsToCart()
  return response.data
})

import { handleCreateAsyncThunk } from '@/lib'
import { cartApi } from './cartApi'

export const addItemToCartAsync = handleCreateAsyncThunk('cart/addItemToCartAsync', async (productId) => {
  const response = await cartApi.addItemToCart(productId)
  return { productId: productId, data: response.data }
})

export const decreaseQuantityAsync = handleCreateAsyncThunk('cart/decreaseQuantityAsync', async (productId) => {
  const response = await cartApi.decreaseQuantity(productId)
  return { productId: productId, data: response.data }
})

export const updateQuantityAsync = handleCreateAsyncThunk(
  'cart/updateQuantityAsync',
  async ({ cartItemId, quantity }) => {
    const response = await cartApi.updateQuantity(cartItemId, quantity)
    return response.data
  }
)

export const getCartByUserUidOrSessionIdAsync = handleCreateAsyncThunk(
  'cart/getCartByUserUidOrSessionIdAsync',
  async () => {
    const response = await cartApi.getCartByUserUidOrSessionId()
    return response.data
  }
)

export const deleteItemToCartAsync = handleCreateAsyncThunk('cart/deleteItemToCartAsync', async (cartItemId) => {
  const res = await cartApi.deleteItemToCart(cartItemId)
  return { cartItemId: cartItemId, data: res.data }
})

export const clearCartItemsAsync = handleCreateAsyncThunk('cart/clearCartItemsAsync', async () => {
  const response = await cartApi.clearCartItems()
  return response.data
})

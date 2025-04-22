import { createAsyncThunk } from '@reduxjs/toolkit'
import { cartApi } from './api'

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ request }, { rejectWithValue }) => {
  try {
    if (!navigator.connection) {
      return rejectWithValue('No internet connection')
    }
    const response = await cartApi.addItemToCart(request)
    return response.data
  } catch (error) {
    if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
      return rejectWithValue({
        unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
      })
    }

    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    }
  }
})

export const decreaseQuantityToCartItem = createAsyncThunk(
  'cart/decreaseQuantityToCartItem',
  async ({ request }, { rejectWithValue }) => {
    try {
      debugger
      if (!navigator.connection) {
        return rejectWithValue('No internet connection')
      }
      const response = await cartApi.decreaseQuantityToCartItem(request)
      return response.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }

      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

export const findCartByUserUidOrSessionId = createAsyncThunk(
  'cart/findCartByUserUidOrSessionId',
  async (_, { rejectWithValue }) => {
    try {
      if (!navigator.connection) {
        return rejectWithValue('No internet connection')
      }
      const response = await cartApi.findCartByUserUidOrSessionId()
      return response.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }

      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

export const deleteItemToCart = createAsyncThunk(
  'cart/deleteItemToCart',
  async ({ cartItemId }, { rejectWithValue }) => {
    try {
      if (!navigator.connection) {
        return rejectWithValue('No internet connection')
      }
      const response = await cartApi.deleteItemToCart(cartItemId)
      return response.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }

      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

export const clearItemsToCart = createAsyncThunk('cart/clearItemsToCart', async (_, { rejectWithValue }) => {
  try {
    if (!navigator.connection) {
      return rejectWithValue('No internet connection')
    }
    const response = await cartApi.clearItemsToCart()
    return response.data
  } catch (error) {
    if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
      return rejectWithValue({
        unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
      })
    }
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    }
  }
})

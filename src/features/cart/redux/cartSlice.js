import { createSlice } from '@reduxjs/toolkit'
import {
  addItemToCartAsync,
  clearCartItemsAsync,
  decreaseQuantityAsync,
  deleteItemToCartAsync,
  getCartByUserUidOrSessionIdAsync
} from './cartThunk'

const initialState = {
  cartItems: [],
  totalAmount: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeItemsByIds: (state, action) => {
      const ids = action.payload
      state.cartItems = state.cartItems?.filter((item) => !ids.includes(item.id))
      state.totalAmount = state.cartItems.reduce((sum, cartItem) => sum + cartItem.total, 0)
    },
    clearAll: (state) => {
      state.cartItems = []
      state.totalAmount = 0
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getCartByUserUidOrSessionIdAsync.fulfilled, (state, action) => {
        const data = action.payload?.data || []
        if (data) {
          state.cartItems = data
          state.totalAmount = state.cartItems.reduce((sum, cartItem) => sum + cartItem.total, 0)
        }
      })

      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        const currentItem = state.cartItems?.findIndex((i) => i.id === data?.id)
        if (currentItem === -1) {
          state.cartItems.push(data)
        } else {
          state.cartItems = state.cartItems?.map((ci) =>
            ci.id === data.id ? { ...ci, quantity: data.quantity, total: data.total } : ci
          )
        }
        state.totalAmount = state.cartItems?.reduce((sum, cartItem) => sum + cartItem.total, 0)
      })

      .addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        console.log(data)
        if (data?.id) {
          state.cartItems = state.cartItems?.map((ci) =>
            ci.id === data.id ? { ...ci, quantity: data.quantity, total: data.total } : ci
          )
          state.totalAmount = state.cartItems?.reduce((sum, cartItem) => sum + cartItem.total, 0)
        }
      })

      .addCase(deleteItemToCartAsync.fulfilled, (state, action) => {
        const id = action.payload?.data
        if (id) {
          state.cartItems = state.cartItems?.filter((ci) => ci.id !== id)
          state.totalAmount = state.cartItems?.reduce((sum, cartItem) => sum + cartItem.total, 0)
        }
      })

      .addCase(clearCartItemsAsync.fulfilled, (state, action) => {
        const empty = action.payload.data
        state.cartItems = empty
        state.totalAmount = 0
      })
  }
})
export const { clearAll, removeItemsByIds } = cartSlice.actions
export default cartSlice.reducer

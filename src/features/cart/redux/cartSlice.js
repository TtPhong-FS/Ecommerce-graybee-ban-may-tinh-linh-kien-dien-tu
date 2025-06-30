import { createSlice } from '@reduxjs/toolkit'
import {
  addItemToCartAsync,
  clearCartItemsAsync,
  decreaseQuantityAsync,
  deleteItemToCartAsync,
  getCartByUserUidOrSessionIdAsync,
  updateQuantityAsync
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
      state.cartItems = state.cartItems?.filter((item) => !ids.includes(item.cartItemId))
      state.totalAmount = state.cartItems.reduce((sum, cartItem) => sum + cartItem.totalAmount, 0)
    },
    clearCart: (state) => {
      state.cartItems = []
      state.totalAmount = 0
    },
    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload
      const item = state.cartItems.find((i) => i.cartItemId === cartItemId)
      if (item) {
        item.quantity = quantity
      }
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
        const { productId, data } = action.payload
        const index = state.cartItems?.findIndex((i) => i.product.id === productId)
        if (index !== -1) {
          state.cartItems[index] = {
            ...state.cartItems[index],
            ...data.data
          }
        } else {
          state.cartItems.push(data.data)
        }
      })

      .addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
        const { productId, data } = action.payload

        const index = state.cartItems?.findIndex((i) => i.product.id === productId)

        if (index !== -1) {
          state.cartItems[index] = {
            ...state.cartItems[index],
            ...data.data
          }
        }
      })

      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        if (data?.cartItemId) {
          const index = state.cartItems?.findIndex((i) => i.cartItemId === data?.cartItemId)

          if (index !== -1) {
            state.cartItems[index] = {
              ...state.cartItems[index],
              ...data
            }
          }

          state.totalAmount = state.cartItems?.reduce((sum, cartItem) => sum + cartItem.totalAmount, 0)
        }
      })

      .addCase(deleteItemToCartAsync.fulfilled, (state, action) => {
        const { cartItemId } = action.payload

        state.cartItems = state.cartItems?.filter((ci) => ci.cartItemId !== cartItemId)
      })

      .addCase(clearCartItemsAsync.fulfilled, (state, action) => {
        state.cartItems = []
      })
  }
})
export const { clearCart, removeItemsByIds, updateQuantity } = cartSlice.actions
export default cartSlice.reducer

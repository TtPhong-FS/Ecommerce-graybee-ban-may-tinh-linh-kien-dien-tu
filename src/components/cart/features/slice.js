import { createSlice } from '@reduxjs/toolkit'
import {
  addItemToCart,
  clearItemsToCart,
  decreaseQuantityToCartItem,
  deleteItemToCart,
  findCartByUserUidOrSessionId
} from './thunk'

const initialState = {
  cartItems: [],
  totalAmount: 0,
  error: null,
  status: 'idle'
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeItemsByIds: (state, action) => {
      debugger
      const ids = action.payload

      state.cartItems = state.cartItems?.filter((item) => !ids.includes(item.id))
      state.totalAmount = state.cartItems.reduce((sum, cartItem) => sum + cartItem.total, 0)
    },
    clearAll: (state) => {
      state.cartItems = []
      state.totalAmount = 0
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(findCartByUserUidOrSessionId.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(findCartByUserUidOrSessionId.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const data = action.payload?.data || []
        if (data) {
          state.cartItems = data
          state.totalAmount = state.cartItems.reduce((sum, cartItem) => sum + cartItem.total, 0)
        }
      })
      .addCase(findCartByUserUidOrSessionId.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(addItemToCart.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
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
      .addCase(addItemToCart.rejected, (state) => {
        state.status = 'failed'
      })

      // Decrease quantity
      .addCase(decreaseQuantityToCartItem.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(decreaseQuantityToCartItem.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const data = action.payload?.data
        console.log(data)
        if (data?.id) {
          state.cartItems = state.cartItems?.map((ci) =>
            ci.id === data.id ? { ...ci, quantity: data.quantity, total: data.total } : ci
          )
          state.totalAmount = state.cartItems?.reduce((sum, cartItem) => sum + cartItem.total, 0)
        }
      })
      .addCase(decreaseQuantityToCartItem.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(deleteItemToCart.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(deleteItemToCart.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const id = action.payload?.data
        if (id) {
          state.cartItems = state.cartItems?.filter((ci) => ci.id !== id)
          state.totalAmount = state.cartItems?.reduce((sum, cartItem) => sum + cartItem.total, 0)
        }
      })
      .addCase(deleteItemToCart.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(clearItemsToCart.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(clearItemsToCart.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const empty = action.payload.data
        state.cartItems = empty
        state.totalAmount = 0
      })
      .addCase(clearItemsToCart.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })
  }
})
export const { clearAll, removeItemsByIds } = cartSlice.actions
export default cartSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  carts: [],
  quantity: 0,
  totalPrice: 0
}

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity: (state, action) => {
      const productId = action.payload
      const existingItem = state.carts.find((item) => item.id === productId)

      if (existingItem) {
        existingItem.quantity += 1
        state.quantity += 1
        state.totalPrice += existingItem.finalPrice
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload
      const existingItem = state.carts.find((item) => item.id === productId)

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1
        state.quantity -= 1
        state.totalPrice -= existingItem.finalPrice
      }
    },

    removeItem: (state, action) => {
      const productId = action.payload

      const existingItem = state.carts.find((item) => item.id === productId)
      if (existingItem) {
        state.quantity -= existingItem.quantity
        state.totalPrice -= existingItem.finalPrice * existingItem.quantity
        state.carts = state.carts.filter((item) => item.id !== productId)
      }
    },
    clearItems: (state) => {
      state.carts = []
      state.quantity = 0
      state.totalPrice = 0
    }
  }
})

export const { addToCart, removeItem, clearItems, decreaseQuantity, increaseQuantity } = CartSlice.actions

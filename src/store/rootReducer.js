import { sidebarSlice } from '@/components/sidebar'
import { authSlice } from '@/features/auth'
import { carouselSlice } from '@/features/carousels'
import { cartSlice } from '@/features/cart'
import { productSlice } from '@/features/product'
import { accountSlice } from '@/features/user'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  product: productSlice,
  cart: cartSlice,
  account: accountSlice,
  carousel: carouselSlice,
  auth: authSlice,
  sidebar: sidebarSlice
})

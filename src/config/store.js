import { combineReducers } from 'redux'

import { sidebarSlice } from '../components/sidebar/features'
import { authSlice } from '../pages/auth/features'
import { carouselSlice } from '../pages/carousels/features'
import { cartSlice } from '../pages/cart/features'
import { productSlice } from '../pages/product/features'
import { accountSlice } from '../pages/user/features'

export const rootReducer = combineReducers({
  product: productSlice,
  cart: cartSlice,
  account: accountSlice,
  carousel: carouselSlice,
  auth: authSlice,
  sidebar: sidebarSlice
})

export default rootReducer

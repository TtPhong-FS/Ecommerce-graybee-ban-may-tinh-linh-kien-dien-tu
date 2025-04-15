import { combineReducers } from 'redux'

import { addressSlice } from '../components/address/features'
import { sidebarSlice } from '../components/sidebar/features'

import { authSlice } from '../components/auth/features'
import { carouselSlice } from '../components/carousels/features'
import { cartSlice } from '../components/cart/features'
import { productSlice } from '../pages/product/features'
import { accountSlice } from '../pages/user/features'
import generalSlice from '../services/slice'
export const rootReducer = combineReducers({
  product: productSlice,
  cart: cartSlice,
  account: accountSlice,
  carousel: carouselSlice,
  auth: authSlice,
  sidebar: sidebarSlice,
  address: addressSlice,
  general: generalSlice
})

export default rootReducer

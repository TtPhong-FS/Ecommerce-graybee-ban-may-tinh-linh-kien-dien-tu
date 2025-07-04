import { accountSlice } from '@/features/account'
import { carouselSlice } from '@/features/carousels'
import { cartSlice } from '@/features/cart'
import { collectionSlice } from '@/features/collections/redux'
import { orderSlice } from '@/features/order'
import { productSlice } from '@/features/product'
import { combineReducers } from 'redux'
import { homeSlice } from './redux'

export const rootReducer = combineReducers({
  product: productSlice,
  collection: collectionSlice,
  cart: cartSlice,
  account: accountSlice,
  carousel: carouselSlice,
  home: homeSlice,
  order: orderSlice
})

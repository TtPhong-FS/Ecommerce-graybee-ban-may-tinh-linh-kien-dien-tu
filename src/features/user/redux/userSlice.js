import { createSlice } from '@reduxjs/toolkit'
import {
  addToFavoriteByProductIdAsync,
  cancelOrderByCodeAsync,
  createAddressAsync,
  deleteAddressByIdAndUserUidFromTokenAsync,
  fetchAddressesByTokenAsync,
  fetchAllOrderHistoryAsync,
  fetchFavouritesAsync,
  fetchProfileByTokenAsync,
  updateAddressAsync,
  updateDefaultAddressAsync,
  updateProfileAsync
} from './userThunk'

const initialState = {
  user: null,
  profile: null,
  favourites: [],
  orderHistory: [],
  deliveryAddress: []
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAllToLogout: (state) => {
      ;(state.deliveryAddress = []), (state.favourites = []), (state.user = null)
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllOrderHistoryAsync.fulfilled, (state, action) => {
        state.orderHistory = action.payload.data || []
      })

      .addCase(cancelOrderByCodeAsync.fulfilled, (state, action) => {
        const cancelOrder = action.payload.data
        if (cancelOrder.code) {
          const index = state.orderHistory.findIndex((o) => o.code === cancelOrder.code)

          state.orderHistory[index] = {
            ...state.orderHistory[index],
            orderStatus: cancelOrder.status
          }
        }
      })

      .addCase(fetchProfileByTokenAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.profile = data || null
      })

      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.profile = data || null
      })

      .addCase(addToFavoriteByProductIdAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        const isExisting = state.favourites?.find((item) => item.id === data)
        if (isExisting) {
          state.favourites = state.favourites?.filter((item) => item.id !== data)
        } else {
          state.favourites.push(data)
        }
      })

      .addCase(fetchFavouritesAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.favourites = data || []
      })

      .addCase(fetchAddressesByTokenAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.deliveryAddress = data || []
      })

      .addCase(createAddressAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        if (data?.id && data?.default) {
          state.deliveryAddress = state.deliveryAddress?.map((address) =>
            address.default ? { ...address, default: false } : address
          )
        }
        state.deliveryAddress.push(data)
      })

      .addCase(deleteAddressByIdAndUserUidFromTokenAsync.fulfilled, (state, action) => {
        const id = action.payload?.data
        if (id) {
          state.deliveryAddress = state.deliveryAddress.filter((address) => address.id !== id)
        }
      })

      .addCase(updateDefaultAddressAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        if (data?.id) {
          state.deliveryAddress = state.deliveryAddress.map((address) => {
            if (address.id === data?.id) {
              return { ...address, default: data.default }
            }
            if (address.default) {
              return { ...address, default: false }
            }
            return address
          })
        }
      })

      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        if (data?.id) {
          state.deliveryAddress = state.deliveryAddress.map((address) => {
            if (address.id === data?.id) {
              return data
            }
            if (address.default) {
              return { ...address, default: false }
            }
            return address
          })
        }
      })
  }
})

export const { clearAllToLogout, setProfile } = accountSlice.actions

export default accountSlice.reducer

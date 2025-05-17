import { createSlice } from '@reduxjs/toolkit'
import {
  addToFavouriteAsync,
  createAddressAsync,
  deleteAddressByIdAndUserUidFromTokenAsync,
  findOrdersByStatusOptionalAsync,
  getAddressesByTokenAsync,
  getFavouritesAsync,
  getProfileByTokenAsync,
  updateAddressAsync,
  updateDefaultAddressAsync,
  updateProfileAsync
} from './thunk'

const initialState = {
  user: null,
  favourites: [],
  orders: {},
  deliveryAddress: []
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAllToLogout: (state) => {
      ;(state.deliveryAddress = []), (state.favourites = []), (state.user = null)
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(findOrdersByStatusOptionalAsync.fulfilled, (state, action) => {
        const { status, data } = action.payload
        state.orders[status] = data.data || []
      })

      .addCase(getProfileByTokenAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.user = data || null
      })

      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.user = data || null
      })

      .addCase(addToFavouriteAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        const isExisting = state.favourites?.find((item) => item.id === data)
        if (isExisting) {
          state.favourites = state.favourites?.filter((item) => item.id !== data)
        } else {
          state.favourites.push(data)
        }
      })

      .addCase(getFavouritesAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.favourites = data || []
      })

      .addCase(getAddressesByTokenAsync.fulfilled, (state, action) => {
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

export const { clearAllToLogout } = accountSlice.actions

export default accountSlice.reducer

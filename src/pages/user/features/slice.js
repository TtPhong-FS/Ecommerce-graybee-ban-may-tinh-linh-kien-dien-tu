import { createSlice } from '@reduxjs/toolkit'
import {
  addToFavourite,
  createAddress,
  deleteAddressByIdAndUserUidFromToken,
  findOrdersByStatusOptional,
  getAddressesByToken,
  getFavourites,
  getProfileByToken,
  updateAddress,
  updateDefaultAddress,
  updateProfile
} from './thunk'

const initialState = {
  user: null,
  favourites: [],
  orders: {},
  deliveryAddress: [],
  error: null,
  loading: false,
  status: 'idle'
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAllToLogout: (state) => {
      ;(state.deliveryAddress = []), (state.favourites = []), (state.status = 'idle')
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(findOrdersByStatusOptional.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(findOrdersByStatusOptional.fulfilled, (state, action) => {
        state.error = null
        const { status, data } = action.payload
        state.orders[status] = data.data || []
        state.loading = true
      })
      .addCase(findOrdersByStatusOptional.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })

      .addCase(getProfileByToken.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(getProfileByToken.fulfilled, (state, action) => {
        state.error = null
        const data = action.payload?.data
        state.user = data || null
        state.loading = false
      })
      .addCase(getProfileByToken.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })

      .addCase(updateProfile.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.error = null
        const data = action.payload?.data
        state.user = data || null
        state.loading = false
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })

      .addCase(addToFavourite.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(addToFavourite.fulfilled, (state, action) => {
        state.error = null
        const data = action.payload?.data
        const isExisting = state.favourites?.find((item) => item.id === data)
        if (isExisting) {
          state.favourites = state.favourites?.filter((item) => item.id !== data)
        } else {
          state.favourites.push(data)
        }
        state.loading = false
      })
      .addCase(addToFavourite.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })

      .addCase(getFavourites.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.error = null
        const data = action.payload?.data
        state.favourites = data || []
        state.loading = false
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })

      .addCase(getAddressesByToken.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(getAddressesByToken.fulfilled, (state, action) => {
        state.error = null
        const data = action.payload?.data
        state.deliveryAddress = data || []
        state.loading = false
      })
      .addCase(getAddressesByToken.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })

      .addCase(createAddress.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.error = null
        const data = action.payload?.data
        if (data?.id && data?.default) {
          state.deliveryAddress = state.deliveryAddress?.map((address) =>
            address.default ? { ...address, default: false } : address
          )
        }
        state.loading = false
        state.deliveryAddress.push(data)
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })

      .addCase(deleteAddressByIdAndUserUidFromToken.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(deleteAddressByIdAndUserUidFromToken.fulfilled, (state, action) => {
        state.error = null
        const id = action.payload?.data
        if (id) {
          state.deliveryAddress = state.deliveryAddress.filter((address) => address.id !== id)
        }
        state.loading = false
      })
      .addCase(deleteAddressByIdAndUserUidFromToken.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })

      .addCase(updateDefaultAddress.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(updateDefaultAddress.fulfilled, (state, action) => {
        state.error = null
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
        state.loading = false
      })
      .addCase(updateDefaultAddress.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })

      .addCase(updateAddress.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.error = null
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
        state.loading = false
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
  }
})

export const { clearAllToLogout } = accountSlice.actions

export default accountSlice.reducer

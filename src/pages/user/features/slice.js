import { createSlice } from '@reduxjs/toolkit'
import {
  addToFavourite,
  createAddress,
  deleteAddressByIdAndUserUidFromToken,
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
  deliveryAddress: [],
  error: null,
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
      .addCase(getProfileByToken.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(getProfileByToken.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const data = action.payload?.data
        state.user = data
      })
      .addCase(getProfileByToken.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(updateProfile.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const data = action.payload?.data
        state.user = data
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(addToFavourite.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(addToFavourite.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const data = action.payload?.data
        const isExisting = state.favourites?.find((item) => item.id === data)
        if (isExisting) {
          state.favourites = state.favourites?.filter((item) => item.id !== data)
        } else {
          state.favourites.push(data)
        }
      })
      .addCase(addToFavourite.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(getFavourites.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const data = action.payload?.data
        state.favourites = data || []
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(getAddressesByToken.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(getAddressesByToken.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const data = action.payload?.data
        state.deliveryAddress = data || []
      })
      .addCase(getAddressesByToken.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(createAddress.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const data = action.payload?.data
        if (data?.id && data?.default) {
          state.deliveryAddress = state.deliveryAddress?.map((address) =>
            address.default ? { ...address, default: false } : address
          )
        }
        state.deliveryAddress.push(data)
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(deleteAddressByIdAndUserUidFromToken.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(deleteAddressByIdAndUserUidFromToken.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
        const id = action.payload?.data
        if (id) {
          state.deliveryAddress = state.deliveryAddress.filter((address) => address.id !== id)
        }
      })
      .addCase(deleteAddressByIdAndUserUidFromToken.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(updateDefaultAddress.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(updateDefaultAddress.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
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
      .addCase(updateDefaultAddress.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })

      .addCase(updateAddress.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.error = null
        state.status = 'success'
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
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })
  }
})

export const { clearAllToLogout } = accountSlice.actions

export default accountSlice.reducer

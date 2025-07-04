import { createSlice } from '@reduxjs/toolkit'
import {
  addToFavoriteByProductIdAsync,
  cancelOrderByCodeAsync,
  createAddressAsync,
  deleteAddressByIdAsync,
  fetchAllOrderHistoryAsync,
  fetchFavouritesAsync,
  fetchProfileByTokenAsync,
  getAllAddressAsync,
  getOrderDetailByCode,
  toggleAddressDefaultAsync,
  updateAddressByIdAsync,
  updateProfileAsync
} from './accountThunk'

const initialState = {
  profile: null,
  favourites: [],
  orderHistory: [],
  orderDetail: null,
  address: []
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAccount: (state) => {
      state.address = []
      state.orderHistory = []
      state.favourites = []
      state.profile = null
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
      .addCase(getOrderDetailByCode.fulfilled, (state, action) => {
        state.orderDetail = action.payload.data || null
      })

      .addCase(cancelOrderByCodeAsync.fulfilled, (state, action) => {
        const { code, data } = action.payload
        console.log(data)
        if (code) {
          const index = state.orderHistory.findIndex((o) => o.code === code)

          state.orderHistory[index] = {
            ...state.orderHistory[index],
            status: data.data.status
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
        const { productId, data } = action.payload

        const index = state.favourites.findIndex((item) => item.id === productId)
        if (index !== -1) {
          state.favourites = state.favourites.filter((item) => item.id !== productId)
        } else {
          state.favourites.push(data.data)
        }
      })

      .addCase(fetchFavouritesAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.favourites = data || []
      })

      .addCase(getAllAddressAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        state.address = data || []
      })

      .addCase(createAddressAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        if (data?.id && data?.default) {
          state.address = state.address?.map((address) => (address.default ? { ...address, default: false } : address))
        }
        state.address.push(data)
      })

      .addCase(deleteAddressByIdAsync.fulfilled, (state, action) => {
        const id = action.payload?.data
        if (id) {
          state.address = state.address.filter((address) => address.id !== id)
        }
      })

      .addCase(toggleAddressDefaultAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        if (data?.id) {
          state.address = state.address.map((address) => {
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

      .addCase(updateAddressByIdAsync.fulfilled, (state, action) => {
        const data = action.payload?.data
        if (data?.id) {
          state.address = state.address.map((address) => {
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

export const { clearAccount, setProfile } = accountSlice.actions

export default accountSlice.reducer

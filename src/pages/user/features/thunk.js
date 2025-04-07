import { createAsyncThunk } from '@reduxjs/toolkit'
import { accountApi } from './api'

export const addToFavourite = createAsyncThunk(
  'account/addToFavourite',
  async ({ token, productId }, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.addToFavourite(token, productId)
      return response.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

export const getFavourites = createAsyncThunk('account/getFavourites', async ({ token }, { rejectWithValue }) => {
  try {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await accountApi.getFavourites(token)
    return response.data
  } catch (error) {
    if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
      return rejectWithValue({
        unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
      })
    }
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    }
  }
})

export const getProfileByToken = createAsyncThunk(
  'account/getProfileByToken',
  async ({ token }, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.getProfileByToken(token)
      return response.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

export const updateProfile = createAsyncThunk(
  'account/updateProfile',
  async ({ request, token }, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.updateProfile(request, token)
      return response.data
    } catch (error) {
      if (
        error.code === 'EER_NETWORK' ||
        error.message === 'Network Error' ||
        error.code === 'ERR_CONNECTION_REFUSED'
      ) {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

export const getAddressesByToken = createAsyncThunk(
  'account/getAddressesByToken',
  async ({ token }, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.getAddressesByToken(token)
      return response.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)
export const createAddress = createAsyncThunk(
  'account/createAddress',
  async ({ request, token }, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.createAddress(request, token)
      return response.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)
export const updateDefaultAddress = createAsyncThunk(
  'account/updateDefaultAddress',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.updateDefaultAddress(id, token)
      return response.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)
export const deleteAddressByIdAndUserUidFromToken = createAsyncThunk(
  'account/deleteAddressByIdAndUserUidFromToken',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.deleteAddressByIdAndUserUidFromToken(id, token)
      return response.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

export const updateAddress = createAsyncThunk(
  'account/updateAddress',
  async ({ request, id, token }, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.updateAddress(request, id, token)
      return response.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

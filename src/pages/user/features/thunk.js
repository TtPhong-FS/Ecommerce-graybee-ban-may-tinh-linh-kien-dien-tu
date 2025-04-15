import { createAsyncThunk } from '@reduxjs/toolkit'
import { accountApi } from './api'

export const addToFavourite = createAsyncThunk('account/addToFavourite', async ({ productId }, { rejectWithValue }) => {
  try {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await accountApi.addToFavourite(productId)
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

export const getFavourites = createAsyncThunk('account/getFavourites', async (_, { rejectWithValue }) => {
  try {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await accountApi.getFavourites()
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

export const getProfileByToken = createAsyncThunk('account/getProfileByToken', async (_, { rejectWithValue }) => {
  try {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await accountApi.getProfileByToken()
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

export const updateProfile = createAsyncThunk('account/updateProfile', async ({ request }, { rejectWithValue }) => {
  try {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await accountApi.updateProfile(request)
    return response.data
  } catch (error) {
    if (error.code === 'EER_NETWORK' || error.message === 'Network Error' || error.code === 'ERR_CONNECTION_REFUSED') {
      return rejectWithValue({
        unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
      })
    }
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    }
  }
})

export const getAddressesByToken = createAsyncThunk('account/getAddressesByToken', async (_, { rejectWithValue }) => {
  try {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await accountApi.getAddressesByToken()
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
export const createAddress = createAsyncThunk('account/createAddress', async ({ request }, { rejectWithValue }) => {
  try {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await accountApi.createAddress(request)
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
export const updateDefaultAddress = createAsyncThunk(
  'account/updateDefaultAddress',
  async ({ id }, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.updateDefaultAddress(id)
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
  async ({ id }, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.deleteAddressByIdAndUserUidFromToken(id)
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

export const updateAddress = createAsyncThunk('account/updateAddress', async ({ request, id }, { rejectWithValue }) => {
  try {
    if (!navigator.onLine) {
      return rejectWithValue('No internet connection')
    }
    const response = await accountApi.updateAddress(request, id)
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

export const findOrdersByStatusOptional = createAsyncThunk(
  'account/findOrdersByStatusOptional',
  async (status, { rejectWithValue }) => {
    try {
      if (!navigator.onLine) {
        return rejectWithValue('No internet connection')
      }
      const response = await accountApi.findOrdersByStatusOptional(status)
      return { status: status, data: response.data }
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

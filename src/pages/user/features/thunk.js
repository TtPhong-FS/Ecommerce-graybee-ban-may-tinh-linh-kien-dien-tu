import { handleCreateAsyncThunk } from '@/components/func'
import { accountApi } from './api'

export const addToFavourite = handleCreateAsyncThunk('account/addToFavourite', async (productId) => {
  const response = await accountApi.addToFavourite(productId)
  return response.data
})

export const getFavourites = handleCreateAsyncThunk('account/getFavourites', async () => {
  const response = await accountApi.getFavourites()
  return response.data
})

export const getProfileByToken = handleCreateAsyncThunk('account/getProfileByToken', async () => {
  const response = await accountApi.getProfileByToken()
  return response.data
})

export const updateProfile = handleCreateAsyncThunk('account/updateProfile', async (request) => {
  const response = await accountApi.updateProfile(request)
  return response.data
})

export const getAddressesByToken = handleCreateAsyncThunk('account/getAddressesByToken', async () => {
  const response = await accountApi.getAddressesByToken()
  return response.data
})
export const createAddress = handleCreateAsyncThunk('account/createAddress', async (request) => {
  const response = await accountApi.createAddress(request)
  return response.data
})
export const updateDefaultAddress = handleCreateAsyncThunk('account/updateDefaultAddress', async (id) => {
  const response = await accountApi.updateDefaultAddress(id)
  return response.data
})
export const deleteAddressByIdAndUserUidFromToken = handleCreateAsyncThunk(
  'account/deleteAddressByIdAndUserUidFromToken',
  async (id) => {
    const response = await accountApi.deleteAddressByIdAndUserUidFromToken(id)
    return response.data
  }
)

export const updateAddress = handleCreateAsyncThunk('account/updateAddress', async ({ request, id }) => {
  const response = await accountApi.updateAddress(request, id)
  return response.data
})

export const findOrdersByStatusOptional = handleCreateAsyncThunk(
  'account/findOrdersByStatusOptional',
  async (status) => {
    const response = await accountApi.findOrdersByStatusOptional(status)
    return { status: status, data: response.data }
  }
)

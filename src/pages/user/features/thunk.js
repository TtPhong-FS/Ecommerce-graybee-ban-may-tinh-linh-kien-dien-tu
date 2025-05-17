import { handleCreateAsyncThunk } from '@/components/func'
import { accountApi } from './api'

export const addToFavouriteAsync = handleCreateAsyncThunk('account/addToFavourite', async (productId) => {
  const response = await accountApi.addToFavouriteApi(productId)
  return response.data
})

export const getFavouritesAsync = handleCreateAsyncThunk('account/getFavourites', async () => {
  const response = await accountApi.getFavouritesApi()
  return response.data
})

export const getProfileByTokenAsync = handleCreateAsyncThunk('account/getProfileByToken', async () => {
  const response = await accountApi.getProfileByTokenApi()
  return response.data
})

export const updateProfileAsync = handleCreateAsyncThunk('account/updateProfile', async (request) => {
  const response = await accountApi.updateProfileApi(request)
  return response.data
})

export const getAddressesByTokenAsync = handleCreateAsyncThunk('account/getAddressesByToken', async () => {
  const response = await accountApi.getAddressesByTokenApi()
  return response.data
})
export const createAddressAsync = handleCreateAsyncThunk('account/createAddress', async (request) => {
  const response = await accountApi.createAddressApi(request)
  return response.data
})
export const updateDefaultAddressAsync = handleCreateAsyncThunk('account/updateDefaultAddress', async (id) => {
  const response = await accountApi.updateDefaultAddressApi(id)
  return response.data
})
export const deleteAddressByIdAndUserUidFromTokenAsync = handleCreateAsyncThunk(
  'account/deleteAddressByIdAndUserUidFromToken',
  async (id) => {
    const response = await accountApi.deleteAddressByIdAndUserUidFromTokenApi(id)
    return response.data
  }
)

export const updateAddressAsync = handleCreateAsyncThunk('account/updateAddress', async ({ request, id }) => {
  const response = await accountApi.updateAddressApi(request, id)
  return response.data
})

export const findOrdersByStatusOptionalAsync = handleCreateAsyncThunk(
  'account/findOrdersByStatusOptional',
  async (status) => {
    const response = await accountApi.findOrdersByStatusOptionalApi(status)
    return { status: status, data: response.data }
  }
)

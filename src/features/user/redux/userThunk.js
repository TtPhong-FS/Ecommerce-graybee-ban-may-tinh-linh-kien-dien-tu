import { handleCreateAsyncThunk } from '@/lib'
import { accountApi } from './userApi'

export const createFavouriteAsync = handleCreateAsyncThunk('account/createFavouriteAsync', async (productId) => {
  const response = await accountApi.postFavourite(productId)
  return response.data
})

export const fetchFavouritesAsync = handleCreateAsyncThunk('account/fetchFavouritesAsync', async () => {
  const response = await accountApi.getFavourites()
  return response.data
})

export const fetchProfileByTokenAsync = handleCreateAsyncThunk('account/fetchProfileByTokenAsync', async () => {
  const response = await accountApi.getProfileByToken()
  return response.data
})

export const updateProfileAsync = handleCreateAsyncThunk('account/updateProfileAsync', async (request) => {
  const response = await accountApi.putProfile(request)
  return response.data
})

export const fetchAddressesByTokenAsync = handleCreateAsyncThunk('account/fetchAddressesByTokenAsync', async () => {
  const response = await accountApi.getAddressesByToken()
  return response.data
})
export const createAddressAsync = handleCreateAsyncThunk('account/createAddressAsync', async (request) => {
  const response = await accountApi.postAddress(request)
  return response.data
})
export const updateDefaultAddressAsync = handleCreateAsyncThunk('account/updateDefaultAddressAsync', async (id) => {
  const response = await accountApi.putDefaultAddress(id)
  return response.data
})
export const deleteAddressByIdAndUserUidFromTokenAsync = handleCreateAsyncThunk(
  'account/deleteAddressByIdAndUserUidFromTokenAsync',
  async (id) => {
    const response = await accountApi.deleteAddressByIdAndUserUidFromToken(id)
    return response.data
  }
)

export const updateAddressAsync = handleCreateAsyncThunk('account/updateAddressAsync', async ({ request, id }) => {
  const response = await accountApi.putAddress(request, id)
  return response.data
})

export const fetchOrdersByStatusOptionalAsync = handleCreateAsyncThunk(
  'account/findOrdersByStatusOptional',
  async (status) => {
    const response = await accountApi.getOrdersByStatusOptional(status)
    return { status: status, data: response.data }
  }
)

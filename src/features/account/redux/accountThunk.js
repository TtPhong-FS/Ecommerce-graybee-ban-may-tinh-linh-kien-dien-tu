import { handleCreateAsyncThunk } from '@/lib'
import { accountApi } from './accountApi'

export const addToFavoriteByProductIdAsync = handleCreateAsyncThunk(
  'account/addToFavoriteByProductIdAsync',
  async (productId) => {
    const response = await accountApi.addToFavoriteByProductId(productId)
    return { productId: productId, data: response.data }
  }
)

export const fetchFavouritesAsync = handleCreateAsyncThunk('account/fetchFavouritesAsync', async () => {
  const response = await accountApi.getFavourites()
  return response.data
})

export const fetchProfileByTokenAsync = handleCreateAsyncThunk('account/fetchProfileByTokenAsync', async () => {
  const response = await accountApi.getProfileByToken()
  return response.data
})

export const updateProfileAsync = handleCreateAsyncThunk('account/updateProfileAsync', async (request) => {
  const response = await accountApi.updateProfile(request)
  return response.data
})

export const getAllAddressAsync = handleCreateAsyncThunk('account/getAllAddressAsync', async () => {
  const response = await accountApi.getAllAddress()
  return response.data
})

export const getAddressForUpdateAsync = handleCreateAsyncThunk('account/getAddressForUpdateAsync', async (id) => {
  const response = await accountApi.getAddressForUpdate(id)
  return response.data
})

export const createAddressAsync = handleCreateAsyncThunk('account/createAddressAsync', async (request) => {
  const response = await accountApi.createAddress(request)
  return response.data
})
export const toggleAddressDefaultAsync = handleCreateAsyncThunk('account/toggleAddressDefaultAsync', async (id) => {
  const response = await accountApi.toggleAddressDefault(id)
  return response.data
})

export const deleteAddressByIdAsync = handleCreateAsyncThunk('account/deleteAddressByIdAsync', async (id) => {
  const response = await accountApi.deleteAddressById(id)
  return response.data
})

export const updateAddressByIdAsync = handleCreateAsyncThunk(
  'account/updateAddressByIdAsync',
  async ({ request, id }) => {
    const response = await accountApi.updateAddressById(request, id)
    return response.data
  }
)

export const fetchAllOrderHistoryAsync = handleCreateAsyncThunk('account/fetchAllOrderHistoryAsync', async () => {
  const response = await accountApi.fetchAllOrderHistory()
  return response.data
})

export const cancelOrderByCodeAsync = handleCreateAsyncThunk('account/cancelOrderByCodeAsync', async (code) => {
  const response = await accountApi.cancelOrderByCode(code)
  return { code: code, data: response.data }
})

export const reviewProductAsync = handleCreateAsyncThunk(
  'account/reviewProductAsync',
  async ({ productSlug, request }) => {
    const response = await accountApi.reviewProduct(productSlug, request)
    return response.data
  }
)

export const editReviewProductAsync = handleCreateAsyncThunk(
  'account/editReviewProductAsync',
  async ({ id, request }) => {
    const response = await accountApi.editReviewProduct(id, request)
    return response.data
  }
)

export const deleteReviewProductAsync = handleCreateAsyncThunk('account/deleteReviewProductAsync', async (id) => {
  const response = await accountApi.deleteReviewProduct(id)
  return response.data
})
export const getCommentRatingByIdAsync = handleCreateAsyncThunk('account/getCommentRatingByIdAsync', async (id) => {
  const response = await accountApi.getCommentRatingById(id)
  return response.data
})
export const getOrderDetailByCode = handleCreateAsyncThunk('account/getOrderDetailByCode', async (code) => {
  const response = await accountApi.getOrderDetailByCode(code)
  return response.data
})

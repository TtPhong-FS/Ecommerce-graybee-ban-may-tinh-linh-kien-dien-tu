import { ACCOUNT_URL } from '@/api/constants'
import { privateAPI } from '@/config'

export const accountApi = {
  getFavourites: () => {
    return privateAPI.get(`${ACCOUNT_URL}/favourites`)
  },
  addToFavoriteByProductId: (productId) => {
    return privateAPI.post(`${ACCOUNT_URL}/favourites/${productId}`)
  },
  getProfileByToken: () => privateAPI.get(`${ACCOUNT_URL}/profile`),
  updateProfile: (request) => privateAPI.put(`${ACCOUNT_URL}/profile`, request),
  getAllAddress: () => {
    return privateAPI.get(`${ACCOUNT_URL}/addresses`)
  },
  getAddressForUpdate: (id) => privateAPI.get(`${ACCOUNT_URL}/addresses/for-update/${id}`),
  createAddress: (request) => privateAPI.post(`${ACCOUNT_URL}/addresses`, request),
  deleteAddressById: (addressId) => privateAPI.delete(`${ACCOUNT_URL}/addresses/${addressId}`),
  updateAddressById: (request, addressId) => privateAPI.put(`${ACCOUNT_URL}/addresses/${addressId}`, request),
  toggleAddressDefault: (addressId) => privateAPI.put(`${ACCOUNT_URL}/addresses/default/${addressId}`),
  fetchAllOrderHistory: () => privateAPI.get(`${ACCOUNT_URL}/orders/history`),
  cancelOrderByCode: (code) => privateAPI.put(`${ACCOUNT_URL}/orders/cancel/${code}`),
  getOrderDetailByCode: (code) => privateAPI.get(`${ACCOUNT_URL}/orders/detail/${code}`),
  reviewProduct: (productSlug, request) => privateAPI.post(`${ACCOUNT_URL}/reviews/${productSlug}`, request),
  editReviewProduct: (id, request) => privateAPI.put(`${ACCOUNT_URL}/reviews/${id}`, request),
  deleteReviewProduct: (id) => privateAPI.delete(`${ACCOUNT_URL}/reviews/${id}`),
  getCommentRatingById: (id) => privateAPI.get(`${ACCOUNT_URL}/reviews/for-update/${id}`)
}

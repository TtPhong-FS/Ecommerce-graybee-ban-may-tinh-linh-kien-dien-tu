import { ACCOUNT_URL } from '@/api/constants'
import { api } from '@/config'

export const accountApi = {
  getFavourites: () => {
    return api.get(`${ACCOUNT_URL}/favourites`)
  },
  addToFavoriteByProductId: (productId) => {
    return api.post(`${ACCOUNT_URL}/favourites/${productId}`)
  },
  getProfileByToken: () => api.get(`${ACCOUNT_URL}/profile`),
  updateProfile: (request) => api.put(`${ACCOUNT_URL}/profile`, request),
  getAllAddress: () => {
    return api.get(`${ACCOUNT_URL}/addresses`)
  },
  getAddressForUpdate: (id) => api.get(`${ACCOUNT_URL}/addresses/for-update/${id}`),
  createAddress: (request) => api.post(`${ACCOUNT_URL}/addresses`, request),
  deleteAddressById: (addressId) => api.delete(`${ACCOUNT_URL}/addresses/${addressId}`),
  updateAddressById: (request, addressId) => api.put(`${ACCOUNT_URL}/addresses/${addressId}`, request),
  toggleAddressDefault: (addressId) => api.put(`${ACCOUNT_URL}/addresses/default/${addressId}`),
  fetchAllOrderHistory: () => api.get(`${ACCOUNT_URL}/orders/history`),
  cancelOrderByCode: (code) => api.put(`${ACCOUNT_URL}/orders/cancel/${code}`),
  getOrderDetailByCode: (code) => api.get(`${ACCOUNT_URL}/orders/detail/${code}`),
  reviewProduct: (productSlug, request) => api.post(`${ACCOUNT_URL}/reviews/${productSlug}`, request),
  editReviewProduct: (id, request) => api.put(`${ACCOUNT_URL}/reviews/${id}`, request),
  deleteReviewProduct: (id) => api.delete(`${ACCOUNT_URL}/reviews/${id}`),
  getCommentRatingById: (id) => api.get(`${ACCOUNT_URL}/reviews/for-update/${id}`)
}

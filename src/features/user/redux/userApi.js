import { privateAPI } from '@/config'

const account_endpoint = '/api/v1/account'

export const accountApi = {
  getFavourites: () => {
    return privateAPI.get(`${account_endpoint}/favourites`)
  },
  addToFavoriteByProductId: (productId) => {
    return privateAPI.post(`${account_endpoint}/favourites/${productId}`)
  },
  getProfileByToken: () => privateAPI.get(`${account_endpoint}/profile`),
  updateProfile: (request) => privateAPI.put(`${account_endpoint}/profile/update`, request),
  getAllAddress: () => {
    return privateAPI.get(`${account_endpoint}/addresses`)
  },
  getAddressForUpdate: (id) => privateAPI.get(`${account_endpoint}/addresses/for-update/${id}`),
  createAddress: (request) => privateAPI.post(`${account_endpoint}/addresses`, request),
  deleteAddressById: (addressId) => privateAPI.delete(`${account_endpoint}/addresses/${addressId}`),
  updateAddressById: (request, addressId) => privateAPI.put(`${account_endpoint}/addresses/${addressId}`, request),
  toggleAddressDefault: (addressId) => privateAPI.put(`${account_endpoint}/addresses/default/${addressId}`),
  fetchAllOrderHistory: () => privateAPI.get(`${account_endpoint}/orders/history`),
  cancelOrderByCode: (code) => privateAPI.put(`${account_endpoint}/orders/cancel/${code}`),
  getOrderDetailByCode: (code) => privateAPI.get(`${account_endpoint}/orders/detail/${code}`),
  reviewProduct: (productSlug, request) => privateAPI.post(`${account_endpoint}/reviews/${productSlug}`, request),
  editReviewProduct: (id, request) => privateAPI.put(`${account_endpoint}/reviews/${id}`, request),
  deleteReviewProduct: (id) => privateAPI.delete(`${account_endpoint}/reviews/${id}`),
  getCommentRatingById: (id) => privateAPI.get(`${account_endpoint}/reviews/for-update/${id}`)
}

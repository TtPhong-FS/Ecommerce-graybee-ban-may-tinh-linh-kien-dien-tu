import { privateAPI } from '@/config'

const account_endpoint = '/api/v1/account'

export const accountApi = {
  getFavourites: () => {
    return privateAPI.get(`${account_endpoint}/favourites`)
  },
  addToFavoriteByProductId: (productId) => {
    return privateAPI.post(`${account_endpoint}/${productId}`)
  },
  getProfileByToken: () => privateAPI.get(`${account_endpoint}/profile`),
  updateProfile: (request) => privateAPI.put(`${account_endpoint}/profile/update`, request),
  getAddressesByToken: () => {
    return privateAPI.get(`${account_endpoint}/addresses`)
  },
  createAddress: (request) => privateAPI.post(`${account_endpoint}/address/add`, request),
  deleteAddressByIdAndUserUidFromToken: (id) => privateAPI.delete(`${account_endpoint}/address/delete?id=${id}`),
  updateAddressById: (request, id) => privateAPI.put(`${account_endpoint}/address/update?id=${id}`, request),
  toggleAddressDefault: (id) => privateAPI.put(`${account_endpoint}/address/update-default?id=${id}`),
  getOrdersByStatusOptional: (status) => privateAPI.get(`${account_endpoint}/orders-history/${status}`)
}

import { privateAPI } from '../../../config/axiosServer'

const account_endpoint = '/api/v1/account'

export const accountApi = {
  getFavourites: () => {
    return privateAPI.get(`${account_endpoint}/favourites`)
  },
  addToFavourite: (productId) => {
    return privateAPI.post(`${account_endpoint}/favourite/add?productId=${productId}`)
  },
  getProfileByToken: () => privateAPI.get(`${account_endpoint}/profile`),
  updateProfile: (request) => privateAPI.put(`${account_endpoint}/profile/update`, request, {}),
  getAddressesByToken: () => {
    return privateAPI.get(`${account_endpoint}/addresses`)
  },
  createAddress: (request) => privateAPI.post(`${account_endpoint}/address/add`, request, {}),
  deleteAddressByIdAndUserUidFromToken: (id) => privateAPI.delete(`${account_endpoint}/address/delete?id=${id}`, {}),
  updateAddress: (request, id) => privateAPI.put(`${account_endpoint}/address/update?id=${id}`, request, {}),
  updateDefaultAddress: (id) => privateAPI.put(`${account_endpoint}/address/update-default?id=${id}`, {}, {}),
  findOrdersByStatusOptional: (status) => privateAPI.get(`${account_endpoint}/orders-history/${status}`)
}

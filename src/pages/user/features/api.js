import { privateAPI } from '../../../config/axiosServer'

const account_endpoint = '/api/v1/account'

export const accountApi = {
  getFavouritesApi: () => {
    return privateAPI.get(`${account_endpoint}/favourites`)
  },
  addToFavouriteApi: (productId) => {
    return privateAPI.post(`${account_endpoint}/favourite/add?productId=${productId}`)
  },
  getProfileByTokenApi: () => privateAPI.get(`${account_endpoint}/profile`),
  updateProfileApi: (request) => privateAPI.put(`${account_endpoint}/profile/update`, request, {}),
  getAddressesByTokenApi: () => {
    return privateAPI.get(`${account_endpoint}/addresses`)
  },
  createAddressApi: (request) => privateAPI.post(`${account_endpoint}/address/add`, request, {}),
  deleteAddressByIdAndUserUidFromTokenApi: (id) => privateAPI.delete(`${account_endpoint}/address/delete?id=${id}`, {}),
  updateAddressApi: (request, id) => privateAPI.put(`${account_endpoint}/address/update?id=${id}`, request, {}),
  updateDefaultAddressApi: (id) => privateAPI.put(`${account_endpoint}/address/update-default?id=${id}`, {}, {}),
  findOrdersByStatusOptionalApi: (status) => privateAPI.get(`${account_endpoint}/orders-history/${status}`)
}

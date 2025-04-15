import { API_URL } from '../../../config/axiosServer'

const account_endpoint = '/api/v1/account'

export const accountApi = {
  getFavourites: (token) => {
    return API_URL.get(`${account_endpoint}/favourites`, {
      headers: {
        Authorization: token
      }
    })
  },
  addToFavourite: (token, productId) => {
    return API_URL.post(
      `${account_endpoint}/favourite/add?productId=${productId}`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
  },
  getProfileByToken: (token) =>
    API_URL.get(`${account_endpoint}/profile`, {
      headers: {
        Authorization: token
      }
    }),
  updateProfile: (request, token) =>
    API_URL.put(`${account_endpoint}/profile/update`, request, {
      headers: {
        Authorization: token
      }
    }),
  getAddressesByToken: (token) =>
    API_URL.get(`${account_endpoint}/addresses`, {
      headers: {
        Authorization: token
      }
    }),
  createAddress: (request, token) =>
    API_URL.post(`${account_endpoint}/address/add`, request, {
      headers: {
        Authorization: token
      }
    }),
  deleteAddressByIdAndUserUidFromToken: (id, token) =>
    API_URL.delete(`${account_endpoint}/address/delete?id=${id}`, {
      headers: {
        Authorization: token
      }
    }),
  updateAddress: (request, id, token) =>
    API_URL.put(`${account_endpoint}/address/update?id=${id}`, request, {
      headers: {
        Authorization: token
      }
    }),
  updateDefaultAddress: (id, token) =>
    API_URL.put(
      `${account_endpoint}/address/update-default?id=${id}`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    ),
  findOrdersByStatusOptional: (status, token) =>
    API_URL.get(`${account_endpoint}/order-history?status=${status}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
}

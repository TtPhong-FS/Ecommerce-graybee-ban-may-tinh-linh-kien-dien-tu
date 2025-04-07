import { API_URL } from '../../../config/axiosServer'

const auth_endpoint = '/api/v1/auth'

export const loginApi = (request) => API_URL.post(`${auth_endpoint}/login`, request)
export const signUpApi = (request) => API_URL.post(`${auth_endpoint}/signup`, request)

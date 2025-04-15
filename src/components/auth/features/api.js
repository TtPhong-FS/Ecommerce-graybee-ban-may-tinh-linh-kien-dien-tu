import { publicAPI } from '../../../config/axiosServer'

const auth_endpoint = '/api/v1/auth'

export const loginApi = (request) => publicAPI.post(`${auth_endpoint}/login`, request, {})
export const signUpApi = (request) => publicAPI.post(`${auth_endpoint}/signup`, request, {})

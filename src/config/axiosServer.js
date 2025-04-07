import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

export const API_URL = axios.create(
  {
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  },
  10000
)

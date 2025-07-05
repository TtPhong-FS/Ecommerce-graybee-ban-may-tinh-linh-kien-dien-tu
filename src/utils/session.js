import { HOME_URL } from '@/api/constants'
import { BASE_URL } from '@/config'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

export async function session() {
  const res = await axios.get(`${BASE_URL}${HOME_URL}/session`)
  const sessionId = res.data.data
  localStorage.setItem('sessionId', sessionId)
  return res.data
}

async function initSession() {
  let token = Cookies.get('token')
  if (token) return token

  let sessionId = localStorage.getItem('sessionId')
  if (!sessionId) {
    const { data } = await session()

    console.log('Session created:', data)

    return sessionId
  }
}

export function saveAuthToken(token) {
  if (!token) return

  Cookies.set('token', token, { expires: 1 })
}

export function getToken() {
  const token = Cookies.get('token')
  if (token) {
    return token
  }
  return null
}

export function getSession() {
  return localStorage.getItem('sessionId')
}

export function clearAuthToken() {
  Cookies.remove('token')
  initSession()
}

export function useSession() {
  useEffect(() => {
    initSession()
  }, [])
}

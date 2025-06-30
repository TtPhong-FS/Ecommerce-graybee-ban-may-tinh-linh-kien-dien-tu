import { publicAPI } from '@/config'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

export async function session() {
  const res = await publicAPI.get('/api/v1/public/home/session')
  return res.data
}

async function initSession() {
  const token = Cookies.get('token')
  if (token) return token

  const sessionId = Cookies.get('sessionId')
  if (!sessionId) {
    const { data } = await session()

    console.log('Session created:', data)

    return sessionId
  }
}

export function saveAuthToken(token) {
  if (!token) return

  Cookies.set('token', token, { expires: 3 })
  Cookies.remove('sessionId')
}

export function getToken() {
  const token = Cookies.get('token')
  if (token) {
    return token
  }
  return null
}

export function getSession() {
  return Cookies.get('sessionId') || null
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

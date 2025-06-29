import { privateAPI } from '@/config'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

async function session() {
  const res = await privateAPI.get('/api/v1/public/home/session')
  return res.data
}

async function initSession() {
  const token = Cookies.get('token')
  if (token) return

  let sessionId = Cookies.get('sessionId')
  if (!sessionId) {
    const { data } = await session()

    Cookies.set('sessionId', data, { expires: 7, secure: true, sameSite: 'None' })
    console.log('Session created:', sessionId)
  }

  return sessionId
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
  return getToken() ? null : Cookies.get('sessionId') || null
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

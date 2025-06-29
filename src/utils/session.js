import Cookies from 'js-cookie'
import React from 'react'

function generateRandomSessionId() {
  return 'xxxxx-xxxxx-xxxxx-xxxxx'.replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16))
}

function initSession() {
  const token = Cookies.get('token')
  if (token) return

  let sessionId = Cookies.get('sessionId')
  if (!sessionId) {
    sessionId = generateRandomSessionId()
    document.cookie = `sessionId=${sessionId}; path=/; SameSite=None; Secure`

    Cookies.set('sessionId', sessionId, { expires: 7 })
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
  React.useEffect(() => {
    initSession()
  }, [])
}

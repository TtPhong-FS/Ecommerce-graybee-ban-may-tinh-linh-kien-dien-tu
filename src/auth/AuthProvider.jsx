import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'
import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../pages/auth/features/slice'

import { Loading } from '../components/Loading'
import { Login, SignUp } from '../pages/auth/features'
import { findCartByUserUidOrSessionId } from '../pages/cart/features'
import { clearAll } from '../pages/cart/features/slice'
import { getAddressesByToken, getFavourites, getProfileByToken } from '../pages/user/features'
import { clearAllToLogout } from '../pages/user/features/slice'
import { clearAuthToken, getToken, saveAuthToken } from '../utils'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = getToken()

  useEffect(() => {
    if (token) {
      try {
        const extractToken = jwtDecode(token)
        setUser(extractToken)
        dispatch(login())
      } catch (error) {
        console.error('Invalid token:', error)
        Cookies.remove('token')
      }
    }
    setLoading(false)
  }, [token, dispatch])

  const handleLogin = async (request) => {
    try {
      const response = await dispatch(Login({ request: request })).unwrap()
      const data = response.data
      if (response.status === 200) {
        saveAuthToken(data?.token)

        dispatch(getFavourites({ token: data?.token }))
        dispatch(getAddressesByToken({ token: data?.token }))
        dispatch(getProfileByToken({ token: data?.token }))
        dispatch(findCartByUserUidOrSessionId({ token: data?.token }))

        navigate('/')
      }
      return response.status
    } catch (error) {
      console.error('Login failed:', error)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (request) => {
    try {
      const response = await dispatch(SignUp({ request: request })).unwrap()
      const data = response.data
      console.log('Sign up success: ', response)
      if (response.status === 201) {
        saveAuthToken(data?.token)

        dispatch(getFavourites({ token: data?.token }))
        dispatch(getAddressesByToken({ token: data?.token }))
        dispatch(getProfileByToken({ token: data?.token }))
        dispatch(findCartByUserUidOrSessionId({ token: data?.token }))

        navigate('/')
      }
      return response.status
    } catch (error) {
      console.error('Login failed:', error)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    clearAuthToken()
    dispatch(logout())
    dispatch(clearAll())
    dispatch(clearAllToLogout())
    setUser(null)
    navigate('/')
  }

  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, loading, handleLogout, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

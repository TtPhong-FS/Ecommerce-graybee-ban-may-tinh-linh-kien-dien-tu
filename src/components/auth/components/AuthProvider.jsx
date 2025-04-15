import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'
import React, { createContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout, refreshLogin } from '../features/slice'

import { clearAllToLogout } from '../../../pages/user/features/slice'
import { clearAuthToken, getToken, saveAuthToken } from '../../../utils'
import { clearAll } from '../../cart/features/slice'
import { Loading } from '../../Loading'
import { Login, SignUp } from '../features'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = getToken()

  useEffect(() => {
    if (token) {
      try {
        const extractToken = jwtDecode(token)
        setUser(extractToken)
        dispatch(refreshLogin())
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

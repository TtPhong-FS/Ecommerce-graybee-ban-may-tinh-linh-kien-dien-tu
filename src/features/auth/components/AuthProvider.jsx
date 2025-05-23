import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'
import React, { createContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { clearAll } from '@/features/cart/redux/cartSlice'
import { clearAllToLogout } from '@/features/user/redux/userSlice'
import { clearAuthToken, getToken } from '@/utils'
import { logout, refreshLogin } from '../redux/authSlice'

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
        Cookies.remove('token')
      }
    }
    setLoading(false)
  }, [token])

  const handleLogout = () => {
    clearAuthToken()
    dispatch(logout())
    dispatch(clearAll())
    dispatch(clearAllToLogout())
    setUser(null)
    navigate('/home')
  }

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout, setUser, setLoading }}>{children}</AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

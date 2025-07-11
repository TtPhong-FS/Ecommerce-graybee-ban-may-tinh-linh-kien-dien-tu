import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'
import React, { createContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { clearAccount } from '@/features/account/redux/accountSlice'
import { clearCart } from '@/features/cart/redux/cartSlice'
import { handleAsync } from '@/lib'
import { clearAuthToken, getToken } from '@/utils'
import { logoutAsync } from '../redux'

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
      } catch (error) {
        Cookies.remove('token')
      }
    }
    setLoading(false)
  }, [token])

  const handleLogout = () => {
    handleAsync({
      asyncAction: () => dispatch(logoutAsync()).unwrap(),
      onSuccess: () => {
        clearAuthToken()
        dispatch(clearCart())
        dispatch(clearAccount())
        setUser(null)
        setLoading(false)
        navigate('/')
      }
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout, setUser, setLoading }}>{children}</AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

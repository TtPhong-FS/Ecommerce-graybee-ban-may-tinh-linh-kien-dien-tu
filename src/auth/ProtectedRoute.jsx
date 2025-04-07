import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { AuthContext } from './AuthProvider'

export const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string)
}

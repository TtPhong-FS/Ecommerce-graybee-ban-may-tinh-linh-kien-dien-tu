import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigationTracker } from '../hooks'
import { getAddressesByToken, getFavourites, getProfileByToken } from '../pages/user/features'
import { getToken, useSession } from '../utils'
import { preLoadCarousel } from './carousels/features/slice'
import { findCartByUserUidOrSessionId } from './cart/features'
import { getSidebar } from './sidebar/features/slice'

export const AppInitializer = () => {
  useSession()
  useNavigationTracker()
  const dispatch = useDispatch()
  const token = getToken()
  const user = useSelector((state) => state.account.user)
  const isPrivate = React.useRef(false)
  const isPublic = React.useRef(false)

  React.useEffect(() => {
    if (!isPrivate.current) {
      if (token && (!user || user == null)) {
        dispatch(getProfileByToken())
      }
      if (token) {
        dispatch(findCartByUserUidOrSessionId())
        dispatch(getAddressesByToken())
        dispatch(getFavourites())
      }
    }
    isPrivate.current = true
  }, [token, user])

  React.useEffect(() => {
    if (!isPublic.current) {
      dispatch(getSidebar())
      dispatch(preLoadCarousel())
      dispatch(findCartByUserUidOrSessionId())
    }
    isPublic.current = true
  }, [])

  return null
}

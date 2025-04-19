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
  const initialized = React.useRef(false)

  React.useEffect(() => {
    if (!initialized.current) {
      const fetchPrivate = async () => {
        if (token && (!user || user == null)) await dispatch(getProfileByToken())
        if (token) {
          await dispatch(getAddressesByToken())
          await dispatch(getFavourites())
        }
      }
      const fetchPublic = async () => {
        await dispatch(getSidebar())
        await dispatch(preLoadCarousel())
        await dispatch(findCartByUserUidOrSessionId())
      }

      fetchPrivate()
      fetchPublic()
    }
    initialized.current = true
  }, [dispatch])

  return null
}

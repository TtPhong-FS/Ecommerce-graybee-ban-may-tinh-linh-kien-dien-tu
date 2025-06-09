import { getCartByUserUidOrSessionIdAsync } from '@/features/cart/redux'
import { fetchAddressesByTokenAsync, fetchFavouritesAsync, fetchProfileByTokenAsync } from '@/features/user'
import { useAppContext } from '@/hooks'
import { fetchSidebar } from '@/store/redux/homeSlice'
import { getToken, useSession } from '@/utils'
import React from 'react'
import { useSelector } from 'react-redux'

export const AppInitializer = () => {
  useSession()
  const { dispatch } = useAppContext()
  const token = getToken()
  const user = useSelector((state) => state.account.user)
  const isPrivate = React.useRef(false)
  const isPublic = React.useRef(false)

  React.useEffect(() => {
    if (!isPrivate.current) {
      if (token && (!user || user == null)) {
        dispatch(fetchProfileByTokenAsync())
      }
      if (token) {
        dispatch(getCartByUserUidOrSessionIdAsync())
        dispatch(fetchAddressesByTokenAsync())
        dispatch(fetchFavouritesAsync())
      }
    }
    isPrivate.current = true
  }, [token, user])

  React.useEffect(() => {
    if (!isPublic.current) {
      dispatch(fetchSidebar())
      dispatch(getCartByUserUidOrSessionIdAsync())
    }
    isPublic.current = true
  }, [])

  const currentLang = localStorage.getItem('language')

  React.useEffect(() => {
    if (currentLang === null) {
      localStorage.setItem('language', 'vi')
    }
  }, [currentLang])

  return null
}

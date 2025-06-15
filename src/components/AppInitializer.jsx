import { getCartByUserUidOrSessionIdAsync } from '@/features/cart/redux'
import { getAllProductAsync } from '@/features/product'
import { fetchAddressesByTokenAsync, fetchFavouritesAsync, fetchProfileByTokenAsync } from '@/features/user'
import { useAppContext } from '@/hooks'
import { fetchSidebar } from '@/store/redux/homeSlice'
import { getToken, useSession } from '@/utils'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

export const AppInitializer = () => {
  useSession()
  const { dispatch } = useAppContext()
  const token = getToken()
  const user = useSelector((state) => state.account.user)
  let isPrivate = useRef(false)
  let isPublic = useRef(false)

  useEffect(() => {
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
  }, [token, user, dispatch])

  useEffect(() => {
    if (!isPublic.current) {
      dispatch(getAllProductAsync())
      dispatch(fetchSidebar())
      dispatch(getCartByUserUidOrSessionIdAsync())
    }
    isPublic.current = true
  }, [])

  const currentLang = localStorage.getItem('language')

  useEffect(() => {
    if (currentLang === null) {
      localStorage.setItem('language', 'vi')
    }
  }, [currentLang])

  return null
}

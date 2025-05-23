import { fetchCarouselAsync } from '@/features/carousels/redux/carouselSlice'
import { categoryMap } from '@/features/carousels/utils'
import { fetchCartByUserUidOrSessionIdAsync } from '@/features/cart/redux'
import { fetchAddressesByTokenAsync, fetchFavouritesAsync, fetchProfileByTokenAsync } from '@/features/user'
import { useAppContext } from '@/hooks'
import { getToken, useSession } from '@/utils'
import React from 'react'
import { useSelector } from 'react-redux'
import { fetchSidebar } from './sidebar/redux/slice'

export const AppInitializer = () => {
  useSession()
  const { dispatch } = useAppContext()
  const token = getToken()
  const user = useSelector((state) => state.account.user)
  const isPrivate = React.useRef(false)
  const isPublic = React.useRef(false)

  const handlePrefetchCarousel = () => {
    for (const categoryName of categoryMap) {
      dispatch(fetchCarouselAsync({ category: categoryName }))
    }
  }

  React.useEffect(() => {
    if (!isPrivate.current) {
      if (token && (!user || user == null)) {
        dispatch(fetchProfileByTokenAsync())
      }
      if (token) {
        dispatch(fetchCartByUserUidOrSessionIdAsync())
        dispatch(fetchAddressesByTokenAsync())
        dispatch(fetchFavouritesAsync())
      }
    }
    isPrivate.current = true
  }, [token, user])

  React.useEffect(() => {
    if (!isPublic.current) {
      dispatch(fetchSidebar())
      handlePrefetchCarousel()
      dispatch(fetchCartByUserUidOrSessionIdAsync())
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

import {
  fetchAllOrderHistoryAsync,
  fetchFavouritesAsync,
  fetchProfileByTokenAsync,
  getAllAddressAsync
} from '@/features/account'
import {
  selectAddresses,
  selectFavorites,
  selectOrderHistory,
  selectProfile
} from '@/features/account/redux/accountSelector'
import { getCartByUserUidOrSessionIdAsync } from '@/features/cart'
import { fetchSidebar } from '@/store/redux/homeSlice'
import { getToken } from '@/utils'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const AppInitializer = () => {
  const token = getToken()

  const dispatch = useDispatch()

  const sidebar = useSelector((state) => state.home.sidebar)
  const profile = useSelector(selectProfile)
  const favorites = useSelector(selectFavorites)
  const address = useSelector(selectAddresses)
  const orderHistory = useSelector(selectOrderHistory)

  const profileFetched = useRef(false)
  const favoritesFetched = useRef(false)
  const addressFetched = useRef(false)
  const ordersFetched = useRef(false)
  let cartFetched = useRef(false)
  const sidebarFetchedCount = useRef(0)

  useEffect(() => {
    if (token && !profile && !profileFetched.current) {
      dispatch(fetchProfileByTokenAsync())
      profileFetched.current = true
    }
  }, [token, profile, dispatch])

  useEffect(() => {
    if (token && (!favorites || favorites.length === 0) && !favoritesFetched.current) {
      dispatch(fetchFavouritesAsync())
      favoritesFetched.current = true
    }
  }, [token, favorites, dispatch])

  useEffect(() => {
    if (token && (!address || address.length === 0) && !addressFetched.current) {
      dispatch(getAllAddressAsync())
      addressFetched.current = true
    }
  }, [token, address, dispatch])

  useEffect(() => {
    if (token && (!orderHistory || orderHistory.length === 0) && !ordersFetched.current) {
      dispatch(fetchAllOrderHistoryAsync())
      ordersFetched.current = true
    }
  }, [token, orderHistory, dispatch])

  useEffect(() => {
    const hasSessionId = !!localStorage.getItem('sessionId')

    if (token) {
      dispatch(getCartByUserUidOrSessionIdAsync())
      cartFetched.current = true
    }

    if (!token && hasSessionId) {
      dispatch(getCartByUserUidOrSessionIdAsync())
      cartFetched.current = true
    }
  }, [token, dispatch])

  useEffect(() => {
    if ((!sidebar || sidebar.length === 0) && sidebarFetchedCount.current < 3) {
      dispatch(fetchSidebar())
      sidebarFetchedCount.current += 1
    }
  }, [sidebar, dispatch])
}

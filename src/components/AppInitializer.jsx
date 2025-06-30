import { getCartByUserUidOrSessionIdAsync } from '@/features/cart'
import {
  fetchAllOrderHistoryAsync,
  fetchFavouritesAsync,
  fetchProfileByTokenAsync,
  getAllAddressAsync
} from '@/features/user'
import { fetchSidebar } from '@/store/redux/homeSlice'
import { getToken } from '@/utils'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const AppInitializer = () => {
  const token = getToken()

  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        dispatch(fetchProfileByTokenAsync())
        dispatch(getAllAddressAsync())
        dispatch(fetchAllOrderHistoryAsync())
        dispatch(fetchFavouritesAsync())
        dispatch(getCartByUserUidOrSessionIdAsync())
      }
      fetchData()
    }
  }, [dispatch, token])

  useEffect(() => {
    dispatch(getCartByUserUidOrSessionIdAsync())
    dispatch(fetchSidebar())
  }, [dispatch])
}

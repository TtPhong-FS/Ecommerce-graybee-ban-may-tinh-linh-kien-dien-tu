import { getCartByUserUidOrSessionIdAsync } from '@/features/cart'
import { getAllProductAsync } from '@/features/product'
import {
  fetchAddressesByTokenAsync,
  fetchAllOrderHistoryAsync,
  fetchFavouritesAsync,
  fetchProfileByTokenAsync
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
        dispatch(fetchAddressesByTokenAsync())
        dispatch(fetchAllOrderHistoryAsync())
        dispatch(fetchFavouritesAsync())
        dispatch(getCartByUserUidOrSessionIdAsync())
      }
      fetchData()
    }
  }, [dispatch, token])

  useEffect(() => {
    dispatch(fetchSidebar())
    dispatch(getAllProductAsync())
  }, [dispatch])
}

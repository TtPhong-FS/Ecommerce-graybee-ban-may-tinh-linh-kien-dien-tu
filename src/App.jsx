import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { findCartByUserUidOrSessionId } from './components/cart/features/thunk'
import RootRoutes from './routes/RootRoutes'

import { preLoadCarousel } from './components/carousels/features/slice'
import { getSidebar } from './components/sidebar/features/slice'
import { useNavigationTracker } from './hooks/useNavigationTracker'
import { getAddressesByToken, getFavourites, getProfileByToken } from './pages/user/features'
import { getToken, useSession } from './utils'

function App() {
  useSession()
  useNavigationTracker()
  const dispatch = useDispatch()
  const token = getToken()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(preLoadCarousel())
      await dispatch(getSidebar())
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        await Promise.all([
          dispatch(getProfileByToken({ token: token })),
          dispatch(getFavourites({ token: token })),
          dispatch(getAddressesByToken({ token: token }))
        ])
      }
    }

    fetchUserData()
  }, [token, dispatch])

  useEffect(() => {
    const fetchCart = async () => {
      if (token) {
        await dispatch(findCartByUserUidOrSessionId({ token: token }))
      }
    }

    fetchCart()
  }, [token, dispatch])

  return (
    <div className="select-none h-dvh ">
      <RootRoutes />
    </div>
  )
}

export default App

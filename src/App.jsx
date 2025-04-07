import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { findCartByUserUidOrSessionId } from './pages/cart/features/thunk'
import RootRoutes from './routes/RootRoutes'

import { getSidebar } from './components/sidebar/features/slice'
import {
  getProductCategoryByCpu,
  getProductCategoryByKeyboard,
  getProductCategoryByLaptop,
  getProductCategoryByMonitor,
  getProductCategoryByMouse,
  getProductCategoryByPc
} from './pages/carousels/features'
import { getAddressesByToken, getFavourites, getProfileByToken } from './pages/user/features'
import { getToken, useSession } from './utils'

function App() {
  useSession()
  const dispatch = useDispatch()

  const token = getToken()
  console.log(token)

  useEffect(() => {
    dispatch(getSidebar())
    dispatch(getProductCategoryByLaptop())
    dispatch(getProductCategoryByPc())
    dispatch(getProductCategoryByMouse())
    dispatch(getProductCategoryByMonitor())
    dispatch(getProductCategoryByCpu())
    dispatch(getProductCategoryByKeyboard())
  }, [dispatch])

  useEffect(() => {
    if (token) {
      dispatch(getProfileByToken({ token: token }))
    }
  }, [token, dispatch])

  useEffect(() => {
    if (token) {
      dispatch(getFavourites({ token: token }))
    }
  }, [token, dispatch])

  useEffect(() => {
    if (token) {
      dispatch(getAddressesByToken({ token: token }))
    }
  }, [token, dispatch])

  useEffect(() => {
    dispatch(findCartByUserUidOrSessionId({ token: token }))
  }, [token, dispatch])

  return (
    <div className="select-none h-dvh">
      <RootRoutes />
    </div>
  )
}

export default App

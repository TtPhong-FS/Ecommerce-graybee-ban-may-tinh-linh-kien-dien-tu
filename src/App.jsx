// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { findCartByUserUidOrSessionId } from './components/cart/features/thunk'
// import RootRoutes from './routes/RootRoutes'

// import { preLoadCarousel } from './components/carousels/features/slice'
// import { getSidebar } from './components/sidebar/features/slice'
// import { useNavigationTracker } from './hooks/useNavigationTracker'
// import { getAddressesByToken, getFavourites, getProfileByToken } from './pages/user/features'
// import { getToken, useSession } from './utils'

// function App() {
//   useSession()
//   useNavigationTracker()
//   const dispatch = useDispatch()
//   const token = getToken()

//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(preLoadCarousel())
//       await dispatch(getSidebar())
//     }
//     fetchData()
//   }, [dispatch])

//   useEffect(() => {
//     if (token) {
//       dispatch(getProfileByToken())
//       dispatch(getFavourites())
//       dispatch(getAddressesByToken())
//     }
//   }, [token, dispatch])

//   useEffect(() => {
//     const fetchCart = async () => {
//       await dispatch(findCartByUserUidOrSessionId())
//     }
//     fetchCart()
//   }, [dispatch])

//   return (
//     <div className="select-none h-dvh ">
//       <RootRoutes />
//     </div>
//   )
// }

// export default App

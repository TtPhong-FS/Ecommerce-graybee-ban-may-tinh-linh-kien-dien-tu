import { Route, Routes } from 'react-router-dom'

import React, { lazy, Suspense } from 'react'
import { Loading } from '../components/Loading'

import { AuthProvider } from '../auth/AuthProvider'
import { ProtectedRoute } from '../auth/ProtectedRoute'
import { HomeLayout, ProfileLayout, RootLayout } from '../layout'
import ProductPage from '../pages/product/pages/ProductPage'

const ProductDetail = lazy(() =>
  import('../pages/product/pages/ProductDetail').then((module) => ({ default: module.ProductDetail }))
)

const Contact = React.lazy(() => import('../pages/Contact'))
const AuthPage = React.lazy(() => import('../pages/auth/pages').then((module) => ({ default: module.AuthPage })))

const OrderPage = React.lazy(() => import('../pages/orders/pages').then((module) => ({ default: module.OrderPage })))

const FavouritePage = React.lazy(() =>
  import('../pages/user/pages').then((module) => ({ default: module.FavouritePage }))
)
const ManageAddressPage = React.lazy(() =>
  import('../pages/user/pages').then((module) => ({ default: module.ManageAddressPage }))
)
const OrderHistoryPage = React.lazy(() =>
  import('../pages/user/pages/OrderHistoryPage').then((module) => ({ default: module.OrderHistoryPage }))
)

const ProfilePage = React.lazy(() => import('../pages/user/pages').then((module) => ({ default: module.ProfilePage })))

const RootRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomeLayout />} />
          <Route path="login" element={<HomeLayout />} />
          <Route path="signup" element={<HomeLayout />} />
          <Route path="contact" element={<Contact />} />

          <Route path="products/:slugId" element={<ProductDetail />} />
          <Route path="pages/:category" element={<ProductPage />} />
          <Route path="pages/:category/:manufacturer" element={<ProductPage />} />

          <Route path="order" element={<OrderPage />} />
          <Route path="*" element={<div>Not found</div>} />

          <Route
            path="account/*"
            element={
              <AuthProvider>
                <ProtectedRoute requiredRoles={['ADMIN', 'CUSTOMER', 'MANAGE']}>
                  <ProfileLayout />
                </ProtectedRoute>
              </AuthProvider>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="manage-address" element={<ManageAddressPage />} />
            <Route path="order-history" element={<OrderHistoryPage />} />
            <Route path="favourites" element={<FavouritePage />} />
          </Route>
        </Route>
      </Routes>
      <AuthProvider>
        <AuthPage />
      </AuthProvider>
    </Suspense>
  )
}

export default RootRoutes

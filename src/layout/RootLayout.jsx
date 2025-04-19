import { Outlet, useLocation } from 'react-router-dom'

import { Suspense } from 'react'
import { AppInitializer } from '../components/AppInitializer'
import { AuthProvider } from '../components/auth/components/AuthProvider'
import { AuthPage } from '../components/auth/pages/AuthPage'
import { BreadCrumbs } from '../components/BreadCrumbs'
import Footer from '../components/Footer'
import { Loading } from '../components/Loading'
import Navbar from '../components/Navbar'

const RootLayout = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isSignup = location.pathname === '/signup'

  return (
    <div className="">
      <AppInitializer />
      <AuthProvider>
        <Navbar />
      </AuthProvider>
      <main className="">
        <div className="bg-[#f3f4f6]">
          <div className="container mx-auto pb-12 px-[1.25rem] gap-6 relative ">
            <BreadCrumbs />
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </main>
      <div className="bg-[#090d14]">
        <Footer />
      </div>
      {(isLogin || isSignup) && (
        <AuthProvider>
          <AuthPage />
        </AuthProvider>
      )}
    </div>
  )
}

export default RootLayout

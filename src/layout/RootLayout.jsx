import { Outlet } from 'react-router-dom'

import { Suspense } from 'react'
import { AppInitializer } from '../components/AppInitializer'
import { AuthPage } from '../components/auth/pages/AuthPage'
import { BreadCrumbs } from '../components/BreadCrumbs'
import Footer from '../components/Footer'
import { Loading } from '../components/Loading'
import Navbar from '../components/Navbar'

const RootLayout = () => {
  console.log('render')

  return (
    <div className="">
      <AppInitializer />
      <Navbar />

      <main className="">
        <div className="bg-[#f3f4f6]">
          <div className="container mx-auto pb-12 px-[1.25rem] gap-6 relative ">
            <BreadCrumbs />

            <Suspense fallback={<Loading />}>
              <Outlet />
              <AuthPage />
            </Suspense>
          </div>
        </div>
      </main>
      <div className="bg-[#090d14]">
        <Footer />
      </div>
    </div>
  )
}

export default RootLayout

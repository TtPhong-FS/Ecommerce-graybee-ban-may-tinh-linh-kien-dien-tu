import { Outlet } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider.tsx'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
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
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AppInitializer />
        <Navbar />
        <main className="py-6">
          <div className="min-h-screen">
            <div className="w-full max-w-[88rem] mx-auto pb-12 px-[1.25rem] gap-6 relative ">
              <BreadCrumbs />
              <Suspense fallback={<Loading />}>
                <Outlet />
                <AuthPage />
              </Suspense>
            </div>
          </div>
          <Toaster position="top-right" />
        </main>
        <div className="bg-primary-foreground">
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default RootLayout

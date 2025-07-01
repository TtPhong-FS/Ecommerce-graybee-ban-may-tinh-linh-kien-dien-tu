import { Outlet, useLocation } from 'react-router-dom'

import { AppInitializer, BreadCrumbs, Footer, Loading, Navbar, ScrollToTop, Sidebar } from '@/components'
import { ThemeProvider } from '@/components/theme-provider'

import { RightBanner } from '@/components/Banner'
import { useSession } from '@/utils'
import { useMediaQuery } from '@mui/material'
import { Suspense, useState } from 'react'
import { Toaster } from 'sonner'
export const RootLayout = () => {
  useSession()

  const isMobile = useMediaQuery('(max-width: 640px)')
  const [openSidebar, setOpenSidebar] = useState(false)

  const location = useLocation()

  const isSidebarVisible = location.pathname === '/' || openSidebar

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ScrollToTop />
        <AppInitializer />
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <div className={`${location.pathname === '/' && isMobile ? 'block' : 'hidden'} w-full max-w-[74rem] mx-auto`}>
          <RightBanner />
        </div>

        <div
          className={`${isSidebarVisible ? 'block' : 'hidden'} ${
            openSidebar ? 'sticky top-20' : 'relative'
          } w-full max-w-[74rem] mx-auto z-40 `}
        >
          <div className={`${openSidebar && 'relative top-5'} z-40 mt-4 mb-6`}>
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          </div>
        </div>
        <main className="mb-6 md:mt-0">
          <div className="w-full max-w-[74rem] mx-auto pb-12 gap-6 relative ">
            <div className="min-h-screen">
              <BreadCrumbs />

              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
          <Toaster closeButton position="bottom-left" />
        </main>
        <div className="bg-primary-foreground">
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}

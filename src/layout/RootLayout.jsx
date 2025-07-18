import { Outlet, useLocation } from 'react-router-dom'

import { AppInitializer, BreadCrumbs, Footer, Loading, Navbar, ScrollToTop, Sidebar } from '@/components'
import { RightBanner, SubBanner } from '@/components/Banner'
import { ThemeProvider } from '@/components/theme-provider'
import { useSession } from '@/utils'
import { Analytics } from '@vercel/analytics/react'
import { Suspense, useState } from 'react'
import { Toaster } from 'sonner'
export const RootLayout = () => {
  useSession()

  const [openSidebar, setOpenSidebar] = useState(false)

  const location = useLocation()

  const isSidebarVisible = location.pathname === '/' || openSidebar

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ScrollToTop />
        <AppInitializer />
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div
          className={`${isSidebarVisible ? 'block' : 'hidden'} ${
            openSidebar ? 'sticky top-20' : 'relative '
          } w-full max-w-[74rem] mx-auto z-40`}
        >
          <div className={`${openSidebar && 'relative '} flex z-40 max-h-[448px] mt-0 lg:mt-4`}>
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <RightBanner />
          </div>
          <SubBanner />
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
          <Footer />
        <Analytics />
      </ThemeProvider>
    </>
  )
}

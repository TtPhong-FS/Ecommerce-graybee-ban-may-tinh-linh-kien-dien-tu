import { Outlet, useLocation } from 'react-router-dom'

import { AppInitializer, BreadCrumbs, Footer, Loading, Navbar, ScrollToTop, Sidebar } from '@/components'
import { ThemeProvider } from '@/components/theme-provider'

import { useSession } from '@/utils'
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
            openSidebar ? 'sticky top-25 ' : 'relative'
          } max-sm:mt-0 mt-4 w-full max-w-[74rem] mx-auto z-40`}
        >
          <div className={`${openSidebar ? 'absolute' : 'ml-4 relative'} z-40 `}>
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          </div>
        </div>
        <main className="py-6">
          <div className="w-full max-w-[74rem] mx-auto pb-12 gap-6 relative ">
            <div className="min-h-screen">
              <div className="max-md:px-4 mb-4">
                <BreadCrumbs />
              </div>
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
          <Toaster closeButton position="top-left" />
        </main>
        <div className="bg-primary-foreground">
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}

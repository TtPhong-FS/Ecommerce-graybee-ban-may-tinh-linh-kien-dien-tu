import { Outlet, useLocation } from 'react-router-dom'

import { AppInitializer, BreadCrumbs, Footer, Loading, Navbar, Sidebar, ThemeProvider } from '@/components'
import { Suspense, useState } from 'react'
import { Toaster } from 'sonner'
export const RootLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)

  const location = useLocation()

  const isSidebarVisible = location.pathname === '/' || openSidebar

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AppInitializer />
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <main className="py-6">
          <div className="min-h-screen">
            <div className="w-full max-w-[88rem] mx-auto pb-12 px-[1.25rem] gap-6 relative ">
              <div className="mb-4">
                <BreadCrumbs />
              </div>
              <div
                className={`${isSidebarVisible ? 'block' : 'hidden'} ${
                  openSidebar ? 'sticky top-25 ' : 'relative'
                } w-full z-40`}
              >
                <div className={`${openSidebar ? 'absolute' : 'relative'} w-full z-40`}>
                  <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                </div>
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

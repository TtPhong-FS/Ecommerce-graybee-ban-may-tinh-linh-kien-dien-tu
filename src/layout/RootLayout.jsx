import { Outlet } from 'react-router-dom'

import { AppInitializer, BreadCrumbs, Footer, Loading, Navbar, ThemeProvider } from '@/components'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
export const RootLayout = () => {
  return (
    <div className="">
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AppInitializer />
        <Navbar />
        <main className="py-6">
          <div className="min-h-screen">
            <div className="w-full max-w-[88rem] mx-auto pb-12 px-[1.25rem] gap-6 relative ">
              <div className="mb-4">
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
    </div>
  )
}

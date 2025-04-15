import { Outlet } from 'react-router-dom'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../components/auth/components/AuthProvider'

const RootLayout = () => {
  return (
    <div className="">
      <AuthProvider>
        <Navbar />
      </AuthProvider>
      <main className="flex justify-center mt-8 mb-8">
        <div className="p-6 max-w-[76.25rem] w-full flex flex-col gap-6 relative">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout

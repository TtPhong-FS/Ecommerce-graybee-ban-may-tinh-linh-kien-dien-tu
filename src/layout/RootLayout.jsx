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
      <main className="">
        <div className="bg-[#f3f4f6]">
          <div className="container mx-auto pb-12 px-[1.25rem] gap-6 relative ">
            <Outlet />
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

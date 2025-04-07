import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthProvider'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const RootLayout = () => {
  return (
    <div className="">
      <AuthProvider>
        <Navbar />
      </AuthProvider>
      <main className="flex justify-center mt-8 mb-8">
        <div className="p-6 max-w-[76.25rem] w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout

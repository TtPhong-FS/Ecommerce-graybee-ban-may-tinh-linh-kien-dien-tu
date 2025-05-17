import { Avatar, Grid2 } from '@mui/material'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { AuthContext } from '../components/auth/components/AuthProvider'
import { profileNavigation } from '../ui/profileNavigation'
export const ProfileLayout = () => {
  const location = useLocation()
  const user = useSelector((state) => state.account.user)

  const { handleLogout } = useContext(AuthContext)

  return (
    <Grid2 container size={12} spacing={2}>
      <Grid2
        display={{ mobile: 'none', tablet: 'none', laptop: 'flex' }}
        container
        size={3.5}
        alignSelf={'flex-start'}
        sx={{ position: 'sticky', top: 80 }}
      >
        <Grid2 height={200} size={12} sx={{ bgcolor: 'white', padding: '0.5rem', borderRadius: '0.8rem' }}>
          <div className="flex gap-2 items-center ">
            <Link href="/account" className="cursor-pointer ">
              <Avatar
                className="select-none"
                src="https://img.icons8.com/?size=100&id=NPW07SMh7Aco&format=png&color=000000"
                sx={{ width: 50, height: 50 }}
              />
            </Link>
            <div className="w-full text-sm">
              <p className="select-text">{user?.fullName}</p>
              <div className="flex justify-between ">
                <span className="select-text">{user?.phoneNumber}</span>
                <Link
                  to="/account/profile"
                  className="text-blue-500 text-sm hover:underline
                decoration-solid"
                >
                  Xem hồ sơ
                </Link>
              </div>
            </div>
          </div>
        </Grid2>
        <Grid2 height={'max-content'} size={12} sx={{ bgcolor: 'white', padding: '0.3rem 0', borderRadius: '0.8rem' }}>
          <nav>
            <ul className="flex flex-col py-2">
              {profileNavigation.map((item, index) => (
                <Link
                  onClick={item.key === 'logout' ? () => handleLogout() : undefined}
                  key={index}
                  to={item.path}
                  className={`flex text-sm items-center gap-2 transition-all hover:pl-4 w-full border-l-2 text-gray-800 p-2 ${
                    location.pathname === item.path
                      ? 'border-red-500 text-red-600 bg-gradient-to-r from-[#fff1f2] to-red-0'
                      : 'border-transparent hover:border-red-500'
                  } hover:bg-gradient-to-r from-[#fff1f2] to-red-0  hover:text-red-600 `}
                >
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </ul>
          </nav>
        </Grid2>
      </Grid2>
      <Grid2 size={{ tablet: 12, laptop: 8.5 }}>
        <Outlet />
      </Grid2>
    </Grid2>
  )
}

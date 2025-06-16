import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AuthContext } from '@/features/auth'
import { useCustomTranslate } from '@/i18n'
import { Grid2 } from '@mui/material'
import { Heart, LogOut, MapPinHouse, Scroll } from 'lucide-react'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'

const profileNavigation = [
  {
    key: 'favourites',
    title: 'favourites',
    icon: Heart,
    path: '/account/favourites'
  },
  {
    key: 'order-history',
    title: 'orderHistory',
    icon: Scroll,
    path: '/account/order-history'
  },
  {
    key: 'manage-address',
    title: 'manageAddress',
    icon: MapPinHouse,
    path: '/account/manage/address'
  },
  {
    key: 'logout',
    title: 'logout',
    path: '/logout',
    icon: LogOut
  }
]

export const ProfileLayout = () => {
  const { t } = useCustomTranslate()
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
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
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
                  {t('customer:nav.viewProfile')}
                </Link>
              </div>
            </div>
          </div>
        </Grid2>
        <Grid2 height={'max-content'} size={12} sx={{ bgcolor: 'white', padding: '0.3rem 0', borderRadius: '0.8rem' }}>
          <nav>
            <ul className="flex flex-col py-2">
              {profileNavigation.map((item, index) => {
                const title = t(`customer:nav.${item.title}`)

                return (
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
                    <span>{title}</span>
                  </Link>
                )
              })}
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

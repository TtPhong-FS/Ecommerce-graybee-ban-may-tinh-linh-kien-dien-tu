import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { PROFILE_NAVIGATION } from '@/constants'
import { useCustomTranslate } from '@/i18n'
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'

export const ProfileLayout = () => {
  const { t } = useCustomTranslate()
  const location = useLocation()
  const profile = useSelector((state) => state.account.profile)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
      <div className="lg:sticky lg:top-25 lg:z-40 lg:col-span-3 bg-white h-max">
        <div>
          <div className="p-4">
            <div className="flex gap-2 items-center ">
              <Link href="/account" className="cursor-pointer ">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </Link>
              <div className="w-full text-sm">
                <p className="select-text">{profile?.fullName}</p>
                <div className="flex justify-between ">
                  <span className="select-text">{profile?.phone}</span>
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
          </div>
          <nav>
            <ul className="flex flex-col py-2">
              {PROFILE_NAVIGATION.map((item) => {
                const title = t(`customer:nav.${item.title}`)

                return (
                  <Link
                    key={item.key}
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
        </div>
      </div>
      <div className="lg:col-span-9">
        <Outlet />
      </div>
    </div>
  )
}

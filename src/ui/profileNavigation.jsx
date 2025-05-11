import { Heart, LogOut, MapPinHouse, Scroll } from 'lucide-react'

export const profileNavigation = [
  {
    key: 'favourites',
    title: 'Sản phẩm yêu thích',
    icon: Heart,
    path: '/account/favourites'
  },
  {
    key: 'order-history',
    title: 'Lịch sử mua hàng',
    icon: Scroll,
    path: '/account/order-history'
  },
  {
    key: 'manage-address',
    title: 'Quản lý địa chỉ',
    icon: MapPinHouse,
    path: '/account/manage/address'
  },
  {
    key: 'logout',
    title: 'Đăng xuất',
    icon: LogOut
  }
]

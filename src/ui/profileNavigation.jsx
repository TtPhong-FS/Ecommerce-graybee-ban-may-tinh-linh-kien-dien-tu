import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined'
import InterestsIcon from '@mui/icons-material/Interests'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
export const profileNavigation = [
  {
    key: 'favourites',
    title: 'Sản phẩm yêu thích',
    icon: <InterestsIcon />,
    path: '/account/favourites'
  },
  {
    key: 'order-history',
    title: 'Lịch sử mua hàng',
    icon: <ArchiveOutlinedIcon />,
    path: '/account/order-history'
  },
  {
    key: 'manage-address',
    title: 'Quản lý địa chỉ',
    icon: <EditLocationAltOutlinedIcon />,
    path: '/account/manage/address'
  },
  {
    key: 'logout',
    title: 'Đăng xuất',
    icon: <LogoutOutlinedIcon />
  }
]

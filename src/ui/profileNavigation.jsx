import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined'
import InterestsIcon from '@mui/icons-material/Interests'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
export const profileNavigation = [
  {
    key: 4,
    title: 'Sản phẩm yêu thích',
    icon: <InterestsIcon />,
    path: '/account/favourites'
  },
  {
    key: 1,
    title: 'Lịch sử mua hàng',
    icon: <ArchiveOutlinedIcon />,
    path: '/account/order-history'
  },
  {
    key: 2,
    title: 'Quản lý địa chỉ',
    icon: <EditLocationAltOutlinedIcon />,
    path: '/account/manage/address'
  },
  {
    key: 3,
    title: 'Đăng xuất',
    icon: <LogoutOutlinedIcon />,
    path: '/logout'
  }
]

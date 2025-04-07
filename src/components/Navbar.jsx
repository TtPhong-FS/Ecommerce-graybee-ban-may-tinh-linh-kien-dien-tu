import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Badge, IconButton } from '@mui/material'
import { Input } from 'antd'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/vite.svg'
import { AuthContext } from '../auth/AuthProvider'
const Navbar = () => {
  const navigate = useNavigate()

  const cartItems = useSelector((state) => state.cart?.cartItems)
  const quantity = cartItems?.reduce((sum, cartItem) => sum + cartItem.quantity, 0)

  const { handleLogout } = useContext(AuthContext)
  const { isLogin } = useSelector((state) => state.auth)

  return (
    <header className="bg-secondary h-[4.7rem] flex items-center justify-center px-6">
      <div className="flex w-full h-[2.8rem] max-w-[76.25rem] gap-2 items-center">
        <div className="flex flex-1 h-full items-center md:gap-3">
          <div className="flex gap-1 items-center">
            <img className="hidden md:block size-6 md:size-10" src={logo} alt="Logo Image" />
            <h1 className="text-2xl hidden md:flex cursor-pointer" onClick={() => navigate('/')}>
              Graybee
            </h1>
          </div>
          <div className="cursor-pointer flex items-center gap-2 h-[2.8rem] rounded-[0.4rem] px-2">
            <Link href="#">
              <FontAwesomeIcon icon={faBars} size="lg" style={{ color: '#ffffff' }} />
            </Link>
            <span className="hidden md:inline text-[1rem] font-medium text-white">Danh Mục</span>
          </div>
        </div>
        <div className="flex flex-1 basis-auto items-center gap-2">
          <div className="md:hidden block">
            <img className="size-6 md:size-10" src={logo} alt="Logo Image" />
          </div>
          <div className="relative flex-1 basis-auto">
            <FontAwesomeIcon
              className="absolute top-3.5 left-2 z-10"
              icon={faMagnifyingGlass}
              size="md"
              style={{ color: '#000000' }}
            />
            <Input
              allowClear={true}
              style={{
                color: 'black',
                padding: '0.5rem 1.5rem 0.518rem 2rem',
                borderRadius: '0.4rem',
                width: '100%',
                height: '2.8rem'
              }}
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-4 font-medium">
          <div className="">
            <IconButton onClick={() => navigate('/contact')}>
              <HeadsetMicOutlinedIcon sx={{ fontSize: '1.3rem', color: 'white' }} />
            </IconButton>
          </div>
          <div className="">
            <IconButton onClick={() => navigate('/account/order-history')}>
              <LocalMallOutlinedIcon sx={{ fontSize: '1.3rem', color: 'white' }} />
            </IconButton>
          </div>
          <div className="">
            <IconButton onClick={() => navigate('/order')}>
              <Badge color="secondary" badgeContent={quantity}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: '1.3rem', color: 'white' }} />
              </Badge>
            </IconButton>
          </div>
          <div className="">
            {isLogin ? (
              <IconButton onClick={() => navigate('/account')}>
                <PermIdentityOutlinedIcon sx={{ fontSize: '1.3rem', color: 'white' }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => navigate('/login')}>
                <PermIdentityOutlinedIcon sx={{ fontSize: '1.3rem', color: 'white' }} />
              </IconButton>
            )}
          </div>
          {isLogin && (
            <div>
              <IconButton onClick={() => handleLogout()}>
                <LogoutRoundedIcon sx={{ fontSize: '1.3rem', color: 'white' }} />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar

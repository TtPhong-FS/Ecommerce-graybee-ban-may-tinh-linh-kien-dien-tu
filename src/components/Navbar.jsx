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
import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/vite.svg'

import { searchProductByName } from '../pages/product/features'
import { AuthContext } from './auth/components/AuthProvider'

import { ProductSearchCard } from './cards'
import { onFocusSidebar } from './sidebar/features/slice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const listProductSearch = useSelector((state) => state.product.listProductSearch, shallowEqual)
  const cartItems = useSelector((state) => state.cart?.cartItems)
  const quantity = cartItems?.reduce((sum, cartItem) => sum + cartItem.quantity, 0)

  const { handleLogout } = useContext(AuthContext)
  const { isLogin } = useSelector((state) => state.auth)
  const [isSearch, setIsSearch] = useState(false)
  const [loading, setLoading] = useState(false)

  const containerRef = useRef(null)

  const handleFocusSidebar = () => {
    dispatch(onFocusSidebar())
  }

  const handleSearch = (value) => {
    setIsSearch(value?.length > 0)
    setLoading(false)
    if (value?.length > 0) {
      dispatch(searchProductByName({ keyword: value }))
    }
  }

  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 300),
    []
  )

  const onChange = (e) => {
    setLoading(true)
    const value = e.target.value
    debouncedSearch(value)
  }

  const onClear = () => {
    setIsSearch(false)
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsSearch(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="sticky top-0 z-50">
      <header className=" bg-secondary h-[5rem] flex items-center justify-center md:px-4 px-2">
        <div className="flex container mx-auto h-[2.8rem] gap-2 items-center">
          <div className="flex h-full items-center md:gap-3">
            <div className="hidden md:flex gap-1 items-center">
              <img className="hidden md:block size-6 md:size-10" src={logo} alt="Logo Image" />
              <h1 className="text-2xl hidden lg:flex cursor-pointer" onClick={() => navigate('/')}>
                Graybee
              </h1>
            </div>
            <div
              onClick={handleFocusSidebar}
              className="cursor-pointer flex items-center gap-2 h-[2.8rem] rounded-[0.4rem] px-2"
            >
              <Link href="#">
                <FontAwesomeIcon icon={faBars} size="lg" style={{ color: '#ffffff' }} />
              </Link>
              <span className="hidden lg:inline text-[1rem] font-medium text-white">Danh Mục</span>
            </div>
          </div>
          <div className="flex flex-1 basis-auto items-center gap-2">
            <div className="relative flex-1 basis-auto">
              <div className="relative">
                <FontAwesomeIcon
                  className="absolute top-3.5 left-3 z-10"
                  icon={faMagnifyingGlass}
                  size="md"
                  style={{ color: '#000000' }}
                />
                <Input
                  onClear={onClear}
                  onChange={onChange}
                  allowClear={true}
                  style={{
                    color: 'black',
                    padding: '0.5rem 1.5rem 0.518rem 2.5rem',
                    borderRadius: '0.4rem',
                    width: '100%',
                    height: '2.8rem'
                  }}
                  placeholder="Search"
                />
                {isSearch && (
                  <>
                    {!listProductSearch || listProductSearch?.length === 0 ? (
                      <div className="rounded-md absolute top-12 z-50 bg-white w-full flex items-center justify-center py-5 text-gray-500">
                        Chưa có sản phẩm nào...
                      </div>
                    ) : (
                      <div ref={containerRef} className="rounded-md absolute top-12 z-50 bg-white w-full h-[30rem]">
                        <div className="w-full h-[30rem]">
                          <ProductSearchCard loading={loading} setIsSearch={setIsSearch} />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 font-medium">
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
            <div className="hidden md:block">
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
              <div className="hidden md:block">
                <IconButton onClick={() => handleLogout()}>
                  <LogoutRoundedIcon sx={{ fontSize: '1.3rem', color: 'white' }} />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

Navbar.propTypes = {
  active: PropTypes.bool,
  handleFocusSidebar: PropTypes.func
}

export default Navbar

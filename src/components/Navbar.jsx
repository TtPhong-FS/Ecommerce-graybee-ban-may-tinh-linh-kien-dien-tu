import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { searchProductByName } from '../pages/product/features'

import useLoading from '@/hooks/useLoading'
import { Headset, MapPin, Menu, Moon, ScrollText, ShoppingCart, Sun, X } from 'lucide-react'

import useUserData from '../pages/user/components/data/useUserData'
import { ProductSearchCard } from './cards'
import { onFocusSidebar } from './sidebar/features/slice'
import { useTheme } from './theme-provider'
import { Button } from './ui/button'
import { Input } from './ui/input'

const navigation = [
  {
    path: '/contact',
    icon: Headset,
    badge: false,
    title: 'Liên hệ 9001.4869'
  },
  {
    path: '/shop-location',
    icon: MapPin,
    badge: false,
    title: 'Hệ thống cửa hàng'
  },
  {
    path: '/account/order-history',
    icon: ScrollText,
    badge: false,
    title: 'Lịch sử mua hàng'
  },
  {
    path: '/cart/cart-buy-order-box',
    icon: ShoppingCart,
    badge: true,
    title: 'Giỏ hàng'
  }
]

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { setTheme, theme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const { user } = useUserData()

  const listProductSearch = useSelector((state) => state.product.listProductSearch, shallowEqual)
  const cartItems = useSelector((state) => state.cart?.cartItems)
  const totalQuantity = cartItems?.reduce((sum, cartItem) => sum + cartItem.quantity, 0)

  const { isLogin } = useSelector((state) => state.auth)
  const [isSearch, setIsSearch] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { isLoading, start, stop } = useLoading()

  const containerRef = useRef(null)

  const handleFocusSidebar = () => {
    dispatch(onFocusSidebar())
  }

  const handleSearch = (value) => {
    setIsSearch(value?.length > 0)

    if (value?.length > 0) {
      dispatch(searchProductByName({ keyword: value }))
    }
    stop('searching')
  }

  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 500),
    []
  )

  const onChange = (e) => {
    start('searching')
    const value = e.target.value
    setKeyword(value)
    debouncedSearch(value)
  }

  const onClear = () => {
    setKeyword('')
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
    <>
      <nav className="bg-secondary/90">
        <div className="w-full max-w-[88rem] flex  mx-auto gap-2 items-center justify-end py-1.5">
          {isLogin && <Link to="/account">Hi, {user?.fullName}</Link>}
          <span className="cursor-pointer flex items-center" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </span>
        </div>
      </nav>
      <div className="sticky top-0 z-50 shadow-lg shadow-border">
        <header className="bg-primary-foreground h-[5rem] flex items-center justify-center md:px-4 px-2">
          <div className="flex w-full max-w-[88rem] mx-auto h-[2.8rem] gap-2 items-center">
            <div className="flex h-full items-center md:gap-3">
              <div className="hidden md:flex gap-1 items-center">
                <Link
                  className="text-2xl font-semibold text-muted-foreground uppercase hidden lg:flex cursor-pointer"
                  to="/"
                >
                  Graybee
                </Link>
              </div>
              <div
                onClick={handleFocusSidebar}
                className="cursor-pointer flex items-center gap-2 h-[2.8rem] rounded-[0.4rem] px-2"
              >
                <Link href="#">
                  <Menu className="text-primary" size={20} />
                </Link>
                <span className="hidden lg:inline text-[1rem] font-medium text-muted-foreground">Danh Mục</span>
              </div>
            </div>
            <div className="flex flex-1 basis-auto items-center gap-2">
              <div className="relative flex-1 basis-auto">
                <div className="relative">
                  <Input
                    value={keyword}
                    onChange={onChange}
                    type="search"
                    className="h-[40px] bg-white dark:bg-white"
                    placeholder="Tìm kiếm sản phẩm..."
                  />
                  {keyword && <X onClick={onClear} className="absolute right-0 top-1/2 -translate-1/2" size={16} />}
                  {isSearch && (
                    <>
                      {!listProductSearch || listProductSearch?.length === 0 ? (
                        <span className="rounded-md absolute top-12 z-50 bg-white w-full flex items-center justify-center py-5 description">
                          Chưa có sản phẩm nào...
                        </span>
                      ) : (
                        <div ref={containerRef} className="rounded-md absolute top-12 z-50 bg-white w-full h-[30rem]">
                          <div className="w-full h-[30rem]">
                            <ProductSearchCard loading={isLoading('searching')} setIsSearch={setIsSearch} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 font-medium ml-2">
              {navigation.map((item, index) => (
                <Link
                  to={item.path}
                  className="w-[100px] text-center  relative hidden md:inline-flex gap-2 items-center"
                  key={index}
                >
                  <span className="relative">
                    <item.icon className="cursor-pointer text-primary" size={20} />
                    {item.badge && (
                      <span className="text-red-500 cursor-pointer select-none absolute w-5 h-5 justify-center text-xs flex items-center rounded-full -top-1/2 -right-2  bg-secondary-foreground">
                        {totalQuantity}
                      </span>
                    )}
                  </span>
                  <span className="text-[13px] text-muted-foreground font-medium">{item.title}</span>
                </Link>
              ))}

              <div className="hidden lg:block">
                {!isLogin && (
                  <Button
                    variant="secondary"
                    className="cursor-pointer h-[40px]   select-none"
                    onClick={() => navigate('/login')}
                  >
                    Đăng nhập
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}

Navbar.propTypes = {
  active: PropTypes.bool,
  handleFocusSidebar: PropTypes.func
}

export default Navbar

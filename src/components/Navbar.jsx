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
    badge: false
  },
  {
    path: '/shop-location',
    icon: MapPin,
    badge: false
  },
  {
    path: '/account/order-history',
    icon: ScrollText,
    badge: false
  },
  {
    path: '/cart/cart-buy-order-box',
    icon: ShoppingCart,
    badge: true
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
    <div className="sticky top-0 z-50">
      <header className="bg-secondary h-[5rem] flex items-center justify-center md:px-4 px-2">
        <div className="flex w-full max-w-[88rem] mx-auto h-[2.8rem] gap-2 items-center">
          <div className="flex h-full items-center md:gap-3">
            <div className="hidden md:flex gap-1 items-center">
              <span
                className="text-2xl font-semibold text-secondary-foreground uppercase hidden lg:flex cursor-pointer"
                onClick={() => navigate('/')}
              >
                Graybee
              </span>
            </div>
            <div
              onClick={handleFocusSidebar}
              className="cursor-pointer flex items-center gap-2 h-[2.8rem] rounded-[0.4rem] px-2"
            >
              <Link href="#">
                <Menu className="text-secondary-foreground" size={20} />
              </Link>
              <span className="hidden lg:inline text-[1rem] font-medium text-secondary-foreground">Danh Mục</span>
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
              <Link to={item.path} className="relative hidden md:inline-flex items-center" key={index}>
                <item.icon className="cursor-pointer text-secondary-foreground" size={20} />
                {item.badge && (
                  <span className="text-red-500 cursor-pointer select-none absolute w-5 h-5 justify-center text-xs flex items-center rounded-full top-0 -right-2  bg-secondary-foreground">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            ))}

            <div className="hidden lg:block">
              {isLogin ? (
                <Button variant="outline" className="cursor-pointer h-[40px]" onClick={() => navigate('/account')}>
                  Hi, {user?.fullName}
                </Button>
              ) : (
                <Button
                  className="cursor-pointer h-[40px] bg-secondary-foreground text-primary dark:bg-secondary-foreground dark:hover:bg-secondary-foreground/90 dark:text-primary-foreground hover:bg-secondary-foreground/90 select-none"
                  onClick={() => navigate('/login')}
                >
                  Đăng nhập
                </Button>
              )}
            </div>
            <div className="cursor-pointer flex items-center " onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </div>
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

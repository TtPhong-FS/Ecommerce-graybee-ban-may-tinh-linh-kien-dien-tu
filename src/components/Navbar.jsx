import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Headset, LogOut, MapPin, Menu, Moon, ScrollText, ShoppingCart, Sun, UserRound, X } from 'lucide-react'

import { searchProductByNameAsync } from '@/features/product/redux'
import { useUserData } from '@/features/user'
import { useAppContext, useLoading } from '@/hooks'
import { LanguageSwitcher, useCustomTranslate } from '@/i18n'
import { useMediaQuery } from '@mui/material'
import { AuthContext } from '../features/auth/components/AuthProvider'
import { ProductSearchCard } from './cards'
import { onFocusSidebar } from './sidebar/redux/slice'
import { useTheme } from './theme-provider'
import { Input } from './ui/input'

const navigation = [
  {
    path: '/contact',
    icon: Headset,
    badge: false,
    title: 'contact'
  },
  {
    path: '/shop-location',
    icon: MapPin,
    badge: false,
    title: 'showroom'
  },
  {
    path: '/account/order-history',
    icon: ScrollText,
    badge: false,
    title: 'orderHistory'
  },
  {
    path: '/cart/cart-buy-order-box',
    icon: ShoppingCart,
    badge: true,
    title: 'cart'
  }
]

export const Navbar = () => {
  const { t } = useCustomTranslate()
  const { dispatch, navigate } = useAppContext()

  const { setTheme, theme } = useTheme()
  const isMobile = useMediaQuery('(max-width: 640px)')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const { handleLogout } = useContext(AuthContext)
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
    if (isMobile) {
      alert('mobile')
    } else {
      dispatch(onFocusSidebar())
    }
  }

  const handleSearch = (value) => {
    setIsSearch(value?.length > 0)

    if (value?.length > 0) {
      dispatch(searchProductByNameAsync(value))
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
        <div className="w-full max-w-[88rem] flex text-sm mx-auto gap-2 items-center justify-end py-1.5">
          <div className="flex items-center gap-2 ">
            {isLogin && <LogOut size={20} className="cursor-pointer" onClick={() => handleLogout()} />}
            {isLogin && <Link to="/account">Hi, {user?.fullName}</Link>}
          </div>
          <LanguageSwitcher />
          <span className="cursor-pointer flex items-center" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </span>
        </div>
      </nav>
      <div className="select-none sticky top-0 z-50 shadow-lg shadow-border">
        <header className="bg-primary-foreground h-[5rem] flex items-center justify-center md:px-4 px-2">
          <div className="flex w-full max-w-[88rem] mx-auto h-[2.8rem] gap-2 items-center">
            <div className="flex h-full items-center lg:gap-3">
              <div className="hidden md:flex gap-1 items-center">
                <Link className="text-2xl font-semibold text-primary uppercase hidden lg:flex cursor-pointer" to="/">
                  Graybee
                </Link>
              </div>
              <Link
                to="/"
                onClick={handleFocusSidebar}
                className="cursor-pointer flex items-center gap-2 h-[2.8rem] rounded-[0.4rem] px-2"
              >
                <Menu className="text-primary" size={20} />
                <span className="hidden uppercase lg:inline text-[1rem] font-medium text-muted-foreground">
                  {t('navbar:menu')}
                </span>
              </Link>
            </div>
            <div className="flex flex-1 basis-auto items-center gap-2">
              <div className="relative flex-1 basis-auto">
                <div className="relative">
                  <Input
                    value={keyword}
                    onChange={onChange}
                    type="text"
                    className="h-[40px] bg-white dark:bg-white dark:text-primary-foreground max-sm:text-sm"
                    placeholder={`${t('common:search')}...`}
                  />
                  {keyword && (
                    <span
                      className="bg-primary flex items-center justify-center rounded-full w-4 h-4 absolute right-0 top-1/2 -translate-1/2 cursor-pointer"
                      onClick={onClear}
                    >
                      <X className="text-background" size={12} />
                    </span>
                  )}
                  {isSearch && (
                    <>
                      {!listProductSearch || listProductSearch?.length === 0 ? (
                        <span className="rounded-md text-sm absolute top-12 z-50 bg-white w-full flex items-center justify-center py-5 description">
                          {t('common:empty')}...
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
            <div className="flex w-max gap-6 lg:gap-4 gap-2 font-medium ml-2">
              {navigation.map((item, index) => {
                const lastItem = index === navigation.length - 1
                const title = t(`navbar:${item.title}`)
                return (
                  <Link
                    to={item.path}
                    className={`${
                      !lastItem ? 'hidden sm:inline-flex' : 'inline-flex'
                    } w-min text-center gap-2 relative items-center`}
                    key={index}
                  >
                    <span className="relative">
                      <item.icon className="cursor-pointer text-primary" size={20} />
                      {item.badge && (
                        <span className="text-secondary-foreground cursor-pointer select-none absolute w-4 h-4 justify-center text-xs flex items-center rounded-full -top-1/3 -right-2 bg-error">
                          {totalQuantity}
                        </span>
                      )}
                    </span>
                    <span className="text-[13px] text-muted-foreground font-medium hidden lg:block w-[3.8rem]">
                      {title} {item.title === 'contact' && '9001.4869'}
                    </span>
                  </Link>
                )
              })}

              <div className="inline-flex items-center  ">
                {isMobile ? (
                  <Link to={'/login'} className="cursor-pointer">
                    <UserRound size={20} />
                  </Link>
                ) : (
                  !isLogin && (
                    <Link
                      className="cursor-pointer inline-flex items-center justify-center text-sm h-[38px] min-w-24 bg-secondary p-3 rounded-sm text-secondary-foreground dark:text-secondary-foreground select-none"
                      to={'/login'}
                    >
                      {t('navbar:login')}
                    </Link>
                  )
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

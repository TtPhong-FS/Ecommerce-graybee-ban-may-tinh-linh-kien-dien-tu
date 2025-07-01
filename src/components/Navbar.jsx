import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Menu, ShoppingCart, X } from 'lucide-react'

import logoTS from '@/assets/logo-techstore.png'
import { NAVIGATION } from '@/constants'
import { searchProductByNameAsync } from '@/features/product/redux'
import { setSearch } from '@/features/product/redux/productSlice'
import { selectProfile } from '@/features/user/redux/userSelector'
import { useAppContext, useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { getToken } from '@/utils'
import { useMediaQuery } from '@mui/material'
import { ProductSearchCard } from './cards'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Input } from './ui/input'

export const Navbar = ({ openSidebar, setOpenSidebar }) => {
  // const { setTheme, theme } = useTheme()

  // const toggleTheme = () => {
  //   setTheme(theme === 'light' ? 'dark' : 'light')
  // }

  const { t } = useCustomTranslate()
  const { dispatch } = useAppContext()

  const token = getToken()
  const isMobile = useMediaQuery('(max-width: 640px)')

  const profile = useSelector(selectProfile)

  const search = useSelector((state) => state.product.search, shallowEqual)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalQuantity = cartItems?.reduce((sum, cartItem) => sum + cartItem.quantity, 0)

  const [isSearch, setIsSearch] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { isLoading, start, stop } = useLoading()

  const containerRef = useRef(null)

  const handleSearch = (value) => {
    setIsSearch(value?.length > 0)

    if (value?.length > 0) {
      dispatch(searchProductByNameAsync(value))
    } else {
      dispatch(setSearch())
    }
    stop('searching')
  }

  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 1000),
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
      <div className="select-none sticky top-0 z-50">
        <header className="bg-primary-foreground h-[5rem] flex items-center justify-center md:px-4 px-2">
          <div className="flex w-full max-w-[74rem] mx-auto h-[2.8rem] gap-2 items-center">
            <div className="flex h-full items-center lg:gap-3">
              <div className="hidden md:flex gap-1 items-center">
                <Link className="text-2xl font-semibold text-primary uppercase hidden lg:flex cursor-pointer" to="/">
                  <img src={logoTS} alt="" className="w-[2.8rem] h-[2.8rem] scale-250 mx-5" />
                </Link>
              </div>
              <Link
                to="#"
                onClick={() => setOpenSidebar(!openSidebar)}
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
                    placeholder={`${t('product:search')}`}
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
                      {search?.length === 0 ? (
                        <span className="rounded-md text-sm absolute top-12 z-50 bg-white w-full flex items-center justify-center py-5 description">
                          {t('product:empty')}
                        </span>
                      ) : (
                        <div ref={containerRef} className="rounded-md absolute top-12 z-50  w-full">
                          <ProductSearchCard loading={isLoading('searching')} setIsSearch={setIsSearch} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-max gap-6 lg:gap-4 font-medium ml-2 items-center justify-center">
              {NAVIGATION.map((item, index) => {
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
                  <Link to={'/cart/cart-buy-order-box'}>
                    <span className="inline-block relative pr-2">
                      <ShoppingCart className="cursor-pointer text-primary " size={20} />
                      <span className="text-secondary-foreground cursor-pointer select-none absolute w-4 h-4 justify-center text-xs flex items-center rounded-full -top-1/3 -right-0 bg-error">
                        {totalQuantity}
                      </span>
                    </span>
                  </Link>
                ) : token ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="text-sm py-5">
                      <Button variant="secondary">Hi, {profile?.fullName}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link to={'/account'}>Thông tin cá nhân</Link>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem asChild>
                        <Button onClick={toggleTheme} variant="ghost" size="icon" className="cursor-pointer">
                          {theme === 'light' ? (
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          ) : (
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          )}
                        </Button>
                      </DropdownMenuItem> */}

                      <DropdownMenuItem asChild>
                        <Link to={'/logout'}>Đăng xuất</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to={'/login'}>
                    <Button variant="secondary" className="cursor-pointer">
                      {t('auth:login.btnLogin')}
                    </Button>
                  </Link>
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
  openSidebar: PropTypes.bool,
  active: PropTypes.bool,
  handleFocusSidebar: PropTypes.func,
  setOpenSidebar: PropTypes.func
}

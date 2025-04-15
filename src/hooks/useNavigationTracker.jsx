import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setNavigation } from '../services/slice'

const getPageName = (pathname) => {
  if (pathname === '/') return 'Home'
  if (pathname.includes('/product/details')) return 'Product detail'
  if (pathname.includes('/account/order-history')) return 'Customer order history'

  if (pathname.includes('/account/profile')) return 'User profile'
  if (pathname.includes('/account/')) return 'User profile'
  if (pathname.includes('/account/manage-address')) return 'Manage address delivery'
  if (pathname.includes('/account/favourites')) return 'Favourites product list'
  if (pathname.includes('/order')) return 'Order page'

  if (pathname.includes('/contact')) return 'Contact page'
  return 'Unknown page'
}

export const useNavigationTracker = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setNavigation({
        pathname: location.pathname,
        pageName: getPageName(location.pathname)
      })
    )
  }, [location.pathname, dispatch])
}

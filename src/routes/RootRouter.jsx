import { AuthProvider } from '../components/auth/components/AuthProvider'
import { ProfileLayout, RootLayout } from '../layout'
import Contact from '../pages/Contact'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { OrderPage } from '../pages/orders/pages'
import { ProductDetail } from '../pages/product/pages/ProductDetail'
import ProductPage from '../pages/product/pages/ProductPage'
import { OrderDetail } from '../pages/user/components/OrderDetail'
import { FavouritePage, ManageAddressPage, OrderHistoryPage, ProfilePage } from '../pages/user/pages'
const RootRouter = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    handle: {
      crumb: () => 'Trang chủ'
    },
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <HomePage />,
        handle: { crumb: () => 'Đăng nhập' }
      },
      {
        path: 'signup',
        element: <HomePage />,
        handle: { crumb: () => 'Đăng ký' }
      },
      {
        path: 'contact',
        element: <Contact />,
        handle: { crumb: () => 'Liên hệ' }
      },
      {
        path: 'product/details/:slugId',
        element: <ProductDetail />,
        handle: { crumb: ({ params }) => `${params.slugId.toUpperCase()}` }
      },
      {
        path: 'pages/:category',
        element: <ProductPage />,
        handle: {
          crumb: ({ params }) => `${params.category.toUpperCase()}`
        }
      },
      {
        path: 'pages/:category/:manufacturer',
        element: <ProductPage />,
        handle: {
          crumb: ({ params }) => `${params.category.toUpperCase()} ${params.manufacturer.toUpperCase()}`
        }
      },
      {
        path: 'cart/cart-buy-order-box',
        element: <OrderPage />,
        handle: {
          crumb: () => 'Giỏ hàng'
        }
      },
      {
        path: 'account/',
        element: (
          <>
            <AuthProvider>
              <ProfileLayout />
            </AuthProvider>
          </>
        ),

        handle: { crumb: () => 'Tài khoản cá nhân' },
        children: [
          {
            index: true,
            element: <ProfilePage />,
            handle: { crumb: () => 'Thông tin' }
          },
          {
            path: 'profile',
            element: <ProfilePage />,
            handle: { crumb: () => 'Thông tin' }
          },
          {
            path: 'favourites',
            element: <FavouritePage />,
            handle: { crumb: () => 'Danh sách yêu thích' }
          },
          {
            path: 'order-history',
            element: <OrderHistoryPage />,
            handle: { crumb: () => 'Lịch sử đặt hàng' }
          },
          {
            path: 'order/detail/:orderCode',
            element: <OrderDetail />,
            handle: {
              crumb: ({ params }) => `Chi tiết đơn hàng #${params.orderCode}`
            }
          },
          {
            path: 'manage/address',
            element: <ManageAddressPage />,
            handle: { crumb: () => 'Địa chỉ cá nhân' }
          }
        ]
      }
    ]
  }
]

export default RootRouter

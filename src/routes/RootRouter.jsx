import { RootLayout } from '../layout'
import Contact from '../pages/Contact'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { OrderPage } from '../pages/orders/pages'
import { ProductDetail } from '../pages/product/pages/ProductDetail'
import ProductPage from '../pages/product/pages/ProductPage'
import { OrderDetail } from '../pages/user/components/OrderDetail'
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
        path: 'order/detail/:orderCode',
        element: <OrderDetail />,
        handle: {
          crumb: ({ params }) => `Chi tiết đơn hàng #${params.orderCode}`
        }
      }
    ]
  }
]

export default RootRouter

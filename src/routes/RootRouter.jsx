import { AuthProvider } from '@/features/auth/components/AuthProvider'
import { LoginProvider } from '@/features/auth/components/LoginProvider'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import ResetPassword from '@/features/auth/components/ResetPassword'
import { SignUpProvider } from '@/features/auth/components/SignUpProvider'
import VerifyEmail from '@/features/auth/components/VerifyEmail'
import VerifyOtp from '@/features/auth/components/VerifyOtp'
import { AuthPage } from '@/features/auth/pages'
import { OrderPage } from '@/features/order/pages'
import { ProductDetail, ProductPage } from '@/features/product'
import { FavouritePage, ManageAddressPage, OrderHistoryPage, ProfilePage } from '@/features/user'
import { OrderDetail } from '@/features/user/components/OrderDetail'
import { ProfileLayout, RootLayout } from '@/layout'
import { Contact, HomePage, NotFoundPage } from '@/pages'
const RootRouter = [
  {
    path: '/',
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
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
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'login',
        element: (
          <AuthPage>
            <LoginProvider />
          </AuthPage>
        ),
        handle: { crumb: () => 'Đăng nhập' }
      },
      {
        path: 'signup',
        element: (
          <AuthPage>
            <SignUpProvider />
          </AuthPage>
        ),
        handle: { crumb: () => 'Đăng ký' }
      },
      {
        path: 'forgot-password/',
        element: (
          <AuthPage>
            <VerifyEmail />
          </AuthPage>
        ),
        handle: { crumb: () => 'Quên mật khẩu' },
        children: [
          {
            path: 'verify-email',
            element: (
              <AuthPage>
                <VerifyEmail />
              </AuthPage>
            ),
            handle: { crumb: () => 'Xác thực Email' }
          },
          {
            path: 'verify-otp',
            element: (
              <AuthPage>
                <VerifyOtp />
              </AuthPage>
            ),
            handle: { crumb: () => 'Xác thực OTP' }
          },
          {
            path: 'reset-password',
            element: (
              <AuthPage>
                <ResetPassword />
              </AuthPage>
            ),
            handle: { crumb: () => 'Đặt lại mật khẩu' }
          }
        ]
      },

      {
        path: 'contact',
        element: <Contact />,
        handle: { crumb: () => 'Liên hệ' }
      },
      {
        path: 'products/:slugId',
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
            <ProtectedRoute requiredRoles={['ADMIN', 'CUSTOMER', 'MANAGE']}>
              <ProfileLayout />
            </ProtectedRoute>
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

import Logout from '@/components/Logout'
import {
  AuthPage,
  AuthProvider,
  LoginProvider,
  ProtectedRoute,
  ResetPassword,
  SignUpProvider,
  VerifyEmail,
  VerifyOtp
} from '@/features/auth'
import ForgotPasswordLayout from '@/features/auth/layout/ForgotPasswordLayout'
import { OrderPage } from '@/features/order'
import { ProductDetail } from '@/features/product'
import ReviewModal from '@/features/product/components/ReviewModal'
import { FavouritePage, ManageAddressPage, OrderDetail, OrderHistoryPage, ProfilePage } from '@/features/user'
import AddressModal from '@/features/user/components/AddressModal'
import UpdateAddressPage from '@/features/user/pages/UpdateAddressPage'
import { ProfileLayout, RootLayout } from '@/layout'
import { CollectionPage, Contact, HomePage, NotFoundPage } from '@/pages'

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
      crumb: () => 'home'
    },
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'logout',
        element: <Logout />
      },
      {
        path: 'login',
        element: (
          <AuthPage>
            <LoginProvider />
          </AuthPage>
        ),
        handle: { crumb: () => 'login' }
      },
      {
        path: 'signup',
        element: (
          <AuthPage>
            <SignUpProvider />
          </AuthPage>
        ),
        handle: { crumb: () => 'signup' }
      },
      {
        path: 'forgot-password/',
        element: (
          <AuthPage>
            <ForgotPasswordLayout />
          </AuthPage>
        ),
        handle: { crumb: () => 'forgotPassword' },
        children: [
          {
            index: true,
            element: <VerifyEmail />,
            handle: { crumb: () => 'verifyEmail' }
          },
          {
            path: 'verify-email',
            element: <VerifyEmail />,
            handle: { crumb: () => 'verifyEmail' }
          },
          {
            path: 'verify-otp',
            element: <VerifyOtp />,
            handle: { crumb: () => 'verifyOtp' }
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
            handle: { crumb: () => 'resetPassword' }
          }
        ]
      },

      {
        path: 'contact',
        element: <Contact />,
        handle: { crumb: () => 'contact' }
      },
      {
        path: 'products/:slug',
        element: <ProductDetail />,
        handle: { crumb: ({ params }) => `${params.slug}` },
        children: [
          {
            path: 'review',
            element: <ReviewModal />
          },
          {
            path: 'edit/:id',
            element: <ReviewModal />
          },
          {
            path: 'delete/:id',
            element: <ReviewModal />
          }
        ]
      },
      {
        path: 'collections/:slug',
        element: <CollectionPage />,
        handle: {
          crumb: ({ params }) => `${params.slug}`
        }
      },
      {
        path: 'cart/cart-buy-order-box',
        element: <OrderPage />,
        handle: {
          crumb: () => 'cart'
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

        handle: { crumb: () => 'personalAccount' },
        children: [
          {
            index: true,
            element: <ProfilePage />,
            handle: { crumb: () => 'personalInformation' }
          },
          {
            path: 'profile',
            element: <ProfilePage />,
            handle: { crumb: () => 'personalInformation' }
          },
          {
            path: 'favourites',
            element: <FavouritePage />,
            handle: { crumb: () => 'favourite' }
          },
          {
            path: 'order-history/',
            element: <OrderHistoryPage />,
            handle: { crumb: () => 'orderHistory' },
            children: [
              {
                path: 'detail/:code',
                element: <OrderDetail />,
                handle: {
                  crumb: () => 'orderDetail'
                }
              }
            ]
          },
          {
            path: 'address/',
            element: <ManageAddressPage />,
            handle: { crumb: () => 'personalAddress' },
            children: [
              {
                path: 'create',
                element: <AddressModal />
              },
              {
                path: 'edit/:id',
                element: <UpdateAddressPage />
              },
              {
                path: 'delete/:id',
                element: <AddressModal />
              }
            ]
          }
        ]
      }
    ]
  }
]

export default RootRouter

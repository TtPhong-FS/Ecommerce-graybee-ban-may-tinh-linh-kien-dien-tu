import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { findCartByUserUidOrSessionId } from '@/components/cart/features'
import { handleAsyncSubmit } from '@/components/func'
import { Button } from '@/components/ui/button'
import useAppContext from '@/hooks/useAppContext'
import { getAddressesByToken, getFavourites, getProfileByToken } from '@/pages/user/features'
import { saveAuthToken } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'
import { RHFInputField } from '../../../components/fields'
import { loginUserAsync } from '../features'
import { defaultValues } from '../types/login'
import { AuthContext } from './AuthProvider'
export const Login = () => {
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting }
  } = useFormContext()

  const { dispatch, navigate } = useAppContext()

  const { setUser, setLoading } = useContext(AuthContext)

  const onSubmit = async (values) => {
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(loginUserAsync(vals)).unwrap(),
      onSuccess: (res) => {
        const { token } = res.data
        saveAuthToken(token)
        const decodedToken = jwtDecode(token)
        setUser(decodedToken)
        setLoading(false)

        if (token) {
          dispatch(getAddressesByToken())
          dispatch(getProfileByToken())
          dispatch(getFavourites())
          dispatch(findCartByUserUidOrSessionId())
        }

        if (decodedToken?.role === 'SUPER_ADMIN' || decodedToken?.role === 'ADMIN' || decodedToken?.role === 'MANAGE') {
          navigate('/home')
        } else {
          navigate('/unauthorized')
        }
      },
      values,
      toast,
      setError,
      defaultValues: defaultValues,
      reset
    })
  }
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <h1>Đăng nhập hoặc tạo tài khoản</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-2 mt-6">
          <RHFInputField label="Số điện thoại" name="username" placeholder="Nhập số điện thoại..." type="tel" />
          <RHFInputField label="Mật khẩu" name="password" placeholder="Nhập mật khẩu..." type="password" />
        </div>
        <div className="flex justify-end mb-8">
          <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline decoration-solid">
            Quên mật khẩu?
          </Link>
        </div>
        <Button
          variant="secondary"
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer h-[40px]  w-full text-sm"
        >
          Đăng nhập
        </Button>
      </form>
      <div className="flex items-center justify-center mt-6 gap-1">
        <p className="text-sm">Bạn chưa có tài khoản?</p>
        <Link className="text-blue-500 hover:underline text-sm decoration-solid" to="/signup">
          Đăng ký
        </Link>
      </div>
    </>
  )
}

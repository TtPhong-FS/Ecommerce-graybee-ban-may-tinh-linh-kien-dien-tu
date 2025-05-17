import { yupResolver } from '@hookform/resolvers/yup'

import { findCartByUserUidOrSessionIdAsync } from '@/components/cart/features'
import { handleAsyncSubmit } from '@/components/func'
import { patterns } from '@/constants'
import useAppContext from '@/hooks/useAppContext'
import { getAddressesByTokenAsync, getFavouritesAsync, getProfileByTokenAsync } from '@/pages/user/features'
import { saveAuthToken } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as yup from 'yup'
import { loginUserAsync } from '../features'
import { AuthContext } from './AuthProvider'
import { Login } from './Login'
const Schema = yup.object().shape({
  username: yup
    .string()
    .matches(patterns.phoneNumber, 'Vui lòng nhập số điện thoại')
    .min(10, 'Số điện thoại phải từ 10 đến 12 số')
    .max(12, 'Số điện thoại phải từ 10 đến 12 số')
    .required('Vui lòng nhập số điện thoại'),
  password: yup.string().required('Vui lòng nhập mật khẩu')
})

export const LoginProvider = () => {
  const { dispatch, navigate } = useAppContext()

  const { setUser, setLoading } = useContext(AuthContext)

  const methods = useForm({
    resolver: yupResolver(Schema),

    defaultValues: {
      username: '',
      password: ''
    },
    shouldUnregister: false
  })

  const onSubmit = methods.handleSubmit(async (values) => {
    console.log(values)
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(loginUserAsync(vals)).unwrap(),
      onSuccess: (res) => {
        const { token } = res.data
        saveAuthToken(token)
        const decodedToken = jwtDecode(token)
        setUser(decodedToken)
        setLoading(false)

        if (token) {
          dispatch(getAddressesByTokenAsync())
          dispatch(getProfileByTokenAsync())
          dispatch(getFavouritesAsync())
          dispatch(findCartByUserUidOrSessionIdAsync())
        }

        if (decodedToken?.role === 'SUPER_ADMIN' || decodedToken?.role === 'ADMIN' || decodedToken?.role === 'MANAGE') {
          navigate('/home')
        } else {
          navigate('/unauthorized')
        }
      },
      values,
      toast,
      setError: methods.setError,
      defaultValues: methods.formState.defaultValues,
      reset: methods.reset
    })
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Login />
      </form>
    </FormProvider>
  )
}

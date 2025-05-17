import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, useForm } from 'react-hook-form'
import { Login } from './Login'
import * as yup from 'yup'
import useAppContext from '@/hooks/useAppContext'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { loginUserAsync } from '../features'
import { handleAsyncSubmit } from '@/components/func'
import { saveAuthToken } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { getAddressesByToken, getFavourites, getProfileByToken } from '@/pages/user/features'
import { findCartByUserUidOrSessionId } from '@/components/cart/features'
import { patterns } from '@/constants'
import {toast} from 'sonner'
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


  const onSubmit = methods.handleSubmit( async (values) => {
    console.log(values)
    // await handleAsyncSubmit({
    //   asyncAction: (vals) => dispatch(loginUserAsync(vals)).unwrap(),
    //   onSuccess: (res) => {
    //     const { token } = res.data
    //     saveAuthToken(token)
    //     const decodedToken = jwtDecode(token)
    //     setUser(decodedToken)
    //     setLoading(false)
  
    //     if (token) {
    //       dispatch(getAddressesByToken())
    //       dispatch(getProfileByToken())
    //       dispatch(getFavourites())
    //       dispatch(findCartByUserUidOrSessionId())
    //     }
  
    //     if (decodedToken?.role === 'SUPER_ADMIN' || decodedToken?.role === 'ADMIN' || decodedToken?.role === 'MANAGE') {
    //       navigate('/home')
    //     } else {
    //       navigate('/unauthorized')
    //     }
    //   },
    //   values,
    //   toast,
    //   setError: methods.setError,
    //   defaultValues: methods.formState.defaultValues,
    //   reset: methods.reset
    // })
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>

        <Login />
      </form>
    </FormProvider>
  )
}

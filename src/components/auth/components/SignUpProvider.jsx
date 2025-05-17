import { yupResolver } from '@hookform/resolvers/yup'

import { todayMinus18 } from '@/constants'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { SignUp } from './SignUp'
import { format } from 'date-fns'
import useAppContext from '@/hooks/useAppContext'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'
const schema = yup.object({
  fullName: yup.string().max(100, 'Tên quá dài').nullable().notRequired(),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Vui lòng nhập số điện thoại')
    .min(10, 'Số điện thoại phải từ 10 đến 12 số')
    .max(12, 'Số điện thoại phải từ 10 đến 12 số')
    .required('Vui lòng nhập số điện thoại'),
  email: yup.string().max(100, 'Địa chỉ Email quá dài').nullable().notRequired(),
  dateOfBirth: yup
    .date()
    .typeError('Vui lòng chọn ngày sinh hợp lệ')
    .max(todayMinus18, 'Bạn phải từ 18 tuổi trở lên')
    .nullable()
    .notRequired(),
  password: yup.string().max(100, 'Mật khẩu quá dài').required('Vui lòng nhập mật khẩu')
})

export const SignUpProvider = () => {

  const { dispatch, navigate } = useAppContext()

  const { setUser, setLoading } = useContext(AuthContext)


  const methods = useForm({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      dateOfBirth: '',
      password: '',
      gender: ''
    },
    resolver: yupResolver(schema),
    shouldUnregister: false
  })

  const onSubmit = methods.handleSubmit( async (values) => {
    const formatDateOfBirth = format(values.dateOfBirth, 'MM/dd/yyyy')
    const request = { ...values, dateOfBirth: formatDateOfBirth }
    console.log(request)

    // await handleAsyncSubmit({
    //   asyncAction: (vals) => dispatch(registerUserAsync(vals)).unwrap(),
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
    //   values: request,
    //   toast,
    //   setError,
    //   defaultValues: defaultValues,
    //   reset
    // })
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>

        <SignUp />
      </form>
    </FormProvider>
  )
}

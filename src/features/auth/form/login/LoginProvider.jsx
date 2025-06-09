import { yupResolver } from '@hookform/resolvers/yup'

import { handleAsyncSubmit } from '@/lib'
import { saveAuthToken } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useAppContext } from '@/hooks'
import { AuthContext } from '../../components'
import { loginUserAsync } from '../../redux'
import { Login } from './Login'
import { useValidationSchema } from './useValidationSchema'

export const LoginProvider = () => {
  const { dispatch, navigate } = useAppContext()

  const { setUser, setLoading } = useContext(AuthContext)
  const { schema } = useValidationSchema()
  const methods = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      phone: '',
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

        // if (token) {
        //   dispatch(getAddressesByTokenAsync())
        //   dispatch(getProfileByTokenAsync())
        //   dispatch(getFavouritesAsync())
        //   dispatch(findCartByUserUidOrSessionIdAsync())
        // }

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

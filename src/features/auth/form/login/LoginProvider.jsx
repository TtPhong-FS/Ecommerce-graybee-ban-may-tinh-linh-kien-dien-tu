import { yupResolver } from '@hookform/resolvers/yup'

import useAppContext from '@/hooks/useAppContext'
import { handleAsyncSubmit } from '@/lib'
import { saveAuthToken } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { loginUserAsync } from '../../redux'
import { AuthContext } from './AuthProvider'
import { Login } from './Login'
import { defaultValues, schema } from './schema'

export const LoginProvider = () => {
  const { dispatch, navigate } = useAppContext()

  const { setUser, setLoading } = useContext(AuthContext)

  const methods = useForm({
    resolver: yupResolver(schema),

    defaultValues: defaultValues,
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

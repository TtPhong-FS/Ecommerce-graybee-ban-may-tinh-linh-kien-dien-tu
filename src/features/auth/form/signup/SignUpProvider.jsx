import { yupResolver } from '@hookform/resolvers/yup'

import { useAppContext } from '@/hooks'
import { handleAsyncSubmit } from '@/lib'
import { saveAuthToken } from '@/utils'
import { format } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AuthContext } from '../../components'
import { registerUserAsync } from '../../redux'
import { defaultValues, schema } from './schema'
import { SignUp } from './SignUp'
export const SignUpProvider = () => {
  const { dispatch, navigate } = useAppContext()

  const { setUser, setLoading } = useContext(AuthContext)

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    shouldUnregister: false
  })

  const onSubmit = methods.handleSubmit(async (values) => {
    const formatDateOfBirth = format(values.dateOfBirth, 'MM/dd/yyyy')
    const request = { ...values, dateOfBirth: formatDateOfBirth }
    console.log(request)

    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(registerUserAsync(vals)).unwrap(),
      onSuccess: (res) => {
        const { token } = res.data
        saveAuthToken(token)
        const decodedToken = jwtDecode(token)
        setUser(decodedToken)
        setLoading(false)

        if (token) {
          // dispatch(getAddressesByToken())
          // dispatch(getProfileByToken())
          // dispatch(getFavourites())
          // dispatch(findCartByUserUidOrSessionId())
        }
        if (decodedToken?.role === 'SUPER_ADMIN' || decodedToken?.role === 'ADMIN' || decodedToken?.role === 'MANAGE') {
          navigate('/home')
        } else {
          navigate('/unauthorized')
        }
      },
      values: request,
      toast,
      setError: methods.setError,
      defaultValues: defaultValues,
      reset: methods.reset
    })
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SignUp />
      </form>
    </FormProvider>
  )
}

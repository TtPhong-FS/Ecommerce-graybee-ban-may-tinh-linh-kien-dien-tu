import { yupResolver } from '@hookform/resolvers/yup'

import { handleAsyncSubmit } from '@/lib'
import { saveAuthToken } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useAppContext, useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { LoaderCircle } from 'lucide-react'
import { AuthContext } from '../../components'
import { loginUserAsync } from '../../redux'
import { setRole } from '../../redux/authSlice'
import { Login } from './Login'
import { useValidationSchema } from './useValidationSchema'

export const LoginProvider = () => {
  const { dispatch, navigate } = useAppContext()

  const { t } = useCustomTranslate()
  const { isLoading, start, stop } = useLoading()

  const { setUser, setLoading } = useContext(AuthContext)
  const { schema } = useValidationSchema()
  const methods = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      email: '',
      password: ''
    },
    shouldUnregister: false
  })

  const onSubmit = methods.handleSubmit(async (values) => {
    start('submitting')
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(loginUserAsync(vals)).unwrap(),
      onSuccess: (res) => {
        const data = res.data
        saveAuthToken(data.auth.token)
        const decodedToken = jwtDecode(data.auth.token)
        dispatch(setRole(decodedToken.role))
        setUser(decodedToken)
        setLoading(false)

        navigate('/home')
      },
      values,
      toast,
      setError: methods.setError
    })
    stop('submitting')
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Login />
        <Button variant="secondary" type="submit" className="py-5 cursor-pointer w-full mt-6 text-base">
          {isLoading('submitting') ? <LoaderCircle size={26} className="animate-spin" /> : t('common:login')}
        </Button>
      </form>
    </FormProvider>
  )
}

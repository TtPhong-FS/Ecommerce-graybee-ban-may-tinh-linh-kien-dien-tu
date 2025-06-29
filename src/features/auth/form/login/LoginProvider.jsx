import { yupResolver } from '@hookform/resolvers/yup'

import { handleAsyncSubmit } from '@/lib'
import { saveAuthToken } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ErrorMessage } from '@/components/custom/ErrorMessage'
import { Button } from '@/components/ui/button'
import { setProfile } from '@/features/user/redux/userSlice'
import { useAppContext, useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { LoaderCircle } from 'lucide-react'
import { AuthContext } from '../../components'
import { loginUserAsync } from '../../redux'
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
        setUser(decodedToken)
        dispatch(setProfile(data?.profile))
        setLoading(false)

        navigate('/')
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
        <div className="flex items-center justify-center w-full">
          <h1 className="mb-8 text-center">{t('auth:login.title')}</h1>
        </div>
        {methods.formState.errors.root && <ErrorMessage error={methods.formState.errors.root} />}
        <Login />
        <Button variant="secondary" type="submit" className="py-5 cursor-pointer w-full mt-6 text-base">
          {isLoading('submitting') ? <LoaderCircle size={26} className="animate-spin" /> : t('auth:login.btnLogin')}
        </Button>
      </form>
    </FormProvider>
  )
}

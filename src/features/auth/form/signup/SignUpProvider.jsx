import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@/components/ui/button'
import { setProfile } from '@/features/user/redux/userSlice'
import { useAppContext, useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { handleAsyncSubmit } from '@/lib'
import { saveAuthToken } from '@/utils'
import { Spin } from 'antd'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthContext } from '../../components'
import { registerUserAsync } from '../../redux'
import { defaultValues } from './defaultValues'
import { SignUp } from './SignUp'
import { useValidationSchema } from './useValidationSchema'
export const SignUpProvider = () => {
  const { dispatch, navigate } = useAppContext()

  const { setUser, setLoading } = useContext(AuthContext)
  const { schema } = useValidationSchema()
  const { t } = useCustomTranslate()

  const { isLoading, start, stop } = useLoading()

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    shouldUnregister: false
  })

  const onSubmit = methods.handleSubmit(async (values) => {
    start('submiting')
    const formatted = `${values.birthday.year}-${String(values.birthday.month).padStart(2, '0')}-${String(
      values.birthday.day
    ).padStart(2, '0')}`
    const request = { ...values, birthday: formatted }

    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(registerUserAsync(vals)).unwrap(),
      onSuccess: (res) => {
        toast.success(res?.message)
        const data = res.data
        saveAuthToken(data.auth.token)
        const decodedToken = jwtDecode(data.auth.token)
        dispatch(setProfile(data?.profile))
        setUser(decodedToken)
        setLoading(false)

        if (data.auth.token) {
          // dispatch(getAddressesByToken())
          // dispatch(getProfileByToken())
          // dispatch(getFavourites())
          // dispatch(findCartByUserUidOrSessionId())
        }
        navigate('/home')
      },
      values: request,
      toast,
      setError: methods.setError
    })
    stop('submiting')
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Spin spinning={isLoading('submiting')}>
          <SignUp />
          <Button variant="secondary" type="submit" className="cursor-pointer h-[40px] w-full select-none">
            {t('auth:signup.btnRegister')}
          </Button>
          <div className="flex items-center text-sm justify-center mt-6 gap-1">
            <p>{t('auth:signup.alreadyAccount')}</p>
            <Link className="text-sm link" to="/login">
              {t('auth:signup.btnLogin')}
            </Link>
          </div>
        </Spin>
      </form>
    </FormProvider>
  )
}

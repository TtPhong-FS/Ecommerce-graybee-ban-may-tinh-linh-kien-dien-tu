import { RHFInputField } from '@/components/fields'
import { Button } from '@/components/ui/button'
import { patterns } from '@/constants'
import { useAppContext, useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { handleAsyncSubmit } from '@/lib'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import { CircleAlert, LoaderCircle, Mail } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from 'yup'
import { verifyEmailAsync } from '../redux'

export function VerifyEmail() {
  const { t } = useCustomTranslate()
  const { isLoading, start, stop } = useLoading()
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập Email')
      .max(100, 'Email quá dài')
      .matches(patterns.email, 'Email không hợp lệ')
  })
  const { navigate, dispatch } = useAppContext()
  const methods = useForm({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(schema),
    shouldUnregister: false
  })

  const onSubmit = methods.handleSubmit(async (values) => {
    start('submiting')
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(verifyEmailAsync(vals?.email)).unwrap(),
      onSuccess: (res) => {
        if (res?.status === 200) {
          toast.success(res?.message)
          Cookies.set('emailVerified', 'true')
          Cookies.set('email', values?.email)
          navigate('/forgot-password/verify-otp')
        }
      },
      values,
      setError: methods.setError,
      toast
    })
    stop('submiting')
  })

  return (
    <div className="">
      <Link className="link text-sm mb-4 block" to="/login">
        {t('common:back')}
      </Link>
      <h2 className="text-center mb-6">{t('auth:verifyEmail.title')}</h2>
      <FormProvider {...methods}>
        {methods.formState.errors.root && (
          <span className="error-message flex gap-1 mb-2 items-center">
            <CircleAlert size={16} />
            {methods.formState.errors.root.message}
          </span>
        )}
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <RHFInputField name="email" isRequired label="Email" type="text" placeholder="Email" />
          <Button
            disabled={isLoading('submiting')}
            variant="secondary"
            type="submit"
            className="h-[38px] cursor-pointer select-none relative"
          >
            {isLoading('submiting') ? (
              <span className="flex items-center">
                <LoaderCircle className="animate-spin mr-2" />
                {t('common:loading')}
              </span>
            ) : (
              <>
                <Mail />
                Gửi
              </>
            )}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

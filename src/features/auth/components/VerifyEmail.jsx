import { RHFInputField } from '@/components/fields'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { handleAsyncSubmit } from '@/lib'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import { Mail } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from 'yup'
import { verifyEmailAsync } from '../redux'
const schema = yup
  .object({
    email: yup
      .string()
      .required('Nhập địa chỉ email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Địa chỉ email không hợp lệ')
  })
  .required()

export function VerifyEmail() {
  const { t } = useCustomTranslate()
  const { navigate, dispatch } = useAppContext()
  const methods = useForm({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(schema),
    shouldUnregister: false
  })

  const onSubmit = methods.handleSubmit(async (values) => {
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(verifyEmailAsync(vals?.email)).unwrap(),
      onSuccess: (res) => {
        toast.success(res?.message)

        if (res?.status === 200) {
          Cookies.set('emailVerified', 'true')
          Cookies.set('email', values?.email)
          navigate('/forgot-password/verify-otp')
        }
      },
      values,
      setError: methods.setError,
      toast
    })
  })

  return (
    <div className="">
      <Link className="link text-sm mb-4 block" to="/login">
        {t('common:back')}
      </Link>
      <h2 className="text-center mb-6">{t('auth:form.verifyEmail')}</h2>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <RHFInputField name="email" label="Email" type="email" placeholder="Nhập địa chỉ email..." />
          <Button variant="secondary" type="submit" className="h-[38px] cursor-pointer select-none relative">
            <Mail />
            {t('common:send')}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

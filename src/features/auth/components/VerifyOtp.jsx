import { RHFInputOtp } from '@/components/fields'
import { Button } from '@/components/ui/button'
import { useAppContext, useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { handleAsync, handleAsyncSubmit } from '@/lib'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import { CircleAlert, LoaderCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from 'yup'
import { verifyEmailAsync, verifyOtpAsync } from '../redux'
const schema = yup
  .object({
    otp: yup
      .string()
      .required('Nhập mã OTP')
      .matches(/^\d{6}$/, 'OTP phải gồm 6 chữ số')
  })

  .required()
export function VerifyOtp() {
  const { t } = useCustomTranslate()

  const { navigate, dispatch } = useAppContext()

  const { isLoading, start, stop } = useLoading()

  const methods = useForm({
    defaultValues: {
      otp: ''
    },
    resolver: yupResolver(schema),
    shouldUnregister: false
  })

  const redirected = useRef(false)

  useEffect(() => {
    if (redirected.current) return
    const verified = Cookies.get('emailVerified')
    if (verified !== 'true') {
      redirected.current = true
      navigate('/forgot-password/verify-email')
    }
  }, [])

  const onSubmit = methods.handleSubmit(async (values) => {
    const email = Cookies.get('email')

    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(verifyOtpAsync({ otp: vals.otp, email: email })).unwrap(),
      onSuccess: (res) => {
        console.log(res)

        if (res?.status === 200) {
          toast.success(res?.message)
          Cookies.set('otpVerified', 'true')
          Cookies.set('otp', Number(values.otp))
          navigate('/forgot-password/reset-password')
        } else if (res?.status === 400) {
          methods.setError('root', {
            type: 'server',
            message: res?.message
          })
        }
      },
      values,
      setError: methods.setError,
      toast
    })
  })

  const onResendOtp = async () => {
    const email = Cookies.get('email')
    await handleAsync({
      asyncAction: (email) => dispatch(verifyEmailAsync(email)).unwrap(),
      onSuccess: (res) => {
        toast.success(res?.message)
      },
      loadingKey: 'resendOtp',
      startLoading: start,
      stopLoading: stop,
      toast,
      values: email
    })
  }
  return (
    <div>
      <Link className="link text-sm mb-4 block" to="/forgot-password/verify-email">
        {t('common:back')}
      </Link>
      <p className="text-base font-medium text-center mb-6">{t('auth:verifyOtp.title')}</p>
      <FormProvider {...methods}>
        {methods.formState.errors.root && (
          <span className="error-message px-10 flex gap-1 mb-2 items-center">
            <CircleAlert size={16} />
            {methods.formState.errors.root.message}
          </span>
        )}
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <div className="place-items-center">
            <RHFInputOtp name="otp" />
          </div>
          <div className="text-end px-12">
            <span className="text-blue-600 cursor-pointer " onClick={() => onResendOtp()}>
              {isLoading('resendOtp') ? <LoaderCircle size={20} className="animate-spin" /> : t('common:resend')}
            </span>
          </div>
          <Button variant="secondary" type="submit" className="cursor-pointer select-none h-[38px] w-full mt-3">
            {methods.formState.isSubmitting ? (
              <span className="flex items-center">
                <LoaderCircle className="animate-spin mr-2" />
                {t('common:loading')}
              </span>
            ) : (
              <>{t('auth:verifyOtp.btnConfirm')}</>
            )}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

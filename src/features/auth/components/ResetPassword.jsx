import { RHFInputField } from '@/components/fields'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/hooks'
import { handleAsyncSubmit } from '@/lib'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import { CircleAlert } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from 'yup'
import { resetPasswordAsync } from '../redux'
const schema = yup.object({
  password: yup.string().required('Nhập mật khẩu!').max(100, 'Mật khẩu quá dài!'),
  repeatPassword: yup.string().required('Nhập mật khẩu xác nhận!').max(100, 'Mật khẩu quá dài!')
})
export function ResetPassword() {
  const { navigate, dispatch } = useAppContext()

  useEffect(() => {
    const emailVerified = Cookies.get('emailVerified')
    const otpVerified = Cookies.get('otpVerified')

    if (emailVerified !== 'true') {
      navigate('/forgot-password/verify-email')
    } else if (otpVerified !== 'true') {
      navigate('/forgot-password/confirm-otp')
    }
  }, [])

  const methods = useForm({
    defaultValues: {
      password: '',
      repeatPassword: ''
    },
    resolver: yupResolver(schema),
    shouldUnregister: false
  })

  const onSubmit = methods.handleSubmit(async (values) => {
    const email = Cookies.get('email')
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(resetPasswordAsync({ email: email, request: vals })).unwrap(),
      onSuccess: (res) => {
        if (res?.status === 200) {
          toast.success(res?.message)
          Cookies.remove('emailVerified')
          Cookies.remove('otpVerified')
          Cookies.remove('email')
          Cookies.remove('otp')

          navigate('/login')
        }
      },
      values,
      setError: methods.setError,
      toast
    })
  })
  return (
    <div>
      <Link className="link text-sm mb-4 block" to="/forgot-password/verify-otp">
        Quay lại
      </Link>
      <h2 className="text-center">Đặt lại mật khẩu</h2>
      <FormProvider {...methods}>
        {methods.formState.errors.root && (
          <span className="error-message pt-2 flex gap-1 mt-3 items-center">
            <CircleAlert size={16} />
            {methods.formState.errors.root.message}
          </span>
        )}
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <RHFInputField name="password" label="Mật khẩu" type="password" placeholder="Nhập mật khẩu..." />
          <RHFInputField
            name="repeatPassword"
            label="Mật khẩu xác nhận"
            type="password"
            placeholder="Nhập mật khẩu xác nhận..."
          />
          <Button variant="secondary" type="submit" className="cursor-pointer select-none h-[38px] mt-4">
            Đặt lại
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

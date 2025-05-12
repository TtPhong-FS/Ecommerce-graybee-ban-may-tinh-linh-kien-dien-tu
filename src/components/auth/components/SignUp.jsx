import { format } from 'date-fns'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { handleAsyncSubmit } from '@/components/func'
import { Button } from '@/components/ui/button'
import useAppContext from '@/hooks/useAppContext'
import { saveAuthToken } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'
import { RHFDateTimePicker, RHFInputField, RHFRadioGroup } from '../../../components/fields'
import { handleSignUp } from '../features'
import { defaultValues } from '../types/signup'
import { AuthContext } from './AuthProvider'
export const SignUp = () => {
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting }
  } = useFormContext()

  const { dispatch, navigate } = useAppContext()

  const { setUser, setLoading } = React.useContext(AuthContext)

  const onSubmit = async (values) => {
    const formatDateOfBirth = format(values.dateOfBirth, 'MM/dd/yyyy')
    const request = { ...values, dateOfBirth: formatDateOfBirth }

    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(handleSignUp(vals)).unwrap(),
      onSuccess: (res) => {
        const { token } = res.data
        saveAuthToken(token)
        const decodedToken = jwtDecode(token)
        setUser(decodedToken)
        setLoading(false)
        if (decodedToken?.role === 'SUPER_ADMIN' || decodedToken?.role === 'ADMIN' || decodedToken?.role === 'MANAGE') {
          navigate('/home')
        } else {
          navigate('/unauthorized')
        }
      },
      values: request,
      toast,
      setError,
      defaultValues: defaultValues,
      reset
    })
  }
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <h1>Tạo tài khoản hoặc đăng nhập</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-10 mt-6">
          <RHFInputField label="Họ và tên" name="fullName" type="text" placeholder="Nhập họ và tên...(tuỳ chọn)" />
          <RHFInputField label="Số điện thoại" name="phoneNumber" type="text" placeholder="Nhập số điện thoại..." />
          <RHFInputField
            label="Địa chỉ Email (tuỳ chọn)"
            name="email"
            type="email"
            placeholder="Nhập Email...(tuỳ chọn)"
          />
          <RHFInputField label="Mật khẩu" name="password" type="password" placeholder="Nhập mật khẩu..." />
          <RHFRadioGroup
            label="Giới tính"
            name="gender"
            options={[
              {
                id: 1,
                value: 'MALE',
                label: 'Nam'
              },
              {
                id: 2,
                value: 'FEMALE',
                label: 'Nữ'
              }
            ]}
          />
          <RHFDateTimePicker label="Ngày sinh (tuỳ chọn)" name="dateOfBirth" />
        </div>
        <Button
          variant="secondary"
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer h-[40px] w-full text-base"
        >
          Tạo tài khoản
        </Button>
      </form>
      <div className="flex items-center justify-center mt-6 gap-1">
        <p>Bạn đã có tài khoản?</p>
        <Link className="text-blue-500 hover:underline decoration-solid" to="/login">
          Đăng nhập
        </Link>
      </div>
    </>
  )
}

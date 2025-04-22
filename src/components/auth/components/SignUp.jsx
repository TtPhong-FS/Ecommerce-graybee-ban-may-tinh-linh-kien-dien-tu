import { Button } from 'antd'
import { format } from 'date-fns'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { RHFDateTimePicker, RHFInputField, RHFRadioGroup } from '../../../components/fields'
import { useNotification } from '../../../hooks'
import { defaultValues } from '../types/signup'
import { AuthContext } from './AuthProvider'

export const SignUp = () => {
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting }
  } = useFormContext()

  const { handleSignUp } = React.useContext(AuthContext)
  const { contextHolder, openNotificationWithIcon } = useNotification()
  const onSubmit = async (values) => {
    const formatDateOfBirth = format(values.dateOfBirth, 'MM/dd/yyyy')
    const request = { ...values, dateOfBirth: formatDateOfBirth }

    try {
      await handleSignUp(request)
      reset(defaultValues)
    } catch (error) {
      if (error && typeof error === 'object') {
        Object.entries(error).forEach(([field, message]) => {
          setError(field, {
            type: 'server',
            message
          })
        })
        if (error.general) {
          openNotificationWithIcon('error', 'Thất bại', error.general)
        }
        if (error.unconnect) {
          openNotificationWithIcon('error', 'Lỗi kết nối', error.unconnect)
        }
      }
    }
  }
  return (
    <>
      {contextHolder}
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
          loading={isSubmitting}
          disabled={isSubmitting}
          style={{ height: '2.7rem', width: '100%', backgroundColor: '#dc2f2f' }}
          type="primary"
          htmlType="submit"
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

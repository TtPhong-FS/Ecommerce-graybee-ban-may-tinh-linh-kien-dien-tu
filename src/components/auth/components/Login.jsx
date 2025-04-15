import { Button } from 'antd'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { RHFInputField } from '../../../components/fields'
import { useNotification } from '../../../hooks'
import { defaultValues } from '../types/login'
import { AuthContext } from './AuthProvider'

export const Login = () => {
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting }
  } = useFormContext()

  const { handleLogin } = useContext(AuthContext)
  const { contextHolder, openNotificationWithIcon } = useNotification()
  const onSubmit = async (values) => {
    try {
      await handleLogin(values)
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
        <h1 className="title mb-2">Đăng nhập hoặc tạo tài khoản</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-10 mt-6">
          <RHFInputField label="Số điện thoại" name="username" placeholder="Nhập số điện thoại..." type="tel" />
          <RHFInputField label="Mật khẩu" name="password" placeholder="Nhập mật khẩu..." type="password" />
        </div>
        <Button
          loading={isSubmitting}
          disabled={isSubmitting}
          style={{ height: '2.7rem', width: '100%', placeContent: 'center' }}
          type="primary"
          htmlType="submit"
        >
          Đăng nhập
        </Button>
      </form>
      <div className="flex items-center justify-center mt-6 gap-1">
        <p>Bạn chưa có tài khoản?</p>
        <Link className="text-blue-500 hover:underline decoration-solid" to="/signup">
          Đăng ký
        </Link>
      </div>
    </>
  )
}

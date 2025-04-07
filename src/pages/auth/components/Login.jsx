import { Button } from 'antd'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../auth/AuthProvider'
import { RHFInputField } from '../../../components/fields'
import { defaultValues } from '../types/login'

export const Login = () => {
  const { handleSubmit, reset, setError } = useFormContext()

  const { handleLogin, loading } = useContext(AuthContext)

  const onSubmit = async (values) => {
    try {
      await handleLogin(values)
      reset(defaultValues)
    } catch (error) {
      const errorData = error.response.data
      if (errorData && typeof errorData === 'object') {
        Object.entries(errorData).forEach(([field, message]) => {
          setError(field, {
            type: 'server',
            message
          })
        })
      }
    }
  }
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <h1 className="title mb-2">Đăng nhập hoặc tạo tài khoản</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-10 mt-6">
          <RHFInputField label="Số điện thoại" name="username" />
          <RHFInputField label="Mật khẩu" name="password" />
        </div>
        <Button
          loading={loading}
          disabled={loading}
          style={{ height: '2.7rem', width: '100%' }}
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

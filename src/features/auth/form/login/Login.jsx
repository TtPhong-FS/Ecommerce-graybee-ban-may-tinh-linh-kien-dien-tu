
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { RHFInputField } from '@/components/fields'

export const Login = () => {

  
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <h1>Đăng nhập hoặc tạo tài khoản</h1>
      </div>
      <div>
        <div className="flex flex-col gap-4 mb-2 mt-6">
          <RHFInputField label="Số điện thoại" name="username" placeholder="Nhập số điện thoại..." type="tel" />
          <RHFInputField  label="Mật khẩu" name="password" placeholder="Nhập mật khẩu..." type="password" />
        </div>
        <div className="flex justify-end mb-8">
          <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline decoration-solid">
            Quên mật khẩu?
          </Link>
        </div>
        <Button
          variant="secondary"
        
          type="submit"
          className="cursor-pointer h-[40px]  w-full text-sm"
        >
          Đăng nhập
        </Button>
      </div>
      <div className="flex items-center justify-center mt-6 gap-1">
        <p className="text-sm">Bạn chưa có tài khoản?</p>
        <Link className="text-blue-500 hover:underline text-sm decoration-solid" to="/signup">
          Đăng ký
        </Link>
      </div>
    </>
  )
}

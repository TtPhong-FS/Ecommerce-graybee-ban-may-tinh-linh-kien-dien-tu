import { Link } from 'react-router-dom'

import { RHFDateTimePicker, RHFInputField, RHFRadioGroup } from '@/components/fields'
import { Button } from '@/components/ui/button'
import PropTypes from 'prop-types'
export const SignUp = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <h1>Tạo tài khoản hoặc đăng nhập</h1>
      </div>

      <div className="flex flex-col gap-4 mb-10 mt-6">
        <RHFInputField label="Họ và tên" name="fullName" type="text" placeholder="Nhập họ và tên (tuỳ chọn)" />
        <RHFInputField label="Số điện thoại" name="phoneNumber" type="text" placeholder="Nhập số điện thoại" />
        <RHFInputField label="Mật khẩu" name="password" type="password" placeholder="Nhập mật khẩu" />
        <RHFInputField label="Địa chỉ Email (tuỳ chọn)" name="email" type="email" placeholder="Nhập Email (tuỳ chọn)" />
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
        <RHFDateTimePicker label="Chọn ngày sinh (tuỳ chọn)" name="dateOfBirth" />
      </div>
      <Button variant="secondary" type="submit" className="cursor-pointer h-[40px] w-full select-none">
        Tạo tài khoản
      </Button>

      <div className="flex items-center text-sm justify-center mt-6 gap-1">
        <p>Bạn đã có tài khoản?</p>
        <Link className="text-sm link" to="/login">
          Đăng nhập
        </Link>
      </div>
    </>
  )
}

SignUp.propTypes = {
  onSubmit: PropTypes.func
}

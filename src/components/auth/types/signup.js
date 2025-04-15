import * as yup from 'yup'
import { todayMinus18 } from '../../../constants'
export const Schema = yup.object({
  fullName: yup.string().max(100, 'Tên quá dài').nullable().notRequired(),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Vui lòng nhập số điện thoại')
    .min(10, 'Số điện thoại phải từ 10 đến 12 số')
    .max(12, 'Số điện thoại phải từ 10 đến 12 số')
    .required('Vui lòng nhập số điện thoại'),
  email: yup.string().max(100, 'Địa chỉ Email quá dài').nullable().notRequired(),
  dateOfBirth: yup
    .date()
    .typeError('Vui lòng chọn ngày sinh hợp lệ')
    .max(todayMinus18, 'Bạn phải từ 18 tuổi trở lên')
    .nullable()
    .notRequired(),
  password: yup.string().max(100, 'Mật khẩu quá dài').required('Vui lòng nhập mật khẩu')
})

export const defaultValues = {
  fullName: '',
  phoneNumber: '',
  email: '',
  dateOfBirth: '',
  password: '',
  gender: ''
}

import { patterns } from '@/constants'
import * as yup from 'yup'
export const schema = yup.object().shape({
  username: yup
    .string()
    .matches(patterns.phoneNumber, 'Vui lòng nhập số điện thoại')
    .min(10, 'Số điện thoại phải từ 10 đến 12 số')
    .max(12, 'Số điện thoại phải từ 10 đến 12 số')
    .required('Vui lòng nhập số điện thoại'),
  password: yup.string().required('Vui lòng nhập mật khẩu')
})

export const defaultValues = {
  username: '',
  password: ''
}

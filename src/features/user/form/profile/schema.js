import { patterns } from '@/constants'
import * as yup from 'yup'
export const Schema = yup.object({
  fullName: yup.string().max(100, 'Tên quá dài').nullable().notRequired(),
  email: yup.string().max(50, 'Email quá dài').matches(patterns.email, 'Email không xác định').nullable().notRequired(),
  dateOfBirth: yup.date(),
  gender: yup
    .string()
    .max(6, 'Vui lòng chọn MALE hoặc FEMALE')
    .matches(/^(male|female)$/i)
})

export const defaultValues = {
  fullName: '',
  email: '',
  gender: '',
  dateOfBirth: ''
}

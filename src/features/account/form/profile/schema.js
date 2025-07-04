import * as yup from 'yup'
export const Schema = yup.object({
  fullName: yup.string().max(100, 'Tên quá dài').nullable().notRequired(),
  gender: yup
    .string()
    .required('Vui lòng chọn giới tính')
    .matches(/^(MALE|FEMALE|ORTHER)$/i),
  birthday: yup.object({
    day: yup.number().nullable().required('Vui lòng chọn ngày sinh'),
    month: yup.number().nullable().required('Vui lòng chọn tháng sinh'),
    year: yup.number().nullable().required('Vui lòng chọn năm sinh')
  })
})

export const defaultValues = {
  fullName: '',
  phone: '',
  avatarUrl: '',
  gender: '',
  birthday: {
    day: null,
    month: null,
    year: null
  }
}

import * as yup from 'yup'
export const Schema = yup.object({
  username: yup.string().required('Vui lòng nhập thông tin đăng nhập'),
  password: yup.string().required('Vui lòng nhập mật khẩu')
})

export const defaultValues = {
  username: '',
  password: ''
}

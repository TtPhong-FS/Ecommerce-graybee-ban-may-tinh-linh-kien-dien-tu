import * as yup from 'yup'
export const Schema = yup.object({
  phone: yup.string().required('Nhập số điện thoại người nhận'),
  recipientName: yup.string().required('Nhập họ và tên người nhận'),
  city: yup
    .string()
    .required('Chọn thành phố/tỉnh')
    .transform((value, originValue) => (originValue === '' ? null : value)),
  district: yup.string().required('Chọn huyện/quận'),
  commune: yup.string().required('Chọn xã/phường'),
  street: yup.string().required('Nhập địa chỉ cụ thể'),
  default: yup.bool().default()
})

export const defaultValues = {
  phone: '',
  recipientName: '',
  city: null,
  district: null,
  commune: null,
  street: '',
  default: false
}

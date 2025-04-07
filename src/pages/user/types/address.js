import * as yup from 'yup'
export const Schema = yup.object({
  phoneNumber: yup.string().required('Nhập số điện thoại người nhận'),
  fullname: yup.string().required('Nhập họ và tên người nhận'),
  city: yup.string().required('Chọn thành phố/tỉnh'),
  district: yup.string().required('Chọn huyện/quận'),
  commune: yup.string().required('Chọn xã/phường'),
  streetAddress: yup.string().required('Nhập địa chỉ cụ thể'),
  default: yup.bool().default()
})

export const defaultValues = {
  phoneNumber: '',
  fullname: '',
  city: '',
  district: '',
  commune: '',
  streetAddress: '',
  default: false
}

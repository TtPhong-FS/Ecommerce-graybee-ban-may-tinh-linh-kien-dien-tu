import * as yup from 'yup'
import { patterns } from '../../../constants'

export const Schema = yup.object().shape({
  deliveryType: yup.string().required('Chọn hình thức nhận hàng'),
  paymentMethod: yup.string().required('Chọn hình thức thanh toán'),
  phoneNumber: yup
    .string()
    .matches(patterns.phoneNumber, 'Vui lòng nhập số điện thoại')
    .required('Nhập số điện thoại người nhận'),
  fullName: yup.string().required('Nhập họ và tên người nhận'),
  email: yup
    .string()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .nullable()
    .notRequired(),
  note: yup
    .string()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .nullable()
    .notRequired(),
  city: yup
    .string()
    .required('Chọn thành phố/tỉnh')
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  district: yup
    .string()
    .required('Chọn huyện/quận')
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  commune: yup
    .string()
    .required('Chọn xã/phường')
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  streetAddress: yup.string().required('Điền địa chỉ cụ thể'),
  discountCode: yup
    .string()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .nullable()
    .notRequired()
})

export const defaultValues = {
  cartItemIds: [],
  useExistingAddress: false,
  addressId: null,
  deliveryType: 'HOME DELIVERY',
  shippingMethod: 'STANDARD SHIPPING',
  phoneNumber: '',
  fullName: '',
  email: null,
  note: null,
  discountCode: null,
  paymentMethod: 'COD',
  city: null,
  district: null,
  commune: null,
  streetAddress: ''
}

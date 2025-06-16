import * as yup from 'yup'
import { patterns } from '../../../constants'

export const Schema = yup.object().shape({
  paymentMethod: yup.string().required('Chọn hình thức thanh toán'),
  customerInfo: yup.object({
    recipientName: yup.string().required('Nhập họ và tên người nhận'),
    recipientPhone: yup
      .string()
      .matches(patterns.phoneNumber, 'Vui lòng nhập số điện thoại')
      .required('Nhập số điện thoại người nhận')
  }),
  shippingInfo: yup.object({
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
    deliveryType: yup.string().required('Vui lòng chọn hình thức nhận hàng'),
    deliveryMethod: yup.string().required('Vui lòng chọn phương thức giao hàng')
  })
})

export const defaultValues = {
  cartItemIds: [],
  addressId: null,
  paymentMethod: 'COD',
  customerInfo: {
    recipientName: '',
    recipientPhone: '',
    email: '',
    note: ''
  },
  shippingInfo: {
    city: null,
    district: null,
    commune: null,
    streetAddress: '',
    deliveryType: 'HOME_DELIVERY',
    deliveryMethod: 'STANDARD'
  }
}

import * as yup from 'yup'

export const Schema = yup.object().shape({
  deliveryType: yup.string().required('Chọn hình thức nhận hàng'),
  paymentMethod: yup.string().required('Chọn hình thức thanh toán'),
  phoneNumber: yup.string().required('Nhập số điện thoại người nhận'),
  fullName: yup.string().required('Nhập họ và tên người nhận'),
  shippingAddress: yup.object({
    city: yup.string().required('Chọn thành phố/tỉnh'),
    district: yup.string().required('Chọn huyện/quận'),
    commune: yup.string().required('Chọn xã/phường'),
    streetAddress: yup.string().required('Điền địa chỉ cụ thể')
  })
})

export const defaultValues = {
  cartItems: [],
  deliveryType: 'HOME DELIVERY',
  phoneNumber: '',
  fullName: '',
  email: '',
  note: '',
  paymentMethod: 'COD',
  shippingAddress: {
    city: '',
    district: '',
    commune: '',
    streetAddress: ''
  }
}

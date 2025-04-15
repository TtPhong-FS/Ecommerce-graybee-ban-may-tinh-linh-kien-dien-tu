export const orderHistories = {
  orderId: 1,
  orderDate: '30/03/2025',
  totalAmount: 45000000,
  status: 'COMPLETED',
  totalQuantity: 3,
  deliveryType: 'HOME_DELIVERY',
  paymentMethod: 'COD',
  paymentStatus: 'COMPLETED',
  shippingFax: 0,
  customerInfo: {
    fullName: 'Trần Thanh Phong',
    phoneNumber: '0393150468',
    address: ' Xóm Đoàn Kết, Thôn Xâm Động, Xã Vân Tảo, Huyện Thường Tín, Hà Nội'
  },
  orderDetails: [
    {
      orderDetailId: 1,
      productId: 1,
      productName: 'Laptop Lenovo Gaming Ipad 3 16500CH',
      thumbnail:
        'https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/2023_11_15_638356440814939456_usb-31-128gb-lexar-dd.jpg',
      priceAtTime: 15000000,
      quantity: 2,
      subTotal: 30000000
    },
    {
      orderDetailId: 2,
      productId: 1,
      productName: 'Laptop Lenovo Gaming Ipad 3 16500CH',
      thumbnail:
        'https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/2023_11_15_638356440814939456_usb-31-128gb-lexar-dd.jpg',
      priceAtTime: 15000000,
      quantity: 1,
      subTotal: 15000000
    }
  ]
}

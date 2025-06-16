import { createSelector } from '@reduxjs/toolkit'

export const selectCustomerInfo = createSelector(
  (state) => state.order.customerForm,
  (customerForm) => {
    const { recipientName, phone, email } = customerForm || {}
    return { recipientName, phone, email }
  }
)

export const selectShippingInfo = createSelector(
  (state) => state.order.customerForm,
  (customerForm) => {
    const { city, district, commune, streetAddress } = customerForm || {}
    return { city, district, commune, streetAddress }
  }
)

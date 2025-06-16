import { RHFInputField } from '@/components/fields'
import { Grid2 } from '@mui/material'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectCustomerInfo } from '../redux/orderSelector'
import { AddressExistingSelector } from './AddressExistingSelector'

export function CustomerInfo() {
  const { setValue } = useFormContext()

  const customerInfo = useSelector(selectCustomerInfo)

  useEffect(() => {
    if (customerInfo) {
      setValue('customerInfo.recipientName', customerInfo.recipientName)
      setValue('customerInfo.recipientPhone', customerInfo.phone)
      setValue('customerInfo.email', customerInfo.email)
    }
  }, [customerInfo, setValue])

  return (
    <>
      <Grid2 sx={{ bgcolor: 'white', padding: '1rem', borderRadius: '0.7rem' }} size={12}>
        <h2 className="mb-4 sub-title">Người đặt hàng</h2>
        <div className="flex flex-col gap-3">
          <RHFInputField name="customerInfo.recipientName" label="Họ và tên" type="text" placeholder="Nhập họ và tên" />
          <RHFInputField
            name="customerInfo.recipientPhone"
            label="Số điện thoại"
            type="text"
            placeholder="Nhập số điện thoại"
          />
          <RHFInputField name="customerInfo.email" label="Email (Không bắt buộc)" type="text" />
        </div>
      </Grid2>
      <AddressExistingSelector />
    </>
  )
}

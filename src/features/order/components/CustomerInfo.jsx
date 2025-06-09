import { RHFInputField } from '@/components/fields'
import { Grid2 } from '@mui/material'
import { useFormContext, useWatch } from 'react-hook-form'
import { AddressExistingSelector } from './AddressExistingSelector'

export function CustomerInfo() {
  const { control } = useFormContext()

  const useExistingAddress = useWatch({ control, name: 'useExistingAddress' })

  return (
    <>
      <Grid2 sx={{ bgcolor: 'white', padding: '1rem', borderRadius: '0.7rem' }} size={12}>
        <h2 className="mb-4 sub-title">Người đặt hàng</h2>
        <div className="flex flex-col gap-3">
          <RHFInputField
            disabled={useExistingAddress}
            name="fullName"
            label="Họ và tên"
            type="text"
            placeholder="Nhập họ và tên..."
          />
          <RHFInputField
            disabled={useExistingAddress}
            name="phoneNumber"
            label="Số điện thoại"
            type="text"
            placeholder="Nhập số điện thoại..."
          />
          <RHFInputField name="email" label="Email (Không bắt buộc)" type="text" />
        </div>
      </Grid2>
      <AddressExistingSelector />
    </>
  )
}

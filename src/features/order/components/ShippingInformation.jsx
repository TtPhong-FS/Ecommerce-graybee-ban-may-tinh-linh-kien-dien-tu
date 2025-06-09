import { RHFInputField, RHFRadioGroup, RHFTextArea } from '@/components/fields'
import { Grid2 } from '@mui/material'
import { useFormContext, useWatch } from 'react-hook-form'
import { AddressSelector } from './AddressSelector'

export function ShippingInformation() {
  const { control } = useFormContext()
  const useExistingAddress = useWatch({ control, name: 'useExistingAddress' })

  const deliveryType = useWatch({ control, name: 'deliveryType' })

  return (
    <>
      <Grid2
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{ bgcolor: 'white', padding: '1rem', borderRadius: '0.7rem' }}
        size={12}
      >
        <div>
          <h2 className="mb-2 sub-title">Hình thức nhận hàng</h2>
          <RHFRadioGroup
            name="deliveryType"
            options={[
              {
                value: 'HOME_DELIVERY',
                label: 'Giao hàng tận nhà'
              },
              {
                value: 'STORE_PICKUP',
                label: 'Nhận tại cửa hàng'
              }
            ]}
          />
        </div>
        {deliveryType === 'HOME_DELIVERY' && (
          <div>
            <h2 className="mb-2 sub-title">Phương thức giao hàng</h2>
            <RHFRadioGroup
              name="shippingMethod"
              options={[
                {
                  value: 'STANDARD_SHIPPING',
                  label: 'Tiêu chuẩn'
                },
                {
                  value: 'ECONOMY_SHIPPING',
                  label: 'Tiết kiệm'
                },
                {
                  value: 'FAST_DELIVERY',
                  label: 'Nhanh'
                }
              ]}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h2 className="sub-title">Địa chỉ nhận hàng</h2>
          <div className="flex flex-col gap-3">
            <AddressSelector />
            <RHFInputField
              disabled={useExistingAddress}
              name="streetAddress"
              label="Địa chỉ cụ thể"
              type="text"
              placeholder="Ví dụ: Số nhà 65 xóm..."
            />
            <RHFTextArea
              name="note"
              label="Ghi chú"
              placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị giao hàng)"
            />
          </div>
        </div>
      </Grid2>
    </>
  )
}

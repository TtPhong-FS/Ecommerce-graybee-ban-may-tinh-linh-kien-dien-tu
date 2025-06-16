import { RHFInputField, RHFRadioGroup, RHFTextArea } from '@/components/fields'
import { Grid2 } from '@mui/material'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectShippingInfo } from '../redux/orderSelector'
import { AddressSelector } from './AddressSelector'

export function ShippingInformation() {
  const { control, setValue } = useFormContext()

  const deliveryType = useWatch({ control, name: 'shippingInfo.deliveryType' })
  const shippingInfo = useSelector(selectShippingInfo)

  useEffect(() => {
    if (shippingInfo) {
      setValue('shippingInfo.city', shippingInfo.city)
      setValue('shippingInfo.district', shippingInfo.district)
      setValue('shippingInfo.commune', shippingInfo.commune)
      setValue('shippingInfo.streetAddress', shippingInfo.streetAddress)
    }
  }, [shippingInfo, setValue])

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
            name="shippingInfo.deliveryType"
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
              name="shippingInfo.deliveryMethod"
              options={[
                {
                  value: 'STANDARD',
                  label: 'Tiêu chuẩn'
                },
                {
                  value: 'ECONOMY',
                  label: 'Tiết kiệm'
                },
                {
                  value: 'FAST',
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
              name="shippingInfo.streetAddress"
              label="Địa chỉ cụ thể"
              type="text"
              placeholder="Ví dụ: Số nhà 65 xóm..."
            />
            <RHFTextArea
              name="customerInfo.note"
              label="Ghi chú"
              placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị giao hàng)"
            />
          </div>
        </div>
      </Grid2>
    </>
  )
}

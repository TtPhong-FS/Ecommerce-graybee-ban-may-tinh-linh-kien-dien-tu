import { getAllAddressAsync } from '@/features/user'
import { useAppContext } from '@/hooks'
import { Select } from 'antd'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

export function AddressExistingSelector() {
  const { dispatch } = useAppContext()

  const deliveryAddress = useSelector((state) => state.account?.deliveryAddress)

  const [selectedId, setSelectedId] = useState(null)

  const { setValue } = useFormContext()

  const handleDropdownVisibleChange = (open) => {
    if (open && (!deliveryAddress || deliveryAddress?.length === 0)) {
      dispatch(getAllAddressAsync())
    }
  }

  const handleSelect = (value) => {
    setSelectedId(value)
    const selectedAddress = deliveryAddress?.find((addr) => addr.id === value)

    if (selectedAddress) {
      setValue('addressId', selectedAddress.id)
      setValue('customerInfo.recipientName', selectedAddress.fullName)
      setValue('customerInfo.recipientPhone', selectedAddress.phoneNumber)
      setValue('shippingInfo.city', selectedAddress.city)
      setValue('shippingInfo.district', selectedAddress.district)
      setValue('shippingInfo.streetAddress', selectedAddress.streetAddress)
      setValue('shippingInfo.commune', selectedAddress.commune)
    }
  }

  return (
    <div className="card flex flex-col gap-2">
      <label>Chọn địa chỉ có sẵn</label>
      <Select
        showSearch
        onOpenChange={handleDropdownVisibleChange}
        value={selectedId}
        placeholder="Chọn địa chỉ"
        style={{ width: '100%', height: '38px' }}
        onChange={handleSelect}
      >
        {deliveryAddress?.map((addr) => (
          <Select.Option key={addr.id} value={addr.id}>
            {addr.fullName} - {addr.phoneNumber} - {addr.streetAddress}...
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}

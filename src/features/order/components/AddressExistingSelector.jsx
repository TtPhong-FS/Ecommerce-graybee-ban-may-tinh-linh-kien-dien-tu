import { RHFCheckBox } from '@/components/fields'
import { fetchAddressesByTokenAsync } from '@/features/user'
import { useAppContext } from '@/hooks'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useSelector } from 'react-redux'

export function AddressExistingSelector() {
  const { dispatch } = useAppContext()

  const deliveryAddress = useSelector((state) => state.account?.deliveryAddress)

  const [selectedId, setSelectedId] = useState(null)

  const { control, setValue, clearErrors } = useFormContext()

  const useExistingAddress = useWatch({ control, name: 'useExistingAddress' })

  const handleDropdownVisibleChange = (open) => {
    if (open && (!deliveryAddress || deliveryAddress?.length === 0)) {
      dispatch(fetchAddressesByTokenAsync())
    }
  }

  const handleSelect = (value) => {
    setSelectedId(value)
    const selectedAddress = deliveryAddress?.find((addr) => addr.id === value)

    if (selectedAddress) {
      setValue('addressId', selectedAddress.id)
      setValue('fullName', selectedAddress.fullName)
      setValue('phoneNumber', selectedAddress.phoneNumber)
      setValue('city', selectedAddress.city)
      setValue('district', selectedAddress.district)
      setValue('streetAddress', selectedAddress.streetAddress)
      setValue('commune', selectedAddress.commune)
    }
  }

  useEffect(() => {
    if (!useExistingAddress) {
      clearErrors()

      setSelectedId(null)
      setValue('addressId', null)
    }
    return () => {}
  }, [useExistingAddress])

  return (
    <div className="box flex flex-col gap-2">
      <RHFCheckBox label={useExistingAddress ? 'Bỏ dùng địa chỉ' : 'Dùng địa chỉ đã có'} name="useExistingAddress" />

      {useExistingAddress && (
        <>
          <label>Chọn địa chỉ</label>
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
        </>
      )}
    </div>
  )
}

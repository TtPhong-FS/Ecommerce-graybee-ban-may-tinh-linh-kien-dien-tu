import { Select } from 'antd'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddressExistingByTokenOrSessionId } from '../../../components/address/features/slice'
import { RHFCheckBox } from '../../../components/fields'

export function AddressExistingSelector() {
  const dispatch = useDispatch()

  const addressExisting = useSelector((state) => state.address?.addressExisting)

  const [selectedId, setSelectedId] = useState(null)

  const { control, setValue, clearErrors } = useFormContext()

  const useExistingAddress = useWatch({ control, name: 'useExistingAddress' })

  const handleDropdownVisibleChange = (open) => {
    if (open && (!addressExisting || addressExisting?.length === 0)) {
      dispatch(fetchAddressExistingByTokenOrSessionId())
    }
  }

  const handleSelect = (value) => {
    setSelectedId(value)
    const selectedAddress = addressExisting?.find((addr) => addr.id === value)

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
            onDropdownVisibleChange={handleDropdownVisibleChange}
            value={selectedId}
            placeholder="Chọn địa chỉ"
            style={{ width: '100%', height: '3rem' }}
            onChange={handleSelect}
          >
            {addressExisting?.map((addr) => (
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

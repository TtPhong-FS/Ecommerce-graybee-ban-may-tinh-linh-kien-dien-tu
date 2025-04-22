import { FormControl } from '@mui/material'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { citiesOption, districtsOption } from '../../../components/options'
import { communes } from '../../../components/options/communes'

export const AddressSelector = () => {
  const { control } = useFormContext()
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  const watchCity = useWatch({ control, name: 'city' })
  const watchDistrict = useWatch({ control, name: 'district' })
  const useExistingAddress = useWatch({ control, name: 'useExistingAddress' })

  useEffect(() => {
    if (watchCity) setSelectedCity(watchCity)
    if (watchDistrict) setSelectedDistrict(watchDistrict)
  }, [watchCity, watchDistrict])

  const handleCityChange = (value) => {
    setSelectedCity(value)
    setSelectedDistrict(null)
  }

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value)
  }
  return (
    <div className="flex flex-col gap-4 w-full">
      <Controller
        control={control}
        name="city"
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <Select
              placeholder="Chọn Tỉnh/Thành phố"
              value={field.value}
              disabled={useExistingAddress}
              style={{ width: '100%', height: '3rem' }}
              showSearch
              options={citiesOption}
              onChange={(value) => {
                field.onChange(value)
                handleCityChange(value)
              }}
            />
            {error && <span className="error-message">{error.message}</span>}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="district"
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <Select
              disabled={useExistingAddress}
              value={field.value}
              style={{ width: '100%', height: '3rem' }}
              placeholder="Chọn Huyện/Quận"
              showSearch
              onChange={(value) => {
                field.onChange(value)
                handleDistrictChange(value)
              }}
            >
              {districtsOption[selectedCity?.toLowerCase()]?.map((district) => (
                <Select.Option key={district.id} value={district.value}>
                  {district.label}
                </Select.Option>
              ))}
            </Select>
            {error && <span className="error-message">{error.message}</span>}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="commune"
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <Select
              disabled={useExistingAddress}
              value={field.value}
              style={{ width: '100%', height: '3rem' }}
              placeholder="Chọn Xã/Phường"
              onChange={(value) => field.onChange(value)}
              showSearch
            >
              {communes[selectedDistrict?.toLowerCase()]?.map((commune) => (
                <Select.Option key={commune.id} value={commune.value}>
                  {commune.label}
                </Select.Option>
              ))}
            </Select>
            {error && <span className="error-message">{error.message}</span>}
          </FormControl>
        )}
      />
    </div>
  )
}

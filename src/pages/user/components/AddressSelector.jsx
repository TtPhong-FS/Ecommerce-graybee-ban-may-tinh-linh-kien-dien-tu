import { FormControl, FormHelperText } from '@mui/material'
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

  useEffect(() => {
    if (watchCity) setSelectedCity(watchCity)
    if (watchDistrict) setSelectedDistrict(watchDistrict)
  }, [watchCity, watchDistrict])

  console.log('city: ', selectedCity)
  console.log('distrcit: ', selectedDistrict)

  const handleCityChange = (value) => {
    setSelectedCity(value)
    setSelectedDistrict(null)
  }

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value)
  }
  return (
    <>
      <Controller
        control={control}
        name="city"
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <Select
              style={{ width: '100%', height: '3rem' }}
              {...field}
              value={field.value}
              placeholder="Vui lòng chọn Tỉnh/Thành Phố"
              label="Chọn Tỉnh/Thành Phố"
              showSearch={true}
              options={citiesOption}
              onChange={(value) => {
                field.onChange(value)
                handleCityChange(value)
              }}
            />
            {error && <FormHelperText sx={{ marginLeft: '0.6rem' }}>{error?.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="district"
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <Select
              style={{ width: '100%', height: '3rem' }}
              {...field}
              value={field.value}
              placeholder="Vui lòng chọn Quận/Huyện"
              label={'Chọn Quận/Huyện'}
              showSearch={true}
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
            {error && <FormHelperText sx={{ marginLeft: '0.6rem' }}>{error?.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="commune"
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <Select
              style={{ width: '100%', height: '3rem' }}
              {...field}
              onChange={(value) => {
                field.onChange(value)
              }}
              value={field.value}
              placeholder="Vui lòng chọn Phường/Xã"
              label={'Chọn Phường/Xã'}
              showSearch={true}
            >
              {communes[selectedDistrict?.toLowerCase()]?.map((commune) => (
                <Select.Option key={commune.id} value={commune.value}>
                  {commune.label}
                </Select.Option>
              ))}
            </Select>
            {error && <FormHelperText sx={{ marginLeft: '0.6rem' }}>{error?.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </>
  )
}

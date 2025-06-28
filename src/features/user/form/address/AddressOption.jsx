import { citiesOption, communes, districtsOption } from '@/components/options'
import { Select } from 'antd'
import { CircleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

export const AddressOption = () => {
  const { control } = useFormContext()
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  const watchCity = useWatch({ control, name: 'city' })
  const watchDistrict = useWatch({ control, name: 'district' })

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
    <div className="flex flex-col gap-2 w-full">
      <Controller
        control={control}
        name="city"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col">
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              placeholder="Chọn Tỉnh/Thành phố"
              value={field.value}
              className="custom-select"
              style={{
                minHeight: '40px',
                width: '100%'
              }}
              showSearch
              options={citiesOption}
              onChange={(value) => {
                field.onChange(value)
                handleCityChange(value)
              }}
            />
            {error && (
              <span className="error-message flex gap-1 items-center">
                <CircleAlert size={16} /> {error.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="district"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col">
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              value={field.value}
              className="custom-select"
              style={{
                minHeight: '40px',
                width: '100%'
              }}
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
            {error && (
              <span className="error-message flex gap-1 items-center">
                <CircleAlert size={16} /> {error.message}
              </span>
            )}
          </div>
        )}
      />
      <Controller
        control={control}
        name="commune"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col">
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              className="custom-select"
              style={{
                minHeight: '40px',
                width: '100%'
              }}
              value={field.value}
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
            {error && (
              <span className="error-message flex gap-1 items-center">
                <CircleAlert size={16} /> {error.message}
              </span>
            )}
          </div>
        )}
      />
    </div>
  )
}

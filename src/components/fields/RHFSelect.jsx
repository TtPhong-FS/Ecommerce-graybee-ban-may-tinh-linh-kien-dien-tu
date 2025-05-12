import { FormControl } from '@mui/material'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'

export const RHFSelect = ({ name, label, options, showSearch, disabled, mode }) => {
  const { control } = useFormContext()
  console.log('render')
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <label className="title-form">{label}</label>
          <Select
            {...field}
            mode={mode}
            disabled={disabled}
            showSearch={showSearch}
            allowClear
            style={{ width: '100%', height: '38px' }}
            placeholder="Vui lòng chọn"
            options={options}
          />
          {error && <span className="error-message">{error?.message}</span>}
        </FormControl>
      )}
    />
  )
}

RHFSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  mode: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  showSearch: PropTypes.bool
}

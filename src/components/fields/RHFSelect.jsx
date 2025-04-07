import { FormControl, FormHelperText, FormLabel } from '@mui/material'
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
          <FormLabel style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{label}</FormLabel>
          <Select
            {...field}
            mode={mode}
            disabled={disabled}
            showSearch={showSearch}
            allowClear
            style={{ width: '100%', height: '3rem' }}
            placeholder="Vui lòng chọn"
            value={field.value}
            options={options}
            onChange={(value) => field.onChange(value)}
          />
          {error && <FormHelperText sx={{ marginLeft: '0.6rem' }}>{error?.message}</FormHelperText>}
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

import { FormControl } from '@mui/material'
import PropTypes from 'prop-types'

import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'

export const RHFInputField = ({ name, label, type, placeholder, disabled }) => {
  const { control } = useFormContext()
  console.log('render')
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <label className="title-form text-sm">{label}</label>
          <Input className="h-[40px]" {...field} disabled={disabled} type={type} placeholder={placeholder} />
          {error && <span className="error-message text-sm">{error.message}</span>}
        </FormControl>
      )}
    />
  )
}

RHFInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}

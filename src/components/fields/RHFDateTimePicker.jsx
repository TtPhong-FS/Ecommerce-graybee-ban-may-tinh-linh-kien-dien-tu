import { FormControl } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'

export const RHFDateTimePicker = ({ label, name }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} fullWidth>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              sx={{ height: '40px' }}
              {...field}
              value={field.value ? new Date(field.value) : null}
              label={label}
              onChange={(value) => field.onChange(value)}
            />
            {error && <span className="error-message">{error.message}</span>}
          </LocalizationProvider>
        </FormControl>
      )}
    />
  )
}

RHFDateTimePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

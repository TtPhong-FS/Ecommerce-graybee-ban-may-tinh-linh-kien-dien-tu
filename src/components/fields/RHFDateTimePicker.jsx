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
      render={({ field }) => (
        <LocalizationProvider {...field} dateAdapter={AdapterDateFns}>
          <DatePicker value={field.value} label={label} onChange={(value) => field.onChange(value)} />
        </LocalizationProvider>
      )}
    />
  )
}

RHFDateTimePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

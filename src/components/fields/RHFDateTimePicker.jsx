import { FormControl } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { CircleAlert } from 'lucide-react'

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
              slotProps={{
                textField: {
                  variant: 'outlined',
                  fullWidth: true,
                  sx: {
                    '& .MuiInputBase-root': {
                      height: '40px',
                      alignItems: 'center',
                      fontSize: '12.8px',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-input)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-transparent)'
                    },
                    // label nằm giữa khi chưa focus
                    '& .MuiInputLabel-root': {
                      top: '50%',
                      transform: 'translate(14px, -50%) scale(1)',
                      transformOrigin: 'top left',
                      fontSize: '12.8px'
                    },
                    // label khi shrink (focus hoặc có giá trị)
                    '& .MuiInputLabel-shrink': {
                      transform: 'translate(12px, -25px) scale(0.85)',
                      color: 'var(--secondary)'
                    },
                    // bo viền
                    '& .MuiOutlinedInput-notchedOutline': {}
                  }
                }
              }}
              {...field}
              value={field.value ? new Date(field.value) : null}
              label={label}
              onChange={(value) => field.onChange(value)}
            />
            {error && (
              <span className="error-message flex gap-1 items-center">
                <CircleAlert size={16} /> {error.message}
              </span>
            )}
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

import { Checkbox, FormControlLabel } from '@mui/material'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'

export function RHFCheckBox({ name, label }) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox checked={field.value || false} onChange={(e) => field.onChange(e.target.checked)} />}
          label={label}
        />
      )}
    />
  )
}

RHFCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}

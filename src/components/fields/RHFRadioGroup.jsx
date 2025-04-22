import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

import { Controller, useFormContext } from 'react-hook-form'

export const RHFRadioGroup = ({ name, options, label }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <label className="title-form">{label}</label>
          <RadioGroup row>
            {options?.map((option) => (
              <FormControlLabel
                value={option.value}
                control={<Radio checked={option.value === field.value} />}
                label={option.label}
                key={option.id}
              />
            ))}
          </RadioGroup>
          {error && <span className="error-message">{error.message}</span>}
        </FormControl>
      )}
    />
  )
}

RHFRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  label: PropTypes.string
}

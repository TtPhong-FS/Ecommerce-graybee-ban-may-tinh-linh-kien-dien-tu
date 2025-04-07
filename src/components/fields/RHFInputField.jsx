import { FormControl, FormHelperText, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export const RHFInputField = ({ name, label, type, disabled }) => {
  const { control } = useFormContext()
  console.log('render')
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <TextField
            sx={{
              height: '3rem',
              backgroundColor: 'white',
              border: 'none',
              '& .MuiInputBase-root': {
                border: '1px solid',
                borderColor: '#E0E3E7',

                backgroundColor: 'white',
                height: '3rem',
                '&:hover': {
                  borderColor: '#4096ff'
                },
                '&.Mui-focused': {
                  borderColor: '#4096ff'
                }
              },
              '& .MuiInputLabel-root': {
                fontSize: '1rem',
                color: '#606470',
                top: '-4px'
              },
              '& .MuiInputLabel-shrink': {
                color: '#606470',
                top: '0',
                fontSize: '1.2rem'
              }
            }}
            label={label}
            {...field}
            disabled={disabled}
            type={type}
            fullWidth
            error={!!error}
          />
          {error && <FormHelperText sx={{ marginLeft: '0.6rem' }}>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

RHFInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
}

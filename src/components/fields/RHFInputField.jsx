import { alpha, FormControl, FormHelperText, FormLabel, InputBase, styled } from '@mui/material'
import PropTypes from 'prop-types'

import { Controller, useFormContext } from 'react-hook-form'

const StyledTextField = styled((props) => <InputBase {...props} />)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(0)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.custom.main,
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 14,
    width: '100%',

    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.custom.border, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.custom.border
    },
    '&:hover': {
      boxShadow: `${alpha(theme.palette.custom.border, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.custom.border
    },
    '&:disabled': {
      backgroundColor: theme.palette.custom.secondary,
      cursor: 'not-allowed',
      boxShadow: 'none',
      borderColor: '#E0E3E7'
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843'
    })
  }
}))
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
          <FormLabel sx={{ marginBottom: '0.5rem', fontSize: '1rem' }}>{label}</FormLabel>
          <StyledTextField
            label={label}
            {...field}
            disabled={disabled}
            type={type}
            fullWidth
            error={!!error}
            placeholder={placeholder}
          />
          {error && (
            <FormHelperText sx={{ marginLeft: '0.3rem', fontSize: '0.875rem' }}>{error.message}</FormHelperText>
          )}
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

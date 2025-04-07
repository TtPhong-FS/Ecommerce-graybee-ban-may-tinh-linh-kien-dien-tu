import { FormControl } from '@mui/material'
import TextArea from 'antd/es/input/TextArea'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export const RHFTextArea = ({ name, placeholder }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth>
          <TextArea
            style={{ fontSize: '0.875rem' }}
            {...field}
            placeholder={placeholder}
            autoSize={{ minRows: 5, maxRows: 7 }}
          />
        </FormControl>
      )}
    />
  )
}

RHFTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
}

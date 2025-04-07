import { Switch } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

import { Controller, useFormContext } from 'react-hook-form'

export const RHFSwitch = React.memo(({ name }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Switch style={{ backgroundColor: field.value ? '#dc2f2f' : '' }} {...field} checked={field.value || false} />
      )}
    />
  )
})

RHFSwitch.propTypes = {
  name: PropTypes.string.isRequired
}

RHFSwitch.displayName = 'RHFSwitch'

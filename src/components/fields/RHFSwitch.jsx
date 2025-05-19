import PropTypes from 'prop-types'

import { Controller } from 'react-hook-form'
import { Switch } from '../ui/switch'

export function RHFSwitch({ control, name }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Switch onCheckedChange={field.onChange} checked={field.value || false} />}
    />
  )
}

RHFSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object
}

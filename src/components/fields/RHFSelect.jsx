import '@/styles/antd.css'
import { Select } from 'antd'
import { CircleAlert } from 'lucide-react'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { Label } from '../ui/label'
export function RHFSelect({ name, label, isRequired, options, showSearch, disabled, mode, ...props }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col">
          <Label className="title-form" htmlFor={name}>
            {label} {isRequired && '*'}
          </Label>
          <Select
            className={`custom-select ${error && 'ant-select-status-error'}`}
            style={{
              minHeight: '40px'
            }}
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
            {...field}
            mode={mode}
            {...props}
            disabled={disabled}
            showSearch={showSearch}
            allowClear
            options={options}
          />
          {error && (
            <span className="error-message flex gap-1 items-center">
              <CircleAlert size={16} /> {error.message}
            </span>
          )}
        </div>
      )}
    />
  )
}

RHFSelect.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object,
  label: PropTypes.string,
  mode: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  showSearch: PropTypes.bool,
  isRequired: PropTypes.bool
}

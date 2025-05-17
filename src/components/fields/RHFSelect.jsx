import { Select } from 'antd'
import { CircleAlert } from 'lucide-react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

export const RHFSelect = ({ control, name, label, options, showSearch, disabled, mode }) => {
  console.log('render')
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col">
          <label className="title-form">{label}</label>
          <Select
            className={`custom-select ${error && 'ant-select-status-error'}`}
            style={{
              minHeight: '40px'
            }}
            {...field}
            mode={mode}
            disabled={disabled}
            showSearch={showSearch}
            allowClear
            placeholder="Vui lòng chọn"
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
  showSearch: PropTypes.bool
}

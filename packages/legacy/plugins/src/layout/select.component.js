import React from 'react'
import { InputSelect } from '@clubmed/components'

export function Select (props) {
  let { allowedValues, multiple, allowEmptyValue, value, disabled, className, onChange } = props

  if (value && value.toJS) {
    value = value.toJS()
  }
  //
  // value = value || this.state.value

  const options =
    allowedValues.map((item, key) => {
      return { key, value: String(item), label: String(item) }
    })

  if (allowEmptyValue && !multiple) {
    options.unshift({ label: '--', value: '' })
  }

  if (multiple) {
    className += ' overflow-scroll bg-white border-1 border-gray-light p-1 rounded-small'
  }
  const style = multiple ? {
    maxWidth: '340px',
    maxHeight: '170px'
  } : {
    maxWidth: '340px'
  }

  return <InputSelect
    style={style}
    value={value}
    onChange={(name, value) => {
      onChange && onChange(value)
    }}
    className={className}
    isDisabled={disabled}
    isMultiple={multiple}
    options={options}/>
}

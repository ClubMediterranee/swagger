import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import { SelectUniqValues } from './select-uniq-values.component'

export function wrapJsonSchemaString (base, system) {
  const { fieldsPersistence } = system.getConfigs()
  return class JsonSchema_string extends Component {
    onChange = (e) => {
      const value = this.props.schema['type'] === 'file' ? e.target.files[0] : e.target.value
      this.props.onChange(value, this.props.keyName)
    }
    onEnumChange = (val) => this.props.onChange(val)

    render () {
      let { getComponent, name, value, schema, errors, required, description, disabled } = this.props
      let enumValue = schema['enum']

      errors = errors.toJS ? errors.toJS() : []

      if (enumValue) {
        const Select = getComponent('Select')
        return (<Select
          className={errors.length ? 'invalid' : ''}
          title={errors.length ? errors : ''}
          allowedValues={enumValue}
          value={value}
          allowEmptyValue={!required}
          disabled={disabled}
          onChange={this.onEnumChange}/>)
      }

      const isDisabled = disabled || (schema['in'] === 'formData' && !('FormData' in window))
      const Input = getComponent('Input')
      if (schema['type'] === 'file') {
        return (<Input
          type="file"
          className={errors.length ? 'invalid' : ''}
          title={errors.length ? errors : ''}
          onChange={this.onChange}
          disabled={isDisabled}/>)
      }

      if (fieldsPersistence.includes(name)) {
        return <SelectUniqValues
          type={'text'}
          isInvalid={!!errors.length}
          title={errors.length ? errors : ''}
          value={value}
          name={name}
          minLength={0}
          debounceTimeout={350}
          placeholder={description}
          onChange={(name, value) => this.onChange({ target: { value } })}
          disabled={isDisabled}/>
      }

      return (<DebounceInput
        type={schema.format === 'password' ? 'password' : 'text'}
        className={errors.length ? 'invalid' : ''}
        title={errors.length ? errors : ''}
        value={value}
        name={name}
        minLength={0}
        debounceTimeout={350}
        placeholder={description}
        onChange={this.onChange}
        disabled={isDisabled}/>)
    }
  }
}

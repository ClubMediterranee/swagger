import { InputText } from '@clubmed/components'
import { ReactComponent as GM45 } from '@clubmed/components/src/statics/svg/45.svg'
import { ReactComponent as KEYS } from '@clubmed/components/src/statics/svg/keys.svg'
import { ReactComponent as PADLOCK } from '@clubmed/components/src/statics/svg/padlock.svg'
import { ReactComponent as PADUNLOCK } from '@clubmed/components/src/statics/svg/padunlock.svg'
import React, { Component } from 'react'
import { decodeToken } from '../auth/utils/decode-token'
import { SelectUniqValues } from './select-uniq-values.component'

const iconFields = {
  'api_key': KEYS,
  'customer_id': GM45,
  'authorization.ok': PADLOCK,
  'authorization.ko': PADUNLOCK
}

function TokenInfo ({ value }) {
  const token = decodeToken(value)

  if (!token) {
    return ''
  }

  return <div>
    <strong className={'font-bold'}>Scopes:</strong> {token.scope}
  </div>
}

function createTargetFn (onChange) {
  return (name, value) => onChange({ target: { value } })
}

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
          iconLeft={iconFields[name]}
          isInvalid={!!errors.length}
          title={errors.length ? errors : ''}
          value={value}
          name={name}
          minLength={0}
          debounceTimeout={350}
          placeholder={description}
          onChange={createTargetFn(this.onChange.bind(this))}
          disabled={isDisabled}/>
      }

      if (name === 'authorization') {
        return <InputText
          style={{ 'width': '100%', maxWidth: '340px' }}
          isDisabled={isDisabled}
          value={value}
          iconLeft={iconFields[`${name}.${decodeToken(value) ? 'ok' : 'ko'}`]}
          placeholder={description}
          name={name}
          debounceTimeout={350}
          notes={<TokenInfo value={value}/>}
          onChange={createTargetFn(this.onChange.bind(this))}/>
      }

      return <InputText
        style={{ 'width': '100%', maxWidth: '340px' }}
        isDisabled={isDisabled}
        value={value}
        type={schema.format === 'password' ? 'password' : 'text'}
        iconLeft={iconFields[name]}
        placeholder={description}
        validationState={errors.length ? 'IS_INVALID' : 'NOT_VALIDATED'}
        name={name}
        minLength={0}
        debounceTimeout={350}
        title={errors.length ? errors : ''}
        onChange={createTargetFn(this.onChange.bind(this))}/>
    }
  }
}

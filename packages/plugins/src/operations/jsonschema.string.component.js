import { InputText } from '@clubmed/components'
import { ReactComponent as GM45 } from '@clubmed/components/src/statics/svg/45.svg'
import { ReactComponent as DATE } from '@clubmed/components/src/statics/svg/date.svg'
import { ReactComponent as DETAILS } from '@clubmed/components/src/statics/svg/details.svg'
import { ReactComponent as NOTEBOOK } from '@clubmed/components/src/statics/svg/document.svg'
import { ReactComponent as DURATION } from '@clubmed/components/src/statics/svg/duration.svg'
import { ReactComponent as KEYS } from '@clubmed/components/src/statics/svg/keys.svg'
import { ReactComponent as PADLOCK } from '@clubmed/components/src/statics/svg/padlock.svg'
import { ReactComponent as PADUNLOCK } from '@clubmed/components/src/statics/svg/padunlock.svg'
import { ReactComponent as TRANSPORT } from '@clubmed/components/src/statics/svg/transport.svg'
import { ReactComponent as TRIDENT } from '@clubmed/components/src/statics/svg/trident1.svg'
import { ReactComponent as USERS } from '@clubmed/components/src/statics/svg/users.svg'
import React, { Component } from 'react'
import { decodeToken } from '../auth/utils/decode-token'
import { SelectLocales } from './select-locales.component'
import { SelectUniqValues } from './select-uniq-values.component'

const iconFields = {
  'api_key': KEYS,
  'customer_id': GM45,
  'authorization.ok': PADLOCK,
  'authorization.ko': PADUNLOCK,
  'first_date': DATE,
  'last_date': DATE,
  'duration': DURATION,
  'number_of_adults': USERS,
  'product_id': TRIDENT,
  'departure_option_id': TRANSPORT,
  'proposal_id': DETAILS,
  'booking_id': NOTEBOOK
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
      const value = this.props.schema.get('type') === 'file' ? e.target.files[0] : e.target.value
      this.props.onChange(value, this.props.keyName)
    }
    onEnumChange = (val) => this.props.onChange(val)

    render () {
      let { getComponent, name, value, schema, errors, required, description, disabled } = this.props
      schema = schema && schema.toJS()
      let enumValue = schema['enum']

      errors = errors.toJS ? errors.toJS() : []

      const isDisabled = disabled || (schema['in'] === 'formData' && !('FormData' in window))

      const options = {
        style: { 'width': '100%', maxWidth: '340px' },
        isDisabled,
        value,
        type: schema.format === 'password' ? 'password' : 'text',
        iconLeft: iconFields[name],
        placeholder: description,
        validationState: errors.length ? 'IS_INVALID' : 'NOT_VALIDATED',
        name,
        minLength: 0,
        debounceTimeout: 350,
        title: errors.length ? errors : '',
        onChange: createTargetFn(this.onChange.bind(this))
      }

      if (enumValue) {
        if (name === 'accept-language') {
          return <SelectLocales {...options} options={enumValue} isRequired={required}/>
        }

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
          {...options}
          isInvalid={!!errors.length}/>
      }

      if (name === 'authorization') {
        return <InputText
          {...options}
          iconLeft={iconFields[`${name}.${decodeToken(value) ? 'ok' : 'ko'}`]}
          notes={<TokenInfo value={value}/>}/>
      }

      return <InputText {...options}/>
    }
  }
}

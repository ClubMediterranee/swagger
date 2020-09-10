import { getRandomComponentId } from '@clubmed/components'
import React from 'react'

export function wrapJsonSchemaForm (BaseJsonSchemaForm) {
  return class JsonSchemaForm extends BaseJsonSchemaForm {
    render () {
      let { schema, errors, value, description, onChange, getComponent, fn, disabled } = this.props
      const name = (description || getRandomComponentId()).split(' - ')[0].trim()

      if (schema.toJS) {
        schema = schema.toJS()
      }

      let { type, format = '' } = schema

      let Comp = (format ? getComponent(`JsonSchema_${type}_${format}`) : getComponent(`JsonSchema_${type}`)) || getComponent('JsonSchema_string')
      return <Comp
        {...this.props} name={name} errors={errors} fn={fn} getComponent={getComponent}
        value={value}
        onChange={onChange} schema={schema} disabled={disabled}/>
    }
  }
}

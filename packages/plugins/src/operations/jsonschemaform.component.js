import { getRandomComponentId } from '@clubmed/components'
import React from 'react'

export function wrapJsonSchemaForm (BaseJsonSchemaForm) {
  return class JsonSchemaForm extends BaseJsonSchemaForm {
    render () {
      const { schema, errors, value, onChange, description, getComponent, fn, disabled } = this.props
      const format = schema && schema.get ? schema.get('format') : null
      const type = schema && schema.get ? schema.get('type') : null

      // NOTE: Extract name from description
      const name = (description || getRandomComponentId()).split(' - ')[0].trim()

      const getComponentSilently = (name) => getComponent(name, false, { failSilently: true })
      let Comp = type ? format
        ? getComponentSilently(`JsonSchema_${type}_${format}`)
        : getComponentSilently(`JsonSchema_${type}`)
        : getComponent('JsonSchema_string')

      if (!Comp) {
        Comp = getComponent('JsonSchema_string')
      }

      return <Comp {...this.props} name={name} errors={errors} fn={fn} getComponent={getComponent} value={value}
        onChange={onChange} schema={schema} disabled={disabled}/>
    }
  }
}

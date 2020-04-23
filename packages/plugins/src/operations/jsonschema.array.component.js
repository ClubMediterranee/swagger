import React from 'react'
import { List } from 'immutable'

function valueOrEmptyList (value) {
  return List.isList(value) ? value : List()
}

export function wrapJsonSchemaArray (BaseJsonSchemaArray) {
  return class JsonSchemaArray extends BaseJsonSchemaArray {
    onItemChange = (itemVal, i) => {
      this.onChange(this.state.value.set(i, itemVal))
    }

    removeItem = (i) => {
      this.onChange(this.state.value.remove(i))
    }

    addItem = () => {
      let value = valueOrEmptyList(this.state.value)
      value = value.push('')
      this.onChange(value)
    }

    onChange = (value) => {
      this.setState({ value })
      this.props.onChange(value)
    }

    render () {
      let { getComponent, required, schema, errors, fn, disabled } = this.props

      if (schema.enum && schema.items) {
        schema = {
          ...schema,
          items: {
            ...schema.items,
            enum: schema.enum
          }
        }
        schema.items.enum = schema.enum
      }

      errors = errors.toJS ? errors.toJS() : []

      let itemSchema = fn.inferSchema(schema.items)

      let enumValue = itemSchema['enum']
      let value = this.state.value

      if (enumValue) {
        const Select = getComponent('Select')
        return (<Select
          className={errors.length ? 'invalid' : ''}
          title={errors.length ? errors : ''}
          multiple={true}
          value={value}
          disabled={disabled}
          allowedValues={enumValue}
          allowEmptyValue={!required}
          onChange={this.onChange}/>)
      }
      return super.render()
    }
  }
}

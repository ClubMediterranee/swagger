import { List } from 'immutable'
import React from 'react'

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

    renderEnum () {
      let { getComponent, required, schema, errors, disabled } = this.props
      const value = this.state.value // expect Im List
      const enumItems = schema.getIn(['enum'])

      const Select = getComponent('Select')

      return (<Select
        className={errors.length ? 'invalid' : ''}
        title={errors.length ? errors : ''}
        multiple={true}
        value={value}
        disabled={disabled}
        allowedValues={enumItems.toJSON()}
        allowEmptyValue={!required}
        onChange={(value) => this.onChange(value)}/>)
    }

    render () {
      let { schema } = this.props

      const enumItems = schema.getIn(['enum'])

      if (enumItems) {
        return this.renderEnum()
      }

      return super.render()
    }
  }
}

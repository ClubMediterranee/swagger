import React from 'react'
import { Switch } from '@reswagger/components'

export default function ToggleContainer ({ operationsActions }) {
  const onChange = (name, value) => {
    operationsActions.updateDeprecatedFilter(value)
  }

  return <Switch
    label='deprecated'
    onChange={onChange}
  />
}

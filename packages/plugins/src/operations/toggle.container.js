import React from 'react'
import { Switch } from '@clubmed/components'

export default function ToggleContainer ({ operationsActions }) {
  const onChange = (name, value) => {
    operationsActions.updateDeprecatedFilter(value)
  }

  return <Switch
    label='deprecated'
    onChange={onChange}
  />
}

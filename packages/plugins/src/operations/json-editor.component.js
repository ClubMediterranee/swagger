import { getRandomComponentId } from '@clubmed/components'
import React, { useState } from 'react'
import JSONInput from 'react-json-editor-ajrm/es'
import locale from 'react-json-editor-ajrm/locale/en'

// revert
const themes = {
  background: 'rgb(51, 51, 51)',
  string: 'rgb(162, 252, 162)',
  number: 'rgb(211, 99, 99)',
  primitive: 'rgb(252, 194, 140)'
}

const styles = { body: { fontSize: '12px' } }

function parse (value) {
  try {
    return typeof value === 'string' ? JSON.parse(value) : value
  } catch (er) {
  }
  return undefined
}

export default function JsonEditorComponent ({ onChange, value }) {
  const [localValue] = useState(parse(value))

  return <div className="mt-1 p-1 rounded-small" style={{ background: 'rgb(51, 51, 51)' }}>
    <JSONInput
      locale={locale}
      id={getRandomComponentId()}
      onChange={(evt) => {
        onChange({ target: { value: evt.json } })
      }}
      className={'rounded-small'}
      colors={themes}
      style={styles}
      height='392px'
      width='100%'
      placeholder={localValue}/></div>
}

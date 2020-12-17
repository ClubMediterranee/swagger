import { callLast } from '@clubmed/components'
import ace from 'brace'
import 'brace/mode/json'
import 'brace/theme/dracula'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import React from 'react'

function parse (value) {
  try {
    return typeof value === 'string' ? JSON.parse(value) : value
  } catch (er) {
  }
  return undefined
}

export default function JsonEditorComponent ({ onChange, value }) {
  return <div className={'p-1'}>
    <Editor
      value={parse(value)}
      mode={'code'}
      ace={ace}
      theme={'ace/theme/dracula'}
      onChange={(value) => {
        callLast(() => {
          onChange({ target: { value: JSON.stringify(value) } })
        }, 300)
      }}
      statusBar={false}/>
  </div>
}

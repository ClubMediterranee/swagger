import { callLast, getRandomComponentId } from '@clubmed/components'
import ace from 'brace'
import 'brace/mode/json'
import 'brace/theme/dracula'
import { JsonEditor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import isEqual from 'lodash/isEqual'
import React from 'react'

function parse (value) {
  try {
    return typeof value === 'string' ? JSON.parse(value) : value
  } catch (er) {
  }
  return {}
}

class Editor extends JsonEditor {
  componentDidUpdate (props) {
    super.componentDidUpdate(props)

    if (this.jsonEditor) {
      this.jsonEditor.set(this.props.value)
    }
  }

  shouldComponentUpdate ({ htmlElementProps, value }) {
    try {
      if (!isEqual(value, this.jsonEditor.get())) {
        return true
      }
    } catch (er) {
    }

    return htmlElementProps !== this.props.htmlElementProps
  }

  render () {
    const {
      htmlElementProps,
      tag
    } = this.props

    return React.createElement(
      tag,
      {
        ...htmlElementProps,
        className: 'w-full h-full mt-1',
        ref: this.setRef
      }
    )
  }
}

export default function JsonEditorComponent ({ onChange, value, ...props }) {
  const localChange = callLast((value) => {
    if (value) {
      onChange({ target: { value: JSON.stringify(value) } })
    }
  }, 300)

  return <Editor
    {...props}
    name={getRandomComponentId()}
    value={parse(value)}
    mode={'code'}
    ace={ace}
    search={false}
    theme={'ace/theme/dracula'}
    onChange={(value) => {
      localChange(value)
    }}
    statusBar={false}/>
}

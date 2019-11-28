import React from 'react'
import NativeSwaggerUI from 'swagger-ui'

export default function SwaggerUI (props) {
  const ui = NativeSwaggerUI(props)

  const Cmp = ui.getComponent('App', 'root')

  return <Cmp/>
}

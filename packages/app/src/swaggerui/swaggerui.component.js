import React from 'react'
import NativeSwaggerUI from 'swagger-ui'

export default function SwaggerUI ({ url, presets, plugins, layout }) {
  const ui = NativeSwaggerUI({
    url,
    presets,
    plugins,
    layout
  })

  const Cmp = ui.getComponent('App', 'root')

  return <Cmp/>
}

import React, { useState } from 'react'

async function createSwaggerUI (config) {
  const Plugins = await import(/* webpackChunkName: "plugins" */'@clubmed/plugins')
  const { default: NativeSwaggerUI } = await import(/* webpackChunkName: "swagger-ui" */ 'swagger-ui')

  const PLUGINS = { ...NativeSwaggerUI.plugins, ...Plugins }
  const PRESETS = { ...NativeSwaggerUI.presets }

  config.plugins = config.plugins.map((plugin) => PLUGINS[plugin]).filter(Boolean)
  config.presets = config.presets.map((preset) => PRESETS[preset]).filter(Boolean)
  console.log('config.plugins', config.plugins)
  const ui = new NativeSwaggerUI(config)
  // console.log(ui.getComponent('App', 'root'))
  const Cmp = ui.getComponent('App', 'root')

  return <div><Cmp/></div>
}

export default function SwaggerUI ({ config }) {
  const [Cmp, setCmp] = useState(null)

  React.useEffect(() => {
    createSwaggerUI(config).then((Cmp) => {
      setCmp(Cmp)
    })
  }, [config, setCmp])

  if (!Cmp) {
    return null
  }

  return <React.Fragment>{Cmp}</React.Fragment>
}

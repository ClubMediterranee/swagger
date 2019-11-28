import React from 'react'
import 'swagger-ui/dist/swagger-ui.css'
import SwaggerUI from './swaggerui/swaggerui.component'
import NativeSwaggerUI from 'swagger-ui'
import { StandaloneLayoutPlugin } from './layout'
import { TopbarPlugin } from './topbar'

function App () {
  const config = {
    url: 'https://api.clubmed.com/doc/swagger.json',
    presets: [
      NativeSwaggerUI.presets.apis
    ],
    plugins: [
      TopbarPlugin,
      StandaloneLayoutPlugin,
      NativeSwaggerUI.plugins.DownloadUrl
    ],
    layout: 'StandaloneLayout'
  }

  return (
    <div className="App">
      <SwaggerUI {...config}/>
    </div>
  )
}

export default App

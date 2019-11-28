import React from 'react'
import {
  AuthorizeBtnPlugin,
  OperationsPlugin,
  SidebarPlugin,
  StandaloneLayoutPlugin,
  TopbarPlugin
} from '@reswagger/plugins'
import 'swagger-ui/dist/swagger-ui.css'
import SwaggerUI from './swaggerui/swaggerui.component'
import NativeSwaggerUI from 'swagger-ui'

function App () {
  const config = {
    brandName: 'ClubMed',
    appName: 'API',
    url: 'https://api.clubmed.com/doc/swagger.json',
    filter: true,
    presets: [
      NativeSwaggerUI.presets.apis
    ],
    plugins: [
      SidebarPlugin,
      TopbarPlugin,
      AuthorizeBtnPlugin,
      StandaloneLayoutPlugin,
      OperationsPlugin,
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

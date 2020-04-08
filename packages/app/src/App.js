import React from 'react'
import {
  AuthorizeBtnPlugin,
  OperationsPlugin,
  SidebarPlugin,
  StandaloneLayoutPlugin,
  TopbarPlugin,
  OAuth2Plugin,
  HighlightPlugin
} from '@clubmed/plugins'
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
      OAuth2Plugin,
      HighlightPlugin,
      NativeSwaggerUI.plugins.DownloadUrl
    ],
    layout: 'StandaloneLayout',
    deepLinking: true
  }

  return (
    <div className="App">
      <SwaggerUI {...config}/>
    </div>
  )
}

export default App

import React from 'react'
import SwaggerUI from './components/SwaggerUI'

function getConfig () {
  let config = window.SwaggerUIConfiguration || {}

  config = {
    brandName: 'ClubMed',
    appName: 'API',
    url: 'https://api.clubmed.com/doc/swagger.json',
    deepLinking: true,
    filter: true,
    defaultModelsExpandDepth: false,
    docExpansion: 'list',
    ...(config || {}),
    presets: config.presets || [
      'apis'
    ],
    plugins: config.plugins || [
      'SidebarPlugin',
      'TopbarPlugin',
      'AuthorizeBtnPlugin',
      'StandaloneLayoutPlugin',
      'OperationsPlugin',
      'OAuth2Plugin',
      'HighlightPlugin',
      'FooterPlugin',
      'DownloadUrl'
    ]
  }

  return config
}

function App () {
  const config = getConfig()
  return (
    <div className="App">
      <SwaggerUI {...config}/>
    </div>
  )
}

export default App

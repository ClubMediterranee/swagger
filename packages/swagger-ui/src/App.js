import React from 'react'
import SwaggerUI from './components/SwaggerUI'

function getConfig () {
  let config = window.SwaggerUIConfiguration || {}

  config = {
    brandName: 'ClubMed',
    appName: 'API',
    url: 'https://api.integ.clubmed.com/doc/swagger.json',
    oauth2RedirectUrl: `${window.location.origin}/doc/o2c.html`,
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

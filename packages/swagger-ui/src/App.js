import React from 'react'
import SwaggerUI from './components/SwaggerUI'

function getConfig () {
  const config = window.SwaggerUIConfiguration || {}

  return {
    brandName: 'ClubMed',
    appName: 'API',
    url: 'https://api.clubmed.com/doc/swagger.json',
    layout: 'StandaloneLayout',
    deepLinking: true,
    filter: true,
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
      'DownloadUrl'
    ]
  }
}

function App () {
  const config = React.useMemo(() => getConfig(), [])

  return (
    <div className="App">
      <SwaggerUI config={config}/>
    </div>
  )
}

export default App

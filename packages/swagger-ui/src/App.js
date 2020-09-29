import React from 'react'
import SwaggerUI from './components/SwaggerUI'

function getConfig () {
  let config = window.SwaggerUIConfiguration || {}

  config = {
    brandName: 'ClubMed',
    appName: 'API',
    disableBrowserCache: false,
    url: 'https://api.integ.clubmed.com/doc/swagger.json',
    oauth2RedirectUrl: `${window.location.origin}/doc/o2c.html`,
    deepLinking: true,
    filter: true,
    defaultModelsExpandDepth: false,
    docExpansion: 'list',
    fieldsPersistence: [
      'api_key'
    ],
    tagsSwitches: [
      { label: 'Deprecated', value: 'deprecated' },
      { label: 'Admin', value: 'admin' }
    ],
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

  if (config.appName.toLowerCase() === 'api' || config.disableBrowserCache) {
    config.requestInterceptor = (request) => {
      if (!request.url.endsWith('swagger.json')) {
        request.url += `${request.url.includes('?') ? '&' : '?'}timestamp=${Date.now()}`
      }

      return request
    }
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

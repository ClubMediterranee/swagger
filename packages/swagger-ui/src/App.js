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
    fieldsPersistence: [
      'api_key'
    ],
    tagsSwitches: [
      { label: 'Deprecated', value: 'deprecated' },
      { label: 'Admin', value: 'admin' }
    ],
    requestInterceptor (request) {
      if (!request.url.endsWith('swagger.json')) {
        request.url += `&timestamp=${Date.now()}`
      }

      return request
    },
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

  // TODO remove this code when API has correctly configured his swagger
  if (config.appName === 'API' && !config.tagsSwitches.find(o => o.label === 'Admin')) {
    config.tagsSwitches.push({ label: 'Admin', value: 'hidden' })
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

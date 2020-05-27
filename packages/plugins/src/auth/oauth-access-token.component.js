import React from 'react'

export function OauthAccessToken ({ value }) {
  const payload = JSON.stringify(JSON.parse(atob(value.split('.')[1])), null, 2)
  return <div className={'border-1 border-gray-light rounded-small mt-2 mb-4'}>
    <div className={'border-b-1 border-gray-light py-1 px-2 font-bold text-blue'}>
      Payload
    </div>
    <div className={'rounded-b-small'} style={{ 'background': '#414141' }}>
      <pre className={'overflow-auto p-1 example hljs json'}><code>{payload}</code></pre>
    </div>
  </div>
}

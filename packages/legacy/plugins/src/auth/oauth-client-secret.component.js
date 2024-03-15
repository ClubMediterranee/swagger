import React from 'react'
import { withIf } from '@clubmed/components'

export function OAuthClientSecret ({ className = '', getComponent, id, isAuthorized, value, onChange }) {
  const Row = getComponent('Row')
  const InitializedInput = getComponent('InitializedInput')
  id = `client_secret-${id}`

  return <Row className={'mb-2 ' + className}>
    <label htmlFor={id}>client_secret:</label>
    {
      isAuthorized ? <code> ****** </code>
        : <div>
          <InitializedInput
            id={id}
            value={value}
            type="text"
            data-name="clientSecret"
            className={'w-full'}
            onChange={onChange}/>
        </div>
    }
  </Row>
}

export const IfOAuthClientSecret = withIf(OAuthClientSecret)

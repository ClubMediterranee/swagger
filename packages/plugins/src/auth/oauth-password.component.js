import React from 'react'
import { withIf } from '@clubmed/components'

export function OAuthPassword ({ getComponent, appName, isAuthorized, username, passwordType, onChange }) {
  const Row = getComponent('Row')
  const Col = getComponent('Col')
  const id = (id) => `${id}-${appName}`

  return <Row className={'mb-2'}>
    <Row>
      <label htmlFor={id('oauth_username')}>username:</label>
      {
        isAuthorized ? <code> {username} </code>
          : <Col tablet={10} desktop={10}>
            <input id={id('oauth_username')} type="text" data-name="username" onChange={onChange}/>
          </Col>
      }
    </Row>
    {

    }
    <Row>
      <label htmlFor={id('oauth_password')}>password:</label>
      {
        isAuthorized ? <code> ****** </code>
          : <Col tablet={10} desktop={10}>
            <input
              id={id('oauth_password')}
              type="password"
              data-name="password"
              onChange={onChange}/>
          </Col>
      }
    </Row>
    <Row>
      <label htmlFor={id('password_type')}>Client credentials location:</label>
      {
        isAuthorized ? <code> {passwordType} </code>
          : <Col tablet={10} desktop={10}>
            <select id={id('password_type')} data-name="passwordType" onChange={onChange}>
              <option value="basic">Authorization header</option>
              <option value="request-body">Request body</option>
            </select>
          </Col>
      }
    </Row>
  </Row>
}

export const IfOAuthPassword = withIf(OAuthPassword)

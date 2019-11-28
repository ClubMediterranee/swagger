import React from 'react'
import { getOAuthTitle } from './getOAuthTitle'
import { getOAuthName } from './getOAuthName'

export function OAuth2Override (Original, system) {
  return class extends Original {
    constructor (props) {
      super(props)

      const { schema } = props

      const scopes = schema.get('allowedScopes') || schema.get('scopes')

      this.state.scopes = Object.keys(scopes.toJSON()).filter(o => !['api_admin', 'room_assignments'].includes(o))
    }

    render () {
      let {
        schema, getComponent, authSelectors, errSelectors, name, specSelectors
      } = this.props
      const Row = getComponent('Row')
      const Col = getComponent('Col')
      const Button = getComponent('Button')
      const AuthError = getComponent('authError')
      const JumpToPath = getComponent('JumpToPath', true)
      const Markdown = getComponent('Markdown')

      const { isOAS3 } = specSelectors

      // Auth type consts
      const IMPLICIT = 'implicit'
      const PASSWORD = 'password'
      const ACCESS_CODE = isOAS3() ? 'authorizationCode' : 'accessCode'
      const APPLICATION = isOAS3() ? 'clientCredentials' : 'application'

      let flow = schema.get('flow')
      let scopes = schema.get('allowedScopes') || schema.get('scopes')
      let authorizedAuth = authSelectors.authorized().get(name)
      let isAuthorized = !!authorizedAuth
      let errors = errSelectors.allErrors().filter(err => err.get('authId') === name)
      let isValid = !errors.filter(err => err.get('source') === 'validation').size
      let description = schema.get('description')

      return (
        <div>
          <h4>
            {getOAuthTitle(name)} (OAuth2, {schema.get('flow')}) <JumpToPath path={['securityDefinitions', name]}/>
          </h4>

          <div className={'mb-2'}>
            {!this.state.appName ? null : <h5>Application: {this.state.appName} </h5>}
            {description && <Markdown source={schema.get('description')}/>}

            {isAuthorized && <h6>Authorized</h6>}

            {(flow === IMPLICIT || flow === ACCESS_CODE) &&
            <p>Authorization URL: <code>{schema.get('authorizationUrl')}</code></p>}
            {(flow === PASSWORD || flow === ACCESS_CODE || flow === APPLICATION) &&
            <p>Token URL:<code> {schema.get('tokenUrl')}</code></p>}
            <p className="flow">Flow: <code>{schema.get('flow')}</code></p>
          </div>
          <div>
            {
              flow !== PASSWORD ? null : this.renderPassword({ isAuthorized, Col, Row })
            }
            {
              (flow === APPLICATION || flow === IMPLICIT || flow === ACCESS_CODE || flow === PASSWORD) &&
              (!isAuthorized || (isAuthorized && this.state.clientId)) &&
              this.renderClientId({ isAuthorized, flow, PASSWORD })
            }
            {
              ((flow === APPLICATION || flow === ACCESS_CODE || flow === PASSWORD) && this.renderClientSecret({ isAuthorized }))
            }
            {
              !isAuthorized && scopes && scopes.size ? this.renderScopes({ scopes, flow, isAuthorized }) : null
            }

            {
              errors.valueSeq().map((error, key) => {
                return <AuthError error={error} key={key}/>
              })
            }
          </div>
          <div className="auth-btn-wrapper">
            {isValid &&
            (isAuthorized
              ? <Button className="btn modal-btn auth authorize" onClick={this.logout}>Logout</Button>
              : <Button className="btn modal-btn auth authorize" onClick={this.authorize}>Authorize</Button>)
            }
            <Button className="btn modal-btn auth btn-done" onClick={this.close}>Close</Button>
          </div>

        </div>
      )
    }

    renderPassword ({ isAuthorized }) {
      const { getComponent } = this.props
      const Row = getComponent('Row')
      const Col = getComponent('Col')
      const appName = getOAuthName(this.state.name)
      const id = (id) => `${id}-${appName}`

      return <Row className={'mb-2'}>
        <Row>
          <label htmlFor={id('oauth_username')}>username:</label>
          {
            isAuthorized ? <code> {this.state.username} </code>
              : <Col tablet={10} desktop={10}>
                <input id={id('oauth_username')} type="text" data-name="username" onChange={this.onInputChange}/>
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
                  id={id('oauth_password')} type="password" data-name="password"
                  onChange={this.onInputChange}/>
              </Col>
          }
        </Row>
        <Row>
          <label htmlFor={id('password_type')}>Client credentials location:</label>
          {
            isAuthorized ? <code> {this.state.passwordType} </code>
              : <Col tablet={10} desktop={10}>
                <select id={id('password_type')} data-name="passwordType" onChange={this.onInputChange}>
                  <option value="basic">Authorization header</option>
                  <option value="request-body">Request body</option>
                </select>
              </Col>
          }
        </Row>
      </Row>
    }

    renderClientId ({ isAuthorized, flow, PASSWORD }) {
      const { getComponent } = this.props
      const Row = getComponent('Row')
      const InitializedInput = getComponent('InitializedInput')

      const { clientId } = this.state
      const appName = getOAuthName(this.state.name)
      const id = `client_id-${appName}`

      return <Row className={'mb-2'}>
        <label htmlFor="client_id">client_id:</label>
        {
          isAuthorized ? <code> ****** </code>
            : <div>
              <InitializedInput
                id={id}
                type="text"
                required={flow === PASSWORD}
                initialValue={clientId}
                data-name="clientId"
                className={'w-full'}
                onChange={this.onInputChange}/>
            </div>
        }
      </Row>
    }

    renderClientSecret ({ isAuthorized }) {
      const { getComponent } = this.props
      const Row = getComponent('Row')
      const InitializedInput = getComponent('InitializedInput')

      const appName = getOAuthName(this.state.name)
      const id = `client_secret-${appName}`

      return <Row className={'mb-2'}>
        <label htmlFor={id}>client_secret:</label>
        {
          isAuthorized ? <code> ****** </code>
            : <div>
              <InitializedInput
                id={id}
                initialValue={this.state.clientSecret}
                type="text"
                data-name="clientSecret"
                className={'w-full'}
                onChange={this.onInputChange}/>
            </div>
        }me
      </Row>
    }

    renderScopes ({ scopes, flow, isAuthorized }) {
      const { getComponent } = this.props
      const Input = getComponent('Input')

      return <div className="scopes mb-2">
        <h2>Scopes:</h2>
        <div className={'flex flex-wrap'}>
          {
            scopes.map((description, name) => {
              const appName = getOAuthName(this.state.name)
              return (
                <div className="checkbox flex-grow mr-1">
                  <Input
                    value={name}
                    checked={this.state.scopes.includes(name)}
                    data-value={name}
                    id={`${name}-${flow}-checkbox-${appName}`}
                    disabled={isAuthorized}
                    type="checkbox"
                    onChange={this.onScopeChange}/>
                  <label htmlFor={`${name}-${flow}-checkbox-${appName}`}>
                    <span className="item"/>
                    <div className="text">
                      <p className="name">{name}</p>
                      <p className="description">{description}</p>
                    </div>
                  </label>
                </div>
              )
            }).toArray()
          }
        </div>
      </div>
    }
  }
}

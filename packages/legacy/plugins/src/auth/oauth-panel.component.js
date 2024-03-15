import React from 'react'
import { pushUniqValue } from '../common/localeStorage'
import { IfOAuthPassword } from './oauth-password.component'
import { IfOAuthClientId } from './oauth-client-id.component'
import { IfOAuthClientSecret } from './oauth-client-secret.component'
import { IfOAuthScopes } from './oauth-scopes.component'
import { getOauthTitle } from './utils/get-oauth-title'
import { getAccessToken } from './utils/get-access-token'
import { logoutFromOIDC } from './utils/logout-from-oidc'
import { getCurrentAuth } from './utils/get-current-auth'

function useOauthContext (props) {
  const { schema, specSelectors, authSelectors, errSelectors, name, clientId } = props
  const title = getOauthTitle(name)
  const flow = schema.get('flow')
  const scopesChoices = schema.get('allowedScopes') || schema.get('scopes')
  const authorizedAuth = authSelectors.authorized().get(name)
  const isAuthorized = !!authorizedAuth
  const errors = errSelectors.allErrors().filter(err => err.get('authId') === name)
  const isValid = !errors.filter(err => err.get('source') === 'validation').size
  const description = schema.get('description')
  const { isOAS3 } = specSelectors

  // Auth type constants
  const IMPLICIT = 'implicit'
  const PASSWORD = 'password'
  const ACCESS_CODE = isOAS3() ? 'authorizationCode' : 'accessCode'
  const APPLICATION = isOAS3() ? 'clientCredentials' : 'application'

  return {
    ...props,
    IMPLICIT,
    PASSWORD,
    ACCESS_CODE,
    APPLICATION,
    title,
    flow,
    scopesChoices,
    authorizedAuth,
    isAuthorized,
    errors,
    isValid,
    description,
    accessToken: getAccessToken(authSelectors),
    useAuthorizationUrl: flow === IMPLICIT || flow === ACCESS_CODE,
    useTokenUrl: (flow === PASSWORD || flow === ACCESS_CODE || flow === APPLICATION),
    usePassword: flow === PASSWORD,
    useClientSecret: flow === APPLICATION || flow === ACCESS_CODE || flow === PASSWORD,
    useClientId: (flow === APPLICATION || flow === IMPLICIT || flow === ACCESS_CODE || flow === PASSWORD) &&
      (!isAuthorized || (isAuthorized && clientId)),
    useScopes: !isAuthorized && scopesChoices && scopesChoices.size,
    logoutFromOIDC: () => logoutFromOIDC(getCurrentAuth(authSelectors))
  }
}

export default function OauthPanel (props) {
  const {
    getComponent,
    title,
    name,
    schema,
    flow,
    scopes,
    scopesChoices,
    isAuthorized,
    accessToken,
    errors,
    isValid,
    description,
    appName,
    logoutFromOIDC,
    clientId,
    clientSecret,
    passwordType,
    username,
    useClientId,
    useClientSecret,
    useScopes,
    usePassword,
    useAuthorizationUrl,
    useTokenUrl,
    onScopeChange,
    onChange,
    onLogout,
    onAuthorize,
    onClose
  } = useOauthContext(props)

  const Button = getComponent('Button')
  const AuthError = getComponent('authError')
  const JumpToPath = getComponent('JumpToPath', true)
  const Markdown = getComponent('Markdown')

  return <div>
    <h4>
      {title} ({appName || 'OAuth2'}, {flow}) <JumpToPath path={['securityDefinitions', name]}/>
    </h4>

    <div className={'pb-3'}>
      {description && <Markdown source={description}/>}
      {useAuthorizationUrl &&
      <p>Authorization URL: <code>{schema.get('authorizationUrl')}</code></p>}
      {useTokenUrl &&
      <p>Token URL:<code> {schema.get('tokenUrl')}</code></p>}
      <p className="flow">Flow: <code>{schema.get('flow')}</code></p>
    </div>
    <div>
      <IfOAuthPassword
        getComponent={getComponent}
        if={usePassword}
        appName={appName}
        username={username}
        passwordType={passwordType}
        isAuthorized={isAuthorized}/>

      <IfOAuthClientId
        getComponent={getComponent}
        if={useClientId}
        appName={appName}
        isAuthorized={isAuthorized}
        isRequired={usePassword}
        value={clientId}
        accessToken={accessToken}
        onChange={onChange}/>

      <IfOAuthClientSecret
        getComponent={getComponent}
        if={useClientSecret}
        appName={appName}
        isAuthorized={isAuthorized}
        isRequired={usePassword}
        value={clientSecret}
        onChange={onChange}/>

      <IfOAuthScopes
        getComponent={getComponent}
        if={useScopes}
        id={appName}
        flow={flow}
        choices={scopesChoices}
        value={scopes}
        isAuthorized={isAuthorized}
        onChange={onScopeChange}/>
      {
        errors.valueSeq().map((error, key) => {
          return <AuthError error={error} key={key}/>
        })
      }
    </div>

    <div className="auth-btn-wrapper">
      {isValid &&
      (isAuthorized
        ? <Button className="btn modal-btn auth authorize" onClick={(e) => {
          logoutFromOIDC()
          onLogout(e)
        }}>Logout</Button>
        : <Button className="btn modal-btn auth authorize" onClick={() => {
          if (appName && clientId) {
            pushUniqValue(appName, clientId)
          }
          onAuthorize()
        }}>Authorize</Button>)
      }
      <Button className="btn modal-btn auth btn-done" onClick={onClose}>Close</Button>
    </div>
  </div>
}

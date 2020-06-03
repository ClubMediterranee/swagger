import React, { Suspense } from 'react'
import { fromJS } from 'immutable'
import { getOauthName } from './utils/get-oauth-name'
import { getOauthDefaultScopes } from './utils/get-oauth-default-scopes'
import './utils/patch-open-url'
import { getAccessToken } from './utils/get-access-token'

const OauthPanel = React.lazy(() => import(/* webpackChunkName: "oauth2" */'./oauth-panel.component'))

export function OAuth2Override (Original, system) {
  const selector = system.specSelectors.parameterWithMetaByIdentity

  system.specSelectors.parameterWithMetaByIdentity = (state, ...args) => {
    const param = selector(state, ...args)

    if (param.get('in') === 'header' && param.get('name') === 'authorization') {
      const { authSelectors } = system

      const accessToken = getAccessToken(authSelectors)

      if (accessToken) {
        return fromJS({
          ...param.toJS(),
          value: `Bearer ${accessToken}`
        })
      }
    }

    return param
  }

  return class extends Original {
    constructor (props) {
      super(props)

      const { schema } = props

      const scopes = schema.get('allowedScopes') || schema.get('scopes')

      this.state.scopes = getOauthDefaultScopes(scopes)
    }

    render () {
      return <Suspense fallback={<div></div>}>
        <OauthPanel
          {...this.props}
          appName={getOauthName(this.state.name)}
          scopes={this.state.scopes}
          username={this.state.username}
          passwordType={this.state.passwordType}
          clientId={this.state.clientId}
          clientSecret={this.state.clientSecret}
          onChange={this.onInputChange}
          onScopeChange={this.onScopeChange}
          onClose={this.close}
          onLogout={this.logout}
          onAuthorize={this.authorize}
        /></Suspense>
    }
  }
}

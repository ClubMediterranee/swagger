import React, { Suspense } from 'react'
import { getOauthName } from './utils/get-oauth-name'
import { getOauthDefaultScopes } from './utils/get-oauth-default-scopes'
import './utils/patch-open-url'

const OauthPanel = React.lazy(() => import(/* webpackChunkName: "oauth2" */'./oauth-panel.component'))

export function OAuth2Override (Original, system) {
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

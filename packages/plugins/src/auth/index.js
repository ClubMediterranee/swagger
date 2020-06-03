import React from 'react'
import { OAuth2Override } from './oauth2.override'
import { AuthorizationPopupOverride } from './authorization-popup.override'
import AuthorizeBtn from './authorize-btn.component'

export const OAuth2Plugin = () => {
  return {
    wrapComponents: {
      authorizationPopup: AuthorizationPopupOverride,
      oauth2: OAuth2Override,
      authorizeBtn: (Original, system) => {
        return (props) => <AuthorizeBtn
          {...props}
          authActions={system.authActions}
          authSelectors={system.authSelectors}
          definitions={system.definitions}/>
      }
    }
  }
}

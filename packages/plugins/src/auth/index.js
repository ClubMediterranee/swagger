import React from 'react'
import { OAuth2Override } from './oauth2.override'
import { AuthorizationPopupOverride } from './authorization-popup.override'
import { fromJS } from 'immutable'
import { getAccessToken } from './utils/get-access-token'
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
    },
    statePlugins: {
      spec: {
        wrapSelectors: {
          parameterWithMetaByIdentity: (oriSelector, system) => (state, ...args) => {
            const [, rawParam] = args
            const param = oriSelector(state, ...args)

            if (rawParam.get('in') === 'header' && rawParam.get('name') === 'authorization') {
              const { authSelectors } = system

              const accessToken = getAccessToken(authSelectors)

              if (accessToken) {
                return fromJS({
                  ...(param ? param.toJSON() : rawParam.toJSON()),
                  value: `Bearer ${accessToken}`
                })
              }
            }

            return param
          }
        }
      }
    }
  }
}

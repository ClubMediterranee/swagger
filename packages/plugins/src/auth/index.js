import React from 'react'
import { AuthorizationPopupOverride } from './authorization-popup.override'
import AuthorizeBtn from './authorize-btn.component'
import { OAuth2Override } from './oauth2.override'
import { updateAllFields } from '../common/updateAllFields'

const UPDATE_AUTHORIZATION_FIELDS = 'UPDATE_AUTHORIZATION_FIELDS'

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
        actions: {
          updateAuthorizationFields: (payload) => {
            const { token } = payload
            const value = token ? `${token.token_type} ${token.access_token}` : ''

            return {
              type: UPDATE_AUTHORIZATION_FIELDS,
              payload: { value }
            }
          }
        },
        reducers: {
          [UPDATE_AUTHORIZATION_FIELDS]: (state, { payload }) => {
            return updateAllFields(state, 'header', 'authorization', payload.value)
          }
        }
      },
      auth: {
        wrapActions: {
          authorizeOauth2: (oriAction, system) => (payload) => {
            system.specActions.updateAuthorizationFields(payload)
            return oriAction(payload)
          },
          logout: (oriAction, system) => (payload) => {
            system.specActions.updateAuthorizationFields(payload)
            return oriAction(payload)
          }
        }
      }
    }
  }
}

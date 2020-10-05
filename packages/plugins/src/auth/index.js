import React from 'react'
import { AuthorizationPopupOverride } from './authorization-popup.override'
import AuthorizeBtn from './authorize-btn.component'
import { OAuth2Override } from './oauth2.override'

const UPDATE_AUTHORIZATION_FIELDS = 'UPDATE_AUTHORIZATION_FIELDS'

function updateAllFields (state, paramIn, paramName, value) {
  state.get('json').get('paths').forEach((methods, path) => {
    methods.forEach((operation, method) => {
      if (operation.get('parameters')) {
        operation
          .get('parameters')
          .filter(parameter => parameter.get('in') === paramIn && parameter.get('name') === paramName)
          .forEach((parameter) => {
            let paramKey = `${parameter.get('in')}.${parameter.get('name')}`
            state = state.setIn(
              ['meta', 'paths', path, method, 'parameters', paramKey, 'value'],
              value
            )
          })
      }
    })
  })

  return state
}

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

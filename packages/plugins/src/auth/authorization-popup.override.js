import React from 'react'
import { Tabs } from '@clubmed/components'
import { getOauthName } from './utils/get-oauth-name'

export function AuthorizationPopupOverride (Original, system) {
  return class extends Original {
    render () {
      const { authSelectors, authActions, getComponent, errSelectors, specSelectors, fn: { AST = {} } } = this.props
      const definitions = authSelectors.shownDefinitions()
      const Auths = getComponent('auths')

      const auths = definitions.valueSeq()
        .map((definition, key) => {
          const name = Object.keys(definition.toJSON())[0]

          return {
            label: getOauthName(name),
            title: name,
            children: <Auths
              key={key}
              AST={AST}
              definitions={definition}
              getComponent={getComponent}
              errSelectors={errSelectors}
              authSelectors={authSelectors}
              authActions={authActions}
              specSelectors={specSelectors}/>
          }
        })
        .toArray()
        .sort((a, b) => a.label > b.label ? 1 : -1)

      return (
        <div className="dialog-ux">
          <div className="backdrop-ux"/>
          <div className="modal-ux">
            <div className="modal-dialog-ux">
              <div className="modal-ux-inner">
                <div className="modal-ux-header">
                  <h3>Available authorizations</h3>
                  <button type="button" className="close-modal" onClick={this.close}>
                    <svg width="20" height="20">
                      <use href="#close" xlinkHref="#close"/>
                    </svg>
                  </button>
                </div>
                <div className="modal-ux-content">
                  <Tabs items={auths}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

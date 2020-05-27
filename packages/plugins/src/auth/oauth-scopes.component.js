import React from 'react'
import { withIf } from '@clubmed/components'

export function OAuthScopes ({ id, getComponent, choices, value, flow, isAuthorized, onChange }) {
  const Input = getComponent('Input')

  return <div className="scopes mb-2">
    <h2>Scopes:</h2>
    <div className={'flex flex-wrap'}>
      {
        choices.map((description, name) => {
          const localId = `${name}-${flow}-checkbox-${id}`

          return (
            <div key={name} className="checkbox flex-grow mr-1">
              <Input
                value={name}
                checked={value.includes(name)}
                data-value={name}
                id={localId}
                disabled={isAuthorized}
                type="checkbox"
                onChange={onChange}/>
              <label htmlFor={localId}>
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

export const IfOAuthScopes = withIf(OAuthScopes)

import React, { useEffect, useMemo, useState } from 'react'
import { InputDatalist, withIf } from '@clubmed/components'
import moment from 'moment'
import { OauthAccessToken } from './oauth-access-token.component'
import { getClientId } from './utils/locale-storage-clientids'

export function SelectClientId ({ onChange, appName, ...props }) {
  const [value, setValue] = useState(props.value)

  const options = useMemo(() => {
    return getClientId(appName)
      .sort((a, b) => {
        return moment(a.lastUpdate).isBefore(b.lastUpdate) ? 1 : -1
      })
      .map(({ id, lastUpdate }) => ({
        label: id + '<div><small>Last use: ' + moment(lastUpdate).fromNow() + '</small></div>',
        value: id
      }))
  }, [appName])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return <InputDatalist
    {...props}
    value={value}
    dataList={options}
    onChange={(name, value) => {
      setValue(value)
      onChange(props.name, value)
    }}
    onSelect={(item) => {
      setValue(item.value)
      onChange(props.name, item.value)
    }}/>
}

export function OAuthClientId ({ isAuthorized, accessToken, getComponent, value, appName, isRequired, onChange }) {
  const Row = getComponent('Row')
  const id = `client_id-${appName}`

  return <Row className={'mb-2'}>
    {
      isAuthorized ? <OauthAccessToken value={accessToken}/>
        : <div>
          <SelectClientId
            appName={appName}
            label={'Client_id'}
            id={id}
            value={value}
            isRequired={isRequired}
            className={'w-full'}
            onChange={(name, value) => {
              onChange({ target: { dataset: { name: 'clientId' }, value } })
            }}/>
        </div>
    }
  </Row>
}

export const IfOAuthClientId = withIf(OAuthClientId)

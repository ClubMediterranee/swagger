import classnames from 'classnames'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { InputDatalist } from '@clubmed/components'
import { getKey, pushUniqValue } from '../common/localeStorage'

function ItemLayout (props) {
  const { isActive, label, lastUpdate } = props

  return (
    <div
      className={classnames(
        'focus:bg-turquoise hover:bg-turquoise cursor-pointer flex items-center overflow-hidden p-2 focus:text-white hover:text-white transition-colors',
        { 'bg-turquoise text-white': isActive }
      )}
    >
      <div
        className={classnames('decorator-match flex-1 text-base')}>
        <div>
          {label}
          <div>
            <small className="text-xs">Last use: ${moment(lastUpdate).fromNow()}</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SelectUniqValues ({ onChange, isInvalid, ...props }) {
  const [value, setValue] = useState(props.value)

  const options = getKey(props.name, [])
    .sort((a, b) => {
      return moment(a.lastUpdate).isBefore(b.lastUpdate) ? 1 : -1
    })
    .map(({ id, lastUpdate }) => ({
      label: id,
      lastUpdate,
      value: id
    }))

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return <div style={{ 'maxWidth': '340px' }}><InputDatalist
    {...props}
    value={value}
    dataList={options}
    itemLayout={ItemLayout}
    validationState={isInvalid ? 'IS_INVALID' : 'NOT_VALIDATED'}
    onBlur={() => {
      value && pushUniqValue(props.name, value)
    }}
    onChange={(name, value) => {
      setValue(value)
      onChange(props.name, value)
    }}
    onSelect={(item) => {
      setValue(item.value)
      onChange(props.name, item.value)
    }}/></div>
}

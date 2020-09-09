import { InputDatalist } from '@clubmed/components'
import { ReactComponent as SELECT } from '@clubmed/components/src/statics/svg/select.svg'
import { ReactComponent as LOCALE } from '@clubmed/components/src/statics/svg/locale.svg'
import React, { useEffect, useMemo, useState } from 'react'

function format (value) {
  value = value.replace(/_/, '-').split('-')
  value[0] = (value[0] || '').toLowerCase()
  value[1] = (value[1] || '').toUpperCase()

  return value.filter(Boolean).join('-')
}

function findValue (options, value) {
  return options.find(item => item.value === value)
}

function sortByValue (options, value) {
  const values = options.reduce((tuple, item) => {
    if (item.value.includes(value)) {
      tuple[0].push({
        ...item,
        label: item.label.replace(value, `<strong class="font-bold">${value}</strong>`)
      })
    } else {
      tuple[1].push(item)
    }

    return tuple
  }, [[], []])

  return [].concat(...values)
}

export function SelectLocales ({ debounceTimeout, onChange, acceptEmpty = false, ...props }) {
  const [value, setValue] = useState(props.value)
  const options = useMemo(() => {
    return (props.options || [])
      .sort((a, b) => a > b ? 1 : -1)
      .map((locale) => {
        return {
          label: locale,
          value: locale
        }
      })
  }, [props.options])

  const onBlur = (e) => {
    const { target } = e
    setTimeout(() => {
      const value = format(target.value)

      if (findValue(options, value) || (acceptEmpty && value === '')) {
        setValue(value)
        onChange(props.name, value)
      } else {
        setValue(props.value)
        onChange(props.name, props.value)
      }
    }, debounceTimeout || 100)
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return <InputDatalist
    {...props}
    value={value}
    options={sortByValue(options, value)}
    iconLeft={LOCALE}
    iconRight={SELECT}
    iconRightWidth={'0.75rem'}
    onChange={(name, value) => {
      value = format(value)
      setValue(value)

      if (findValue(options, value)) {
        onChange(props.name, value)
      }
    }}
    onSelect={(item) => {
      setValue(item.value)
    }}
    onBlur={onBlur}/>
}

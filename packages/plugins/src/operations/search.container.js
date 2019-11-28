import React from 'react'
import { ReactComponent as SEARCH } from '@reswagger/components/src/statics/svg/searchGlass.svg'
import { InputText } from '@reswagger/components'

function callLast (fn, time) {
  let last = null

  return (...args) => {
    if (last) {
      clearTimeout(last)
      last = null
    }

    last = setTimeout(() => fn(...args), time)
  }
}

export default function SearchContainer ({ specSelectors, operationsSelectors, operationsActions }) {
  const onChange = (name, value) => {
    operationsActions.updateFilter(value)
  }

  const isLoading = specSelectors.loadingStatus() === 'loading'
  const filter = operationsSelectors.currentFilter()

  return <InputText
    isDisabled={isLoading}
    value={(filter === true || filter === 'true' ? '' : filter) || ''}
    iconLeft={SEARCH}
    placeholder="Search..."
    name="search"
    onChange={callLast(onChange, 200)}/>
}

import React from 'react'
import { ReactComponent as SEARCH } from '@clubmed/components/src/statics/svg/searchGlass.svg'
import { callLast, InputText } from '@clubmed/components'

export default function SearchContainer ({ specSelectors, operationsSelectors, operationsActions }) {
  const setFilter = callLast((value) => operationsActions.updateFilter(value), 500)

  const onKeyPressEnter = (event, value) => {
    operationsActions.updateFilter(value)
  }

  const onChange = (name, value) => {
    if (String(value).length === 0) {
      operationsActions.updateFilter(value)
    } else {
      setFilter(value)
    }
  }

  const onClear = () => {
    operationsActions.updateFilter()
  }

  const isLoading = specSelectors.loadingStatus() === 'loading'
  const filter = operationsSelectors.currentFilter()

  return <InputText
    style={{ 'width': '100%' }}
    isDisabled={isLoading}
    value={(filter === true || filter === 'true' ? '' : filter) || ''}
    iconLeft={SEARCH}
    hasClear={true}
    placeholder="Search... (e.g. path: /products AND method: POST)"
    name="search"
    onKeyPressEnter={onKeyPressEnter}
    onChange={onChange}
    onClear={onClear}/>
}

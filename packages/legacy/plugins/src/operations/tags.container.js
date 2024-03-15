import { Dropdown, Icon, InputSwitch } from '@clubmed/components'
import { ReactComponent as TOGGLE } from '@clubmed/components/src/statics/svg/toggle.svg'
import React, { useCallback, useState } from 'react'

function DropdownTitle () {
  return <div className={'flex text-gray'}>
    <Icon svg={TOGGLE} width={'1.2rem'}/>
  </div>
}

function useSwitches ({ value, onChange }) {
  const [form, setForm] = useState(value || {})
  const callback = useCallback((item, state) => {
    const newValue = {
      ...form,
      [item.value]: state
    }
    setForm(newValue)
    setTimeout(() => onChange(newValue), 300)
  }, [form, setForm, onChange])

  return { form, onChange: callback }
}

function TagsOptions (props) {
  const { form, onChange } = useSwitches(props)

  return <div>{
    props.options.map((item) => {
      return <InputSwitch
        key={item.value}
        label={item.label}
        isChecked={form[item.value]}
        onChange={(name, value) => onChange(item, value)}
        isSwitch/>
    })
  }
  </div>
}

export default function TagsContainer ({ operationsActions, operationsSelectors, getConfigs }) {
  const options = getConfigs().tagsSwitches || []
  const value = operationsSelectors.currentTagsFilter()

  if (options.length === 0) {
    return ''
  }

  return <Dropdown title={DropdownTitle} className={'flex h-full'} minWidth={'250px'}>
    {() => {
      return <div className={'overflow-hidden'}>
        <h4 className={'font-brand font-normal mt-0 mb-2 text-blue text-md'}>Display routes</h4>
        <div className={'-mx-2'}>
          <TagsOptions
            options={options}
            value={value}
            onChange={(tags) => {
              operationsActions.updateTagsFilter(tags)
            }}/>
        </div>
      </div>
    }}
  </Dropdown>
}

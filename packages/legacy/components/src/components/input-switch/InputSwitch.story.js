import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'

import { COLORS, COLORS_LIST } from '../../utils/color/colors'
import { InputSwitch } from './InputSwitch.jsx'
import { iconSelect } from '../../utils/stories/icons.utils'

const themes = ['default', 'bubble']
const validationStates = ['NOT_VALIDATED', 'IS_VALID', 'IS_INVALID']

storiesOf('Forms/InputSwitch', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('Sandbox', () => (
    <div className="p-4 w-screen">
      <InputSwitch
        color={select('color', COLORS_LIST, COLORS.BLUE)}
        iconChecked={iconSelect('iconChecked', 'CHECK')}
        iconUnChecked={iconSelect('iconUnChecked', '')}
        id={text('id', 'customId')}
        isChecked={boolean('isChecked', false)}
        isDisabled={boolean('isDisabled', false)}
        isLoading={boolean('isLoading', false)}
        isReadOnly={boolean('isReadOnly', false)}
        isRequired={boolean('isRequired', false)}
        isSwitch={boolean('isSwitch', false)}
        label={text('label', 'My sample label')}
        name={text('name', 'InputTextName')}
        onChange={action('onChange')}
        size={select('size', ['small', 'medium', 'large'], 'medium')}
        theme={select('theme', themes, 'default')}
        validationState={select('validationState', validationStates, 'NOT_VALIDATED')}
        value={text('value', 'my value')}
      />
    </div>
  ))
  .add('Bubble theme', () => (
    <div className="p-4 w-screen">
      <InputSwitch label="My sample label" theme="bubble"/>
    </div>
  ))
  .add('Switcher', () => (
    <div className="p-4 w-screen">
      <InputSwitch label="My sample label" isSwitch/>
    </div>
  ))

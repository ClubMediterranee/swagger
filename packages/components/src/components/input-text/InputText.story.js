import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number, object, select, text, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { InputText } from './InputText.jsx'
import { ReactComponent as CLOSED_EYE_PASSWORD } from '../../statics/svg/closedEyePassword.svg'
import { ReactComponent as EYE_PASSWORD } from '../../statics/svg/eyePassword.svg'
import { iconSelect } from '../../utils/stories/icons.utils'

const autoCompletes = ['off', 'on']
const sizes = ['small', 'medium', 'large']
const types = ['email', 'password', 'search', 'tel', 'text', 'url']
const validationStates = ['NOT_VALIDATED', 'IS_VALID', 'IS_INVALID']

storiesOf('Forms/InputText', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('Sandbox', () => (
    <InputText
      autoComplete={select('autoComplete', autoCompletes, 'off')}
      hasClear={boolean('hasClear', false)}
      hasTypeToggler={boolean('hasTypeToggler', false)}
      iconLeft={iconSelect('iconLeft', 'SEARCHGLASS')}
      iconRight={iconSelect('iconRight', 'USER')}
      id={text('id', 'customId')}
      isActive={boolean('isActive', false)}
      isDisabled={boolean('isDisabled', false)}
      isFilled={boolean('isFilled', false)}
      isLoading={boolean('isLoading', false)}
      isReadOnly={boolean('isReadOnly', false)}
      isRequired={boolean('isRequired', false)}
      label={text('label', 'My sample label')}
      smallLabel={boolean('smallLabel', true)}
      maxLength={number('maxLength')}
      minLength={number('minLength')}
      name={text('name', 'InputTextName')}
      notes={text('notes', 'Insert some usual notes')}
      onChange={action('onChange')}
      pattern={text('pattern', '')}
      placeholder={text('placeholder', 'placeholder')}
      size={select('size', sizes, 'large')}
      type={select('type', types, 'text')}
      typeToggler={object('typeToggler', {
        antiIcon: CLOSED_EYE_PASSWORD,
        antiType: 'text',
        icon: EYE_PASSWORD
      })}
      validationState={select('validationState', validationStates, 'NOT_VALIDATED')}
      value={text('value', 'Lorem ipsum dolor sit.')}
    />
  ))
  .add('With typeToggler', () => (
    <InputText hasTypeToggler label="My sample label" type="password" value="Password"/>
  ))

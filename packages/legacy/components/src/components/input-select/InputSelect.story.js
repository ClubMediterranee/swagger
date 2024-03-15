import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { InputSelect } from './InputSelect.jsx'
import { iconSelect } from '../../utils/stories/icons.utils'

const sizes = ['small', 'medium', 'large']
const validationStates = ['NOT_VALIDATED', 'IS_VALID', 'IS_INVALID']

const options = [
  {
    isDisabled: false,
    label: 'option1',
    value: 'value1'
  },
  {
    isDisabled: false,
    label: 'option2',
    value: 'value2'
  },
  {
    isDisabled: false,
    label: 'option3',
    value: 'value3'
  },
  {
    isDisabled: false,
    label: 'option4',
    value: 'value4'
  }
]

storiesOf('Forms/InputSelect', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('Select (single value)', () => (
    <InputSelect
      caretIcon={iconSelect('caretIcon', 'SELECT')}
      hasClear={boolean('hasClear', false)}
      iconLeft={iconSelect('iconLeft', 'SEARCHGLASS')}
      iconRight={iconSelect('iconRight', 'USER')}
      id={text('id', 'customId')}
      isDisabled={boolean('isDisabled', false)}
      isLoading={boolean('isLoading', false)}
      isFilled={boolean('isFilled', false)}
      isReadOnly={boolean('isReadOnly', false)}
      isRequired={boolean('isRequired', false)}
      label={text('label', 'My sample label')}
      name={text('name', 'InputSelectName')}
      notes={text('notes', 'Insert some usual notes')}
      onChange={action('onChange')}
      options={options}
      placeholder={text('placeholder', 'placeholder')}
      size={select('size', sizes, 'large')}
      validationState={select('validationState', validationStates, 'NOT_VALIDATED')}
      value={text('value', 'Lorem ipsum dolor sit.')}
    />
  ))
  .add('Select (multiple value)', () => (
    <InputSelect
      caretIcon={iconSelect('caretIcon', 'SELECT')}
      hasClear={boolean('hasClear', false)}
      iconLeft={iconSelect('iconLeft', 'SEARCHGLASS')}
      iconRight={iconSelect('iconRight', 'USER')}
      id={text('id', 'customId')}
      isDisabled={boolean('isDisabled', false)}
      isLoading={boolean('isLoading', false)}
      isFilled={boolean('isFilled', false)}
      isMultiple={true}
      isReadOnly={boolean('isReadOnly', false)}
      isRequired={boolean('isRequired', false)}
      label={text('label', 'My sample label')}
      name={text('name', 'InputSelectName')}
      notes={text('notes', 'Insert some usual notes')}
      onChange={action('onChange')}
      options={options}
      placeholder={text('placeholder', 'placeholder')}
      size={select('size', sizes, 'large')}
      validationState={select('validationState', validationStates, 'NOT_VALIDATED')}
      value={text('value', 'option-1')}
    />
  ))

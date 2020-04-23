import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { InputDatalist } from './InputDatalist.jsx'
import { iconSelect } from '../../utils/stories/icons.utils'
import { ReactComponent as TRIDENT1 } from '../../statics/svg/trident1.svg'
import { ReactComponent as AGAC } from '../../statics/svg/clubmed.svg'

const sizes = ['small', 'medium', 'large']
const validationStates = ['NOT_VALIDATED', 'IS_VALID', 'IS_INVALID']

const dataList = [
  { label: 'Kani' },
  { label: 'Opio', iconSvg: TRIDENT1 },
  { label: 'Agadir', iconSvg: AGAC, subLabel1: 'Maroc', subLabel2: 'Afrique', type: 'resort' }
]

storiesOf('Forms/InputDatalist', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('Sandbox', () => (
    <InputDatalist
      dataList={dataList}
      hasClear={boolean('hasClear', false)}
      iconLeft={iconSelect('iconLeft', 'SEARCH_GLASS')}
      iconRight={iconSelect('iconRight', 'USER')}
      id={text('id', 'customId')}
      isAnimated={boolean('isAnimated', false)}
      isDisabled={boolean('isDisabled', false)}
      isFilled={boolean('isFilled', false)}
      isLoading={boolean('isLoading', false)}
      isReadOnly={boolean('isReadOnly', false)}
      isRequired={boolean('isRequired', false)}
      label={text('label', 'My sample label')}
      name={text('name', 'InputDatalistName')}
      notes={text('notes', 'Insert some usual notes')}
      onChange={action('onChange')}
      placeholder={text('placeholder', 'placeholder')}
      size={select('size', sizes, 'large')}
      validationState={select('validationState', validationStates, 'NOT_VALIDATED')}
      value={text('value', 'Lorem ipsum dolor sit.')}
    />
  ))

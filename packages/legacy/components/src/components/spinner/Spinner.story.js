import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, withKnobs } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'
import { COLORS, COLORS_LIST } from '../../utils/color/colors'
import { Spinner } from './Spinner.jsx'
import { iconSelect } from '../../utils/icon/icons.utils'
import { ICONS } from '../icon/Icon'

const sizes = ['small', 'medium']

const props = {
  color: COLORS.BLUE,
  iconSvg: ICONS.TRIDENT1,
  size: 'medium'
}

storiesOf('Components/Spinner', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('Sandbox', () => {
    return (
      <Spinner
        {...props}
        color={select('color', COLORS_LIST, props.color)}
        iconSvg={iconSelect('iconSvg', '45')}
        size={select('size', sizes, props.size)}
      />
    )
  })

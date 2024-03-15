import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'

import { Button } from './Button.jsx'
import { COLORS, COLORS_LIST } from '../../utils/color/colors.js'

storiesOf('Components/Button', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('Sandbox', () => {
    const props = {
      bgColor: select('bgColor', ['', ...COLORS_LIST], COLORS.BLUE),
      borderColor: select('borderColor', ['', ...COLORS_LIST], COLORS.BLUE),
      color: select('color', ['', ...COLORS_LIST], COLORS.WHITE),
      disabled: boolean('disabled', false),
      fontWeight: text('fontWeight', 'bold'),
      paddingX: number('paddingX', 4),
      paddingY: number('paddingY', 1),
      minHeight: text('minHeight', '2.5rem'),
      minWidth: text('minWidth', '10rem'),
      className: number('className', ''),
      component: select('component', ['a', 'span', 'button'], 'button')
    }

    const label = text('label', 'Hello Clubmed')

    return (
      <Button {...props}>{label}</Button>
    )
  })

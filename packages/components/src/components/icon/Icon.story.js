import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'

import { COLORS, COLORS_LIST } from '../../utils/color/colors.js'
import { iconSelect } from '../../utils/icon/icons.utils'
import { Icon, ICONS } from './Icon'

storiesOf('Components/Icon', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('Sandbox', () => (
    <Icon
      alt={text('alt', '')}
      className={text('className', '')}
      color={select('color', ['', ...COLORS_LIST], COLORS.GRAY_MEDIUM)}
      svg={iconSelect('svg', 'USER')}
      isNotMonoChrome={boolean('isNotMonoChrome', false)}
      isNotSquare={boolean('isNotSquare', false)}
      hasRtl={boolean('hasRtl', true)}
      rotation={number('rotation', 0)}
      width={text('width', '3rem')}
    />
  ))

  .add('Overview', () => (
    Object.entries(ICONS).map(([key, svg]) =>
      <div style={{
        margin: '5px',
        padding: '5px',
        display: 'inline-block',
        border: '1px solid black',
        'text-align': 'center'
      }}>
        <div>
          <Icon
            alt={text('alt', '')}
            className={text('className', '')}
            color={select('color', ['', ...COLORS_LIST], COLORS.GRAY_MEDIUM)}
            svg={svg}
            isNotMonoChrome={boolean('isNotMonoChrome', false)}
            isNotSquare={boolean('isNotSquare', false)}
            hasRtl={boolean('hasRtl', true)}
            rotation={number('rotation', 0)}
            width={text('width', '2rem')}
          />
        </div>

        <div style={{ 'font-size': '10px' }}>{key}</div>

      </div>
    )
  ))

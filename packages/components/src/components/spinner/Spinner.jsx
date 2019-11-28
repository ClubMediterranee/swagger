// @flow
import React from 'react'
import classnames from 'classnames'

import { COLORS } from '../../utils/color/colors'

import { Icon } from '../icon/Icon.jsx'

type Props = {
  className?: string,
  color?: 'current' | Colors,
  iconSvg?: Component,
  iconSize?: string,
  size?: 'small' | 'medium',
};

export function Spinner (props: Props) {
  const { className, color = COLORS.BLUE, iconSvg, iconSize = '5rem', size = 'medium' } = props

  const isSmall = size === 'small'

  return (
    <div className={classnames(className, `inline-block relative text-${color}`)}>
      <svg
        className="direction-ltr inline-block leading-none relative rotateInfinite"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
        style={
          isSmall ? { height: '1rem', width: '1rem' } : { height: '9.375rem', width: '9.375rem' }
        }
      >
        <circle
          className="fill-transparent"
          cx="33"
          cy="33"
          r="30"
          stroke={`url(#gradient--${color})`}
          style={{
            strokeDasharray: 168,
            strokeDashoffset: 20,
            strokeWidth: isSmall ? 7 : 2
          }}
        />
        <linearGradient id={`gradient--${color}`}>
          <stop style={{ stopColor: 'currentColor' }} offset="50%" stopOpacity="1"/>
          <stop style={{ stopColor: 'currentColor' }} offset="65%" stopOpacity=".5"/>
          <stop style={{ stopColor: 'currentColor' }} offset="100%" stopOpacity="0"/>
        </linearGradient>
        <svg
          width="7px"
          height="7px"
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
          x="35"
          y=".5"
        >
          <circle className="fill-current" cx="33" cy="33" r="30"/>
        </svg>
      </svg>
      {!!iconSvg &&
      !isSmall && (
        <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0">
          <Icon svg={iconSvg} width={iconSize}/>
        </div>
      )}
    </div>
  )
}

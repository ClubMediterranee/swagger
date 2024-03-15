// @flow
import React, { useState } from 'react'
import classnames from 'classnames'

import { Icon } from '../icon/Icon.jsx'

type Props = {
  iconSvg?: Component,
  isActive?: boolean,
  label: string,
  subLabel1?: string,
  subLabel2?: string,
  type?: string,
};

export function DefaultLayout (props: Props) {
  const { iconSvg, isActive, label, subLabel1, subLabel2, type } = props

  if (!label) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hover, setHover] = useState(false)

  return (
    <div
      className={classnames(
        'focus:bg-turquoise hover:bg-turquoise cursor-pointer flex items-center overflow-hidden p-3 focus:text-white hover:text-white transition-colors',
        { 'bg-turquoise text-white': isActive }
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!!iconSvg && (
        <Icon
          className={classnames('flex-no-shrink mx-3', { 'text-blue': !hover })}
          svg={iconSvg}
          width="1.25rem"
        />
      )}
      <div
        className={classnames('decorator-match flex-1 text-base', {
          'rtl:border-l-1 border-current px-3': !!iconSvg
        })}
      >
        {!!subLabel1 &&
        !!subLabel2 && (
          <div className="leading-one text-sm">
            {!!subLabel1 && <span className="font-bold uppercase">{subLabel1}</span>}
            {!!subLabel1 && !!subLabel2 && <span> - </span>}
            {!!subLabel2 && <span className="">{subLabel2}</span>}
          </div>
        )}
        <div
          className={classnames({ 'font-serif text-lg': type === 'resort' })}
          dangerouslySetInnerHTML={{ __html: label }}
        />
      </div>
    </div>
  )
}

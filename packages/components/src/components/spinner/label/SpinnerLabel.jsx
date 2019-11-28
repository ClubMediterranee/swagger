// @flow
import React from 'react'
import classnames from 'classnames'

type Props = {
  className?: string,
  label: string,
};

export function SpinnerLabel (props: Props) {
  const { className, label } = props

  if (!label) return null

  return (
    <div
      className={classnames(
        className,
        'text-center font-brand leading-normal max-w-4/5 sm:max-w-3/5 mt-4 text-blue text-xl'
      )}
    >
      {label}
    </div>
  )
}

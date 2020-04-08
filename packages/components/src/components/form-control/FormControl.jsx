// @flow
import React, { Children, type Node } from 'react'
import { isString } from 'lodash'

import { getFormattedLabel } from '@clubmed/utils'

import { Icon } from '../icon/Icon.jsx'
import { Spinner } from '../spinner/Spinner.jsx'
import { ReactComponent as CROSS } from '../../statics/svg/cross.svg'
import { themes } from './FormControl.themes'

type Props = {
  children: Node,
  className?: string,
  dir?: ?string,
  hasClear?: boolean,
  iconLeft?: Component,
  iconRight?: Component,
  endAdornment?: Node,
  id?: string,
  isActive?: boolean,
  isDisabled?: boolean,
  isLoading?: boolean,
  isReadOnly?: boolean,
  isRequired?: boolean,
  label?: string | Node,
  notes?: string,
  onClear?: (SyntheticEvent<>) => void,
  size?: SizeProps | 'none',
  theme?: string,
  validationState?: string,
};

export function FormControl (props: Props) {
  const {
    children,
    className,
    dir,
    hasClear,
    iconLeft,
    iconRight,
    endAdornment,
    id,
    isDisabled,
    isLoading,
    isReadOnly,
    isRequired,
    label,
    notes,
    onClear,
    theme = 'default',
    style
  } = props

  if (!Children.count(children)) return null

  const {
    thClearButton,
    thClearIconSize,
    thField,
    thFieldStyle,
    thIcon,
    thInput,
    thLabel,
    thLoader,
    thNotes,
    thSpinnerColor
  } = themes[theme](props)

  return (
    <div className={className} dir={dir} style={style}>
      {!!label && (
        <label className={thLabel} htmlFor={id}>
          {isString(label) ? getFormattedLabel(label, isRequired) : label}
        </label>
      )}
      <div className={thField} style={thFieldStyle}>
        {!!iconLeft && (
          <div className={thIcon}>
            <Icon svg={iconLeft}/>
          </div>
        )}
        <div className={thInput}>
          {children}
          {isLoading &&
          !isDisabled &&
          !isReadOnly && (
            <div className={thLoader}>
              <Spinner color={thSpinnerColor} size="small"/>
            </div>
          )}
          {endAdornment && endAdornment}
          {hasClear &&
          !isDisabled &&
          !isLoading &&
          !isReadOnly && (
            <button
              className={thClearButton}
              data-testid="FormControlClear"
              onClick={onClear}
              type="button"
            >
              <Icon svg={CROSS} width={thClearIconSize}/>
            </button>
          )}
        </div>
        {!!iconRight && (
          <div className={thIcon}>
            <Icon svg={iconRight}/>
          </div>
        )}
      </div>
      {!!notes && (
        <div className={thNotes} data-testid="FormControlNotes">
          {notes}
        </div>
      )}
    </div>
  )
}

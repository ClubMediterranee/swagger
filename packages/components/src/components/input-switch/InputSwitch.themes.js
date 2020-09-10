import classnames from 'classnames'

import { getCursorClass } from '../../utils/form/form.util'

const DEFAULT_SIZES = {
  small: 16,
  medium: 18,
  large: 18
}

export const themes = {
  default: props => {
    const { color, borderColor, isChecked, isDisabled, isReadOnly, size, validationState } = props

    return {
      thRoot:
        classnames(
          'no-layout flex p-2 items-center bg',
          getCursorClass({ hasPointer: true, ...props })
        ),
      thLabel: classnames(
        'flex items-center text-base px-3',
        getCursorClass({ hasPointer: true, ...props }),
        {
          'font-bold text-blue text-lg': size === 'large',
          'text-emerald': validationState === 'IS_VALID' && !isReadOnly && !isDisabled,
          'text-red': validationState === 'IS_INVALID' && !isReadOnly && !isDisabled
        }
      ),
      thChecked: classnames(
        `leading-none bg-white border-1 border-${borderColor} p-px block rounded-small`,
        getCursorClass({ hasPointer: true, ...props }),
        {
          'text-blue': isChecked,
          'bg-gray-light opacity-25': isDisabled
        }
      ),
      thCheckedStyle: {
        width: DEFAULT_SIZES[size],
        height: DEFAULT_SIZES[size]
      },
      thLoading: 'rtl:ml-2 flex items-center leading-none',
      thSwitch: classnames(
        'flex transition-all',
        getCursorClass({ hasPointer: true, ...props }),
        {
          'bg-gray-light border-gray-light': isDisabled,
          'bg-gray-darker border-gray-darker': !isChecked && !isDisabled,
          [`bg-${color} border-${color}`]: isChecked && !isDisabled
        }
      ),
      thSwitchStyle: {
        width: 40,
        height: 22,
        padding: 2,
        borderRadius: 20
      },
      thSwitchToggler: classnames('absolute bg-white block rounded-half transition-all top-0 bottom-0', {}),
      thSwitchTogglerStyle: {
        width: 18,
        left: !isChecked ? '0%' : 'calc(100% - 18px)'
      }
    }
  },
  bubble: props => {
    const { isChecked, isDisabled, isReadOnly, size, validationState } = props
    return {
      thRoot:
        classnames(
          'no-layout flex p-2 mt-2 border-1 rounded-small border-gray-light hover:bg-lightBlue ',
          getCursorClass({ hasPointer: true, ...props }),
          {
            'bg-white': !isChecked,
            'bg-blue text-white hover:text-blue': isChecked
          }
        ),
      thLabel: classnames(
        'flex items-center text-base px-3',
        getCursorClass({ hasPointer: true, ...props }),
        {
          'font-bold text-blue text-lg': size === 'large',
          'text-emerald': validationState === 'IS_VALID' && !isReadOnly && !isDisabled,
          'text-red': validationState === 'IS_INVALID' && !isReadOnly && !isDisabled
        }
      ),
      thChecked: classnames(
        'leading-none border-1 border-gray-medium block p-px rounded-small',
        getCursorClass({ hasPointer: true, ...props }),
        {
          'text-blue bg-white': isChecked,
          'bg-gray-light opacity-25': isDisabled
        }
      ),
      thLoading: 'absolute flex h-full items-center leading-none left-1/2 -translate-x-50',
      thCheckedStyle: {
        width: DEFAULT_SIZES[size],
        height: DEFAULT_SIZES[size]
      }
    }
  }
}

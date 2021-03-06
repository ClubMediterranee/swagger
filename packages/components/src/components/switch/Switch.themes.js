import classnames from 'classnames'
import { getCursorClass } from '../..'

const DEFAULT_SIZES = {
  small: 19,
  medium: 23,
  large: 23
}

export const themes = {
  default: props => {
    const { color, isChecked, isDisabled, isReadOnly, size, validationState } = props
    return {
      thRoot:
        classnames(
          'flex p-2 items-center bg',
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
        'leading-none bg-white border-1 border-gray-medium flex-no-shrink p-px rounded-small',
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
        'border-2 flex items-center transition-all',
        getCursorClass({ hasPointer: true, ...props }),
        {
          'bg-gray-light border-gray-light': isDisabled,
          'bg-gray-darker border-gray-darker': !isChecked && !isDisabled,
          [`bg-${color} border-${color}`]: isChecked && !isDisabled
        }
      ),
      thSwitchStyle: {
        width: 60,
        height: 30,
        borderRadius: 30
      },
      thSwitchToggler: classnames('bg-white block rounded-half transition-all', {
        'rtl:translate-x-100': isChecked
      }),
      thSwitchTogglerStyle: {
        width: 28,
        height: 28
      }
    }
  },
  bubble: props => {
    const { isChecked, isDisabled, isReadOnly, size, validationState } = props
    return {
      thRoot:
        classnames(
          'flex p-2 mt-2 border-1 rounded-small border-gray-light hover:bg-lightBlue ',
          getCursorClass({ hasPointer: true, ...props }),
          {
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
        'leading-none border-1 border-gray-medium flex-no-shrink p-px rounded-small',
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

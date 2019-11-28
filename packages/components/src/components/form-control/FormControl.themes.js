import classnames from 'classnames/dedupe'

import { getCursorClass } from '@reswagger/utils'

const DEFAULT_SIZES = {
  small: 30,
  medium: 40,
  large: 50
}

export const themes = {
  default: props => {
    const {
      isActive,
      isDisabled,
      smallLabel,
      isFilled,
      isReadOnly,
      size = 'medium',
      validationState = 'NOT_VALIDATED'
    } = props

    const hasDefaultStyle =
      validationState === 'NOT_VALIDATED' && !isActive && !isFilled && !isDisabled
    const hasActiveStyle =
      validationState === 'NOT_VALIDATED' && isActive && !isDisabled && !isFilled
    const hasValidStyle = validationState === 'IS_VALID' && !isFilled && !isDisabled
    const hasInvalidStyle = validationState === 'IS_INVALID' && !isFilled && !isDisabled
    const hasFilledStyle = isFilled && !isDisabled

    return {
      thLabel: classnames('block pb-1 transition-color', {
        'text-xs': smallLabel,
        'text-md': !smallLabel,
        'text-gray-darker': validationState === 'NOT_VALIDATED',
        'text-emerald': validationState === 'IS_VALID' && !isDisabled,
        'text-red': validationState === 'IS_INVALID' && !isDisabled
      }),
      thField: classnames(
        'border-1 flex p-1 relative rounded-small transition-colors',
        getCursorClass(props),
        {
          'bg-gray-lighter border-gray-light': isDisabled,
          'bg-white border-gray-light': hasDefaultStyle,
          'focus-within:border-blue text-gray-darker focus-within:text-blue':
            hasDefaultStyle && !isReadOnly,
          'bg-white border-blue text-blue': hasActiveStyle,
          'bg-white border-emerald': hasValidStyle,
          'bg-white border-red': hasInvalidStyle,
          'bg-blue border-blue text-white': hasFilledStyle
        }
      ),
      thFieldStyle: { height: DEFAULT_SIZES[size] },
      thIcon: classnames('flex items-center justify-center px-1', {
        'text-current': !hasFilledStyle,
        'text-gray-medium': isDisabled
      }),
      thInput: 'flex flex-1 px-1 relative items-center',
      thLoader: 'flex items-center justify-center leading-none',
      thSpinnerColor: hasFilledStyle ? 'current' : 'blue',
      thClearButton: classnames('reset-button leading-none px-2 transition-color', {
        'text-gray-medium': !hasFilledStyle,
        'text-current': hasFilledStyle
      }),
      thClearIconSize: '0.625rem',
      thNotes: 'mt-px pt-px text-sm text-gray-medium'
    }
  }
}

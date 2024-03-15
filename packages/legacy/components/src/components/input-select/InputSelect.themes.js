import classnames from 'classnames'

import { getCursorClass } from '../../utils/form/form.util'

export const themes = {
  default: props => ({
    thInputWrapper: 'relative w-full',
    thInput: classnames(
      'reset-input reset-select h-full relative text-current w-full',
      getCursorClass(props)
    ),
    thPlaceholder: '',
    thCaret: classnames(
      'absolute flex h-full items-center top-0 right-0 rtl:right-0 pointer-events-none px-1',
      {
        'text-current': !props.isDisabled,
        'text-gray-darker': props.isDisabled
      }
    )
  })
}

import classnames from 'classnames'

import { getCursorClass } from '@clubmed/utils'

export const themes = {
  default: props => ({
    thInput: classnames('reset-input text-current w-full', getCursorClass(props)),
    thToggler: classnames('reset-button leading-none px-4 text-current', getCursorClass(props))
  })
}

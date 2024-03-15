import { select } from '@storybook/addon-knobs'
import { ICONS } from '../../components/icon/Icon'

export function iconSelect (name, defaultValue) {
  const key = select(name, Object.keys(ICONS).concat(''), defaultValue)

  return ICONS[key]
}

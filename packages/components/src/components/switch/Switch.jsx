// @flow
import React, { Component, type Node } from 'react'
import classnames from 'classnames'
import shortId from 'shortid'
import isString from 'lodash/isString'
import noop from 'lodash/noop'

import { dataSetProps } from '../../utils/string/string.util'
import { COLORS } from '../../utils/color/colors'
import { Icon } from '../icon/Icon.jsx'
import { Spinner } from '../spinner/Spinner.jsx'

import { themes } from './Switch.themes'

import { ReactComponent as CHECK } from '../../statics/svg/check.svg'
import { getFormattedLabel } from '../..'

type Props = {
  className?: string,
  color?: Colors,
  iconChecked?: Component,
  iconUnChecked?: Component,
  id?: string,
  isChecked?: boolean,
  isDisabled?: boolean,
  isLoading?: boolean,
  isReadOnly?: boolean,
  isRequired?: boolean,
  isSwitch?: boolean,
  label?: string | Node,
  labelClassName?: string,
  name?: string,
  onChange?: (name: string, checked: boolean, value: string | boolean) => void,
  onClick?: (SyntheticEvent<>) => void,
  size?: 'small' | 'medium' | 'large',
  theme?: string,
  validationState?: string,
  value?: string | boolean,
};

type State = {
  isChecked: boolean,
};

export class Switch extends Component<Props, State> {
  static defaultProps = {
    color: COLORS.BLUE,
    iconChecked: CHECK,
    iconUnChecked: null,
    isDisabled: false,
    isLoading: false,
    size: 'medium',
    theme: 'default',
    validationState: 'NOT_VALIDATED'
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      isChecked: props.isChecked || false
    }
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.isChecked !== this.props.isChecked) {
      this.setState({ isChecked: this.props.isChecked })
    }
  }

  onChange = () => {
    const {
      isDisabled,
      isLoading,
      isReadOnly,
      name = '',
      onChange = noop,
      value = ''
    } = this.props

    if (!isReadOnly && !isDisabled && !isLoading) {
      const isChecked = !this.state.isChecked

      this.setState(
        {
          isChecked
        },
        () => onChange(name, isChecked, value)
      )
    }
  }

  getIcon (): IconName {
    const { iconChecked = null, iconUnChecked = null } = this.props
    return this.state.isChecked ? iconChecked : iconUnChecked
  }

  render () {
    const {
      className,
      id = `InputSwitch_${shortId.generate()}`,
      isDisabled,
      isLoading,
      isReadOnly,
      isRequired,
      isSwitch,
      label,
      labelClassName,
      name,
      onClick,
      theme,
      value
    } = this.props

    const { isChecked } = this.state

    const {
      thChecked,
      thCheckedStyle,
      thLabel,
      thLoading,
      thRoot,
      thSwitch,
      thSwitchStyle,
      thSwitchToggler,
      thSwitchTogglerStyle
    } = themes[theme]({ isChecked, ...this.props })

    return (
      <label
        {...dataSetProps(this.props)}
        className={classnames(className, thRoot)}
        data-selector="Switch-control"
        style={{ 'margin': 0 }}
      >
        {isSwitch ? (
          <span className={thSwitch} style={thSwitchStyle}>
            <span className={thSwitchToggler} style={thSwitchTogglerStyle}/>
          </span>
        ) : (
          <span className={thChecked} style={thCheckedStyle}>
            <Icon svg={this.getIcon()} width="100%"/>
          </span>
        )}
        <input
          checked={isChecked}
          className="hidden"
          disabled={isDisabled}
          id={id}
          label={label}
          name={name}
          onChange={this.onChange}
          onClick={onClick}
          required={isRequired}
          type="checkbox"
          value={value}
        />
        {isLoading &&
        !isDisabled &&
        !isReadOnly && (
          <div className={thLoading}>
            <Spinner size="small"/>
          </div>
        )}
        {!!label && (
          <span className={classnames(labelClassName, thLabel)}>
            {isString(label) ? getFormattedLabel(label, isRequired) : label}
          </span>
        )}
      </label>
    )
  }
}

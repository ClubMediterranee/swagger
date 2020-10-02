// @flow
import isInteger from 'lodash/isInteger'
import noop from 'lodash/noop'
import React, { Component, type Node } from 'react'

import { getFormattedLabel, getRandomComponentId } from '../..'
import { ReactComponent as CLOSED_EYE_PASSWORD } from '../../statics/svg/closedEyePassword.svg'
import { ReactComponent as EYE_PASSWORD } from '../../statics/svg/eyePassword.svg'
import { callLast } from '../../utils'
import { FormControl } from '../form-control/FormControl.jsx'

import { Icon, type IconName } from '../icon/Icon.jsx'

import { themes } from './InputText.themes'

type InputTypes = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';

type Props = {
  debounceTimeout?: number,
  autoComplete?: AutoComplete,
  autoFocus?: boolean,
  className?: string,
  hasClear?: boolean,
  hasTypeToggler?: boolean,
  iconLeft?: IconName,
  iconRight?: IconName,
  iconRightWidth?: string,
  id?: string,
  isActive?: boolean,
  isDisabled?: boolean,
  isFilled?: boolean,
  isLoading?: boolean,
  isNotEditable?: boolean,
  isReadOnly?: boolean,
  isRequired?: boolean,
  label?: string | Node,
  prefixChildren?: string | Node,
  maxLength?: number,
  minLength?: number,
  name?: string,
  notes?: string,
  onBlur?: (SyntheticEvent<>) => void,
  onChange?: (name: string, value: string) => void,
  onClear?: (SyntheticEvent<>) => void,
  onClick?: (SyntheticEvent<>) => void,
  onFocus?: (SyntheticEvent<>) => void,
  onKeyDown?: (SyntheticKeyboardEvent<>) => void,
  onKeyUp?: (SyntheticKeyboardEvent<>) => void,
  pattern?: string,
  placeholder?: string,
  size?: SizeProps,
  theme?: string,
  type?: InputTypes,
  typeToggler?: {
    antiIcon: IconName,
    antiType: InputTypes,
    icon: IconName,
  },
  validationState?: string,
  value?: string,
};

type State = {
  type: InputTypes,
  value: string,
};

export class InputText extends Component<Props, State> {
  static defaultProps = {
    autoComplete: 'off',
    size: 'medium',
    theme: 'default',
    type: 'text',
    typeToggler: {
      antiIcon: CLOSED_EYE_PASSWORD,
      antiType: 'text',
      icon: EYE_PASSWORD
    }
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      type: props.type || 'text',
      value: props.value || ''
    }

    this.debounceChange = callLast(props.onChange || noop, props.debounceTimeout || 0)
  }

  componentWillReceiveProps ({ value, type }: Props) {
    this.setState(prevState => {
      if (prevState.value !== value || prevState.type !== type) {
        return { type, value }
      }
    })
  }

  onChange = (e: SyntheticEvent<>) => {
    const { isLoading, isReadOnly, name = '' } = this.props

    if (!isReadOnly && !isLoading) {
      e.persist()

      // $FlowFixMe
      const { value } = e.target

      this.setState(
        {
          value
        },
        () => this.debounceChange(name, value)
      )
    }
  }

  onKeyDown = (e: SyntheticKeyboardEvent<>) => {
    const { onKeyDown = noop } = this.props
    const { value } = e.target
    e.persist()
    onKeyDown(e, value)
  }

  onKeyPress = (e: SyntheticKeyboardEvent<>) => {
    const { onKeyPressEnter = noop, onKeyPress = noop } = this.props
    const { value } = e.target
    e.persist()

    onKeyPress(e, value)

    const code = e.keyCode || e.which
    if (code === 13) {
      onKeyPressEnter(e, value)
    }
  }

  onClear = (e: SyntheticEvent<>) => {
    const { onClear = noop } = this.props

    this.setState(
      {
        value: ''
      },
      () => onClear(e)
    )
  }

  toggleType = () => {
    const { type, typeToggler = {} } = this.props

    this.setState({ type: this.state.type !== typeToggler.antiType ? typeToggler.antiType : type })
  }

  render () {
    const {
      autoComplete,
      autoFocus,
      className,
      hasClear,
      hasTypeToggler,
      iconLeft,
      iconRight,
      iconRightWidth,
      id = getRandomComponentId(),
      isActive,
      isDisabled,
      isFilled,
      isLoading,
      isNotEditable,
      isReadOnly,
      isRequired,
      label,
      maxLength,
      minLength,
      name,
      notes,
      onBlur,
      onClick,
      onFocus,
      onKeyUp,
      pattern,
      placeholder,
      size,
      theme,
      smallLabel,
      typeToggler = {},
      validationState,
      beforeChildren,
      prefixChildren,
      style
    } = this.props

    const { type, value } = this.state

    const hasClearEnabled = Boolean(hasClear && value)
    const hasValue = Boolean(value)

    const { thInput, thToggler } = themes[theme](this.props)

    return (
      <FormControl
        className={className}
        hasClear={hasClearEnabled}
        iconLeft={iconLeft}
        iconRight={iconRight}
        iconRightWidth={iconRightWidth}
        id={id}
        isActive={isActive}
        isDisabled={isDisabled}
        isFilled={isFilled && hasValue}
        isLoading={isLoading}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        label={label}
        notes={notes}
        onClear={this.onClear}
        size={size}
        theme={theme}
        smallLabel={smallLabel}
        validationState={validationState}
        beforeChildren={beforeChildren}
        style={style}
      >
        {prefixChildren && prefixChildren}
        <input
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={thInput}
          disabled={isDisabled}
          id={id}
          {...(isInteger(maxLength) ? { maxLength } : null)}
          {...(isInteger(minLength) ? { minLength } : null)}
          {...(name ? { name } : null)}
          onBlur={onBlur}
          onChange={this.onChange}
          onClick={onClick}
          onFocus={onFocus}
          onKeyDown={this.onKeyDown}
          onKeyPress={this.onKeyPress}
          onKeyUp={onKeyUp}
          {...(pattern ? { pattern } : null)}
          {...(placeholder ? { placeholder: getFormattedLabel(placeholder, isRequired) } : null)}
          readOnly={Boolean(isReadOnly || isLoading || isNotEditable)}
          required={isRequired}
          role={type === 'search' ? 'search' : 'textbox'}
          type={type}
          value={value || ''}
        />
        {hasTypeToggler && (
          <button
            className={thToggler}
            disabled={isDisabled}
            onClick={this.toggleType}
            type="button"
            data-testid="InputTextToggler"
          >
            <Icon svg={type === this.props.type ? typeToggler.icon : typeToggler.antiIcon}/>
          </button>
        )}
      </FormControl>
    )
  }
}

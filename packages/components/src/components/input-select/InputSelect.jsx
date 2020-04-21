// @flow
import React, { Component, type Node } from 'react'
import { InputSwitch } from '../input-switch/InputSwitch'
import { isEmpty, noop } from 'lodash'
import { getFormattedLabel, getRandomComponentId } from '../..'
import { Icon } from '../icon/Icon.jsx'
import { FormControl } from '../form-control/FormControl.jsx'
import { themes } from './InputSelect.themes'
import { themes as formThemes } from '../form-control/FormControl.themes'
import { ReactComponent as SELECT } from '../../statics/svg/select.svg'
import isString from 'lodash/isString'

type InputSelectSingleProps = {
  caretIcon?: Component,
  className?: string,
  hasClear?: boolean,
  iconLeft?: Component,
  iconRight?: Component,
  id?: string,
  isDisabled?: boolean,
  isFilled?: boolean,
  isLoading?: boolean,
  isReadOnly?: boolean,
  isRequired?: boolean,
  label?: string | Node,
  smallLabel?: boolean,
  name?: string,
  notes?: string,
  onBlur?: (SyntheticEvent<>) => void,
  onChange?: (name: string, value: string) => void,
  onClear?: (SyntheticEvent<>) => void,
  onClick?: (SyntheticEvent<>) => void,
  onFocus?: (SyntheticEvent<>) => void,
  options: SelectProps,
  placeholder?: string,
  size?: SizeProps,
  theme?: string,
  validationState?: string,
  value?: string;
}

export interface InputSelectProps extends InputSelectSingleProps {
  isMultiple?: boolean
}

type State = {
  value: string,
};

export class Select extends Component<InputSelectSingleProps, State> {
  static defaultProps = {
    caretIcon: SELECT,
    options: [],
    size: 'medium',
    theme: 'default'
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      value: props.value || ''
    }
  }

  componentWillReceiveProps ({ value }: Props) {
    this.setState(prevState => {
      if (prevState.value !== value) {
        return { value }
      }
    })
  }

  onChange = (e: SyntheticEvent<>) => {
    const { isLoading, isReadOnly, name = '', onChange = noop } = this.props

    if (!isReadOnly && !isLoading) {
      e.persist()

      // $FlowFixMe
      const { value } = e.target
      this.setState(
        {
          value
        },
        () => onChange(name, value)
      )
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

  getOptions (): ?Array<?Node> {
    const { options } = this.props

    if (isEmpty(options)) {
      return null
    }

    return options.map(({ label, value, isDisabled }) => {
      return label ? (
        <option disabled={isDisabled} key={label} label={label} value={value}>
          {label}
        </option>
      ) : null
    })
  }

  render () {
    const {
      caretIcon,
      hasClear,
      iconLeft,
      iconRight,
      id = getRandomComponentId(),
      isDisabled,
      isFilled,
      isLoading,
      isReadOnly,
      isRequired,
      label,
      smallLabel,
      name,
      notes,
      onBlur,
      onClick,
      onFocus,
      placeholder,
      size,
      theme,
      style,
      validationState
    } = this.props

    const { value } = this.state

    const hasClearEnabled = Boolean(hasClear && this.state.value)
    const hasValue = Boolean(value)

    const placeholderFormatted = getFormattedLabel(placeholder, isRequired)

    const { thCaret, thInput, thInputWrapper, thPlaceholder } = themes[theme](this.props)

    return (
      <FormControl
        style={style}
        hasClear={hasClearEnabled}
        id={id}
        iconLeft={iconLeft}
        iconRight={iconRight}
        isDisabled={isDisabled}
        isFilled={isFilled && hasValue}
        isLoading={isLoading}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        label={label}
        smallLabel={smallLabel}
        notes={notes}
        onClear={this.onClear}
        size={size}
        theme={theme}
        validationState={validationState}
      >
        <div className={thInputWrapper}>
          <select
            className={thInput + ' no-layout'}
            disabled={Boolean(isDisabled || isLoading || isReadOnly)}
            id={id}
            {...(name ? { name } : null)}
            onBlur={onBlur}
            onChange={this.onChange}
            onClick={onClick}
            onFocus={onFocus}
            required={isRequired}
            value={value}
          >
            {!!placeholderFormatted && (
              <option className={thPlaceholder} label={placeholderFormatted} disabled value="">
                {placeholderFormatted}
              </option>
            )}
            {this.getOptions()}
          </select>
          {!(isDisabled || isLoading || isReadOnly) && (
            <div className={thCaret} data-testid="InputSelectCaret">
              <Icon svg={caretIcon} width="0.75rem"/>
            </div>
          )}
        </div>
      </FormControl>
    )
  }
}

export function SelectBoxes (props) {
  const { id, className, dir, style, theme = 'default', isRequired, notes, label, options, value, onChange } = props
  const [values, setValues] = React.useState([].concat(value))

  const {
    thLabel,
    thNotes
  } = formThemes[theme](props)

  return <div className={'mb-5 last:mb-0' + className} dir={dir} style={style}>
    {!!label && (
      <label className={thLabel} htmlFor={id}>
        {isString(label) ? getFormattedLabel(label, isRequired) : label}
      </label>
    )}
    <div>
      {
        options && options.map(item => {
          return <InputSwitch
            key={item.value}
            isRequired={isRequired}
            {...item}
            name={item.value}
            isChecked={values.includes(item.value)}
            onChange={(name, checked) => {
              const newValues = checked ? [...values, item.value] : values.filter(value => value !== item.value)

              setValues(newValues)
              onChange && onChange(name, newValues)
            }}/>
        })
      }
    </div>
    {!!notes && (
      <div className={thNotes}>
        {notes}
      </div>
    )}
  </div>
}

export function InputSelect ({ isMultiple, ...props }: InputSelectProps) {
  if (isMultiple) {
    return <SelectBoxes {...props}/>
  }

  return <Select {...props} />
}

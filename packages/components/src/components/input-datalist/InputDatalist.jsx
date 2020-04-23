// @flow
/* eslint-env browser */
import React, { createRef, type Node, PureComponent } from 'react'
import classnames from 'classnames'
import shortId from 'shortid'
import { get, isFunction, noop, pick } from 'lodash'
import striptags from 'striptags'
import { ARROW_DOWN, ARROW_UP, ENTER } from '../../utils/keys-codes/keyCodes'

import { InputText } from '../input-text/InputText.jsx'
import { DefaultLayout } from './InputDatalist.layouts.jsx'
import { themes } from './InputDatalist.themes'

type DataListItem = {
  id?: string,
  iconSvg?: Component,
  label: string,
  link?: string,
  subLabel1?: string,
  subLabel2?: string,
  type?: string,
};

export type SanitizedDataListItem = {
  item: DataListItem,
  label: string,
};

export type Props = {
  autoFocus?: boolean,
  className?: string,
  dataList: $ReadOnlyArray<DataListItem>,
  hasClear?: boolean,
  iconLeft?: Component,
  iconRight?: Component,
  id?: string,
  isAnimated?: boolean,
  isDisabled?: boolean,
  isFilled?: boolean,
  isLoading?: boolean,
  isReadOnly?: boolean,
  isRequired?: boolean,
  itemLayout?: (props: DataListItem) => ?Node,
  label?: string | Node,
  smallLabel?: boolean,
  name?: string,
  notes?: string,
  onBlur?: (SyntheticEvent<>) => void,
  onChange?: (name: string, value: string) => void,
  onClear?: (SyntheticEvent<>) => void,
  onClick?: (SyntheticEvent<>) => void,
  onFocus?: (SyntheticEvent<>) => void,
  onKeyDown?: (SyntheticEvent<>) => void,
  onKeyUp?: (SyntheticEvent<>) => void,
  onSelect?: (*) => void,
  onValidate?: (*) => *,
  placeholder?: string,
  size?: SizeProps,
  theme?: string,
  validationState?: string,
  value?: string,
  onClickOutside?: () => void,
};

type State = {
  index: number,
  isActive: boolean,
  selected: string,
};

export class InputDatalist extends PureComponent<Props, State> {
  static defaultProps = {
    dataList: [],
    size: 'medium',
    theme: 'default'
  }
  dataListElementRef: * = null

  constructor (props: Props) {
    super(props)
    this.dataListElementRef = createRef()

    this.state = {
      index: -1,
      isActive: false,
      selected: props.value || ''
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.onClickOutside)
    document.addEventListener('focus', this.onClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onClickOutside)
    document.removeEventListener('focus', this.onClickOutside)
  }

  componentWillReceiveProps ({ value }: Props) {
    this.setState(prevState => {
      if (prevState.selected !== value) {
        return { selected: value }
      }
    })
  }

  onClickOutside = (e: Event) => {
    const { isActive } = this.state

    if (!this.dataListElementRef || !isActive) {
      return
    }

    const { current: dataListNode } = this.dataListElementRef

    if (!dataListNode || !dataListNode.contains(e.target)) {
      this.setState({ isActive: false })
      if (this.props.onClickOutside) {
        this.props.onClickOutside()
      }
    }
  }

  openList = () => {
    this.setState(prevState => {
      if (!prevState.isActive) {
        return { isActive: true }
      }
    })
  }

  goToIndex (offset: number) {
    this.setState(prevState => {
      const index = prevState.index + offset
      return { index }
    })
  }

  onKeyDown = (e: SyntheticKeyboardEvent<>) => {
    const { dataList = [], onKeyDown, onValidate } = this.props

    const { index } = this.state

    if (e.keyCode === ARROW_DOWN && index < dataList.length - 1) {
      this.goToIndex(1)
    } else if (e.keyCode === ARROW_UP && index > 0) {
      this.goToIndex(-1)
    } else if (e.keyCode === ENTER) {
      const item = dataList[index]
      this.setState({ isActive: false })
      if (item) {
        this.onSelect(item)
      } else if (isFunction(onValidate)) {
        onValidate()
      }
    }

    if (isFunction(onKeyDown)) {
      onKeyDown(e)
    }
  }

  onFocus = (e: SyntheticEvent<>) => {
    const { onFocus } = this.props

    this.openList()

    this.setState({ isActive: true })

    if (isFunction(onFocus)) {
      onFocus(e)
    }
  }

  onChange = (name: string, value: string) => {
    this.setState(
      {
        isActive: true,
        selected: value
      },
      () => {
        if (this.props.onChange) this.props.onChange(name, value)
      }
    )
  }

  onSelect (item: DataListItem = {}) {
    const { onSelect = noop } = this.props

    const sanitizedItem: SanitizedDataListItem = {
      ...item,
      label: striptags(get(item, 'label'))
    }

    this.setState({
      index: -1,
      isActive: false,
      selected: sanitizedItem.input || sanitizedItem.label
    })

    onSelect(sanitizedItem)
  }

  onClear = (e: SyntheticEvent<>) => {
    const { onClear = noop } = this.props

    this.setState(
      {
        index: -1,
        isActive: false,
        selected: ''
      },
      () => onClear(e)
    )
  }

  onClickItem = (item: DataListItem) => () => this.onSelect(item)

  render () {
    const {
      className,
      dataList,
      id = `InputDatalist_${shortId.generate()}`,
      isAnimated,
      isDisabled,
      isLoading,
      isReadOnly,
      itemLayout,
      theme
    } = this.props

    const { thDatalist, thRoot } = themes[theme]

    const { isActive, selected } = this.state

    return (
      <div className={classnames(className, thRoot)} ref={this.dataListElementRef}>
        <InputText
          {...pick(this.props, [
            'autoFocus',
            'hasClear',
            'iconLeft',
            'iconRight',
            'isDisabled',
            'isFilled',
            'isLoading',
            'isReadOnly',
            'isRequired',
            'label',
            'smallLabel',
            'name',
            'notes',
            'onBlur',
            'onClick',
            'onKeyUp',
            'placeholder',
            'size',
            'theme',
            'validationState',
            'prefixChildren',
            'maxLength'
          ])}
          autoComplete="off"
          id={id}
          isActive={isActive && !isReadOnly}
          onChange={this.onChange}
          onClear={this.onClear}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          type="text"
          value={selected}
        />
        {isActive &&
        !isReadOnly &&
        !isDisabled &&
        !isLoading &&
        !!dataList.length && (
          <div className={classnames(thDatalist, { fadeIn: isAnimated })} style={{ minWidth: '140px' }}>
            <ul
              style={{ maxHeight: '200px' }}
              className={'reset-list overflow-auto'}
              data-testid="InputDatalistList"
              role="listbox"
            >
              {dataList.map((item, index) => {
                if (!item.label) return null

                const { index: indexFromState } = this.state

                const newItem = {
                  ...item,
                  isActive: index === indexFromState
                }

                const hasCustomLayout = isFunction(itemLayout)

                return (
                  <li
                    className={hasCustomLayout ? '' : 'decorator-border-bottom-list '}
                    key={item.id ? item.id : index}
                    onClick={this.onClickItem(item)}
                  >
                    {// $FlowFixMe
                      hasCustomLayout ? itemLayout(newItem) : <DefaultLayout {...newItem} />}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

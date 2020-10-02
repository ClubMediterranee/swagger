/**
 * @jest-environment jsdom
 */
import React from 'react'
import { mount, shallow } from 'enzyme'

import { ARROW_DOWN, ARROW_UP, ENTER } from '../../utils/keys-codes/keyCodes'
import VALIDATION_STATES from '../../utils/form/validationStates.enum'

import { InputText } from '../input-text/InputText.jsx'

import { InputDatalist } from './InputDatalist.jsx'
import { ReactComponent as CROSS } from '../../statics/svg/cross.svg'
import { ReactComponent as TRIDENT1 } from '../../statics/svg/trident1.svg'
import { ReactComponent as TRIDENT2 } from '../../statics/svg/trident2.svg'
import { ReactComponent as TRIDENT3 } from '../../statics/svg/trident3.svg'
import { ReactComponent as MAP_ROTATE_LEFT } from '../../statics/svg/map_rotate_left.svg'
import { ReactComponent as MAP_ROTATE_RIGHT } from '../../statics/svg/map_rotate_right.svg'

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const options = [
  {
    iconSvg: CROSS,
    label: 'label0',
    subLabel1: 'sublabel01',
    subLabel2: 'sublabel02',
    type: 'resort'
  },
  {
    iconSvg: TRIDENT1,
    label: 'label1',
    input: 'input label',
    subLabel1: 'sublabel11',
    subLabel2: 'sublabel12',
    type: 'villa'
  },
  {
    iconSvg: TRIDENT2,
    label: 'label2',
    subLabel1: 'sublabel21',
    subLabel2: 'sublabel22'
  }
]

describe('InputDatalist Component', () => {
  describe('InputText', () => {
    it('should render a InputText component', () => {
      const component = shallow(<InputDatalist/>)
      expect(component.find(InputText)).toHaveLength(1)
    })

    it('should spread props to InputText component', () => {
      const props = {
        hasClear: true,
        iconLeft: MAP_ROTATE_LEFT,
        iconRight: MAP_ROTATE_RIGHT,
        id: 'myId',
        isDisabled: true,
        isLoading: true,
        isReadOnly: true,
        isRequired: true,
        label: 'myLabel',
        name: 'myName',
        notes: 'myNotes',
        onBlur: () => {
        },
        onClick: () => {
        },
        onKeyUp: () => {
        },
        placeholder: 'myPlaceholder',
        size: 'small',
        theme: 'default',
        validationState: VALIDATION_STATES.IS_INVALID
      }
      const component = shallow(<InputDatalist {...props} />)
      expect(component.find(InputText).props()).toMatchObject(props)
    })

    it('should have an input with #autocomplete off', () => {
      const component = shallow(<InputDatalist/>)
      expect(component.find(InputText).prop('autoComplete')).toEqual('off')
    })

    it('should spread onChange method to InputText', () => {
      const component = shallow(<InputDatalist/>)
      const { onChange } = component.instance()
      expect(component.find(InputText).prop('onChange')).toEqual(onChange)
    })

    it('should spread onClear method to InputText', () => {
      const component = shallow(<InputDatalist/>)
      const { onClear } = component.instance()
      expect(component.find(InputText).prop('onClear')).toEqual(onClear)
    })

    it('should spread onFocus method to InputText', () => {
      const component = shallow(<InputDatalist/>)
      const { onFocus } = component.instance()
      expect(component.find(InputText).prop('onFocus')).toEqual(onFocus)
    })

    it('should spread onKeyDown method to InputText', () => {
      const component = shallow(<InputDatalist/>)
      const { onKeyDown } = component.instance()
      expect(component.find(InputText).prop('onKeyDown')).toEqual(onKeyDown)
    })

    it('should have an input of #type text', () => {
      const component = shallow(<InputDatalist/>)
      expect(component.find(InputText).prop('type')).toEqual('text')
    })

    describe('InputText #isActive setting', () => {
      it('should have InputText #isActive false when isActive state is false', () => {
        const component = shallow(<InputDatalist/>)
        component.setState({ isActive: false })
        expect(component.find(InputText).prop('isActive')).toBe(false)
      })

      it('should have InputText #isActive true when isActive state is true', () => {
        const component = shallow(<InputDatalist/>)
        component.setState({ isActive: true })
        expect(component.find(InputText).prop('isActive')).toBe(true)
      })
    })

    describe('InputText #value setting', () => {
      it('should have InputText #value as empty string by default', () => {
        const component = shallow(<InputDatalist/>)
        expect(component.find(InputText).prop('value')).toEqual('')
      })

      it('should have InputText #value equal to selected state', async () => {
        const component = shallow(<InputDatalist/>)
        component.setState({ selected: 'test value' }, () => {
          expect(component.find(InputText).prop('value')).toEqual('test value')
        })
      })

      it('should have InputText #value equal to value prop', () => {
        const component = shallow(<InputDatalist value="test value"/>)
        expect(component.find(InputText).prop('value')).toEqual('test value')
      })
    })
  })

  describe('callbacks', () => {
    it('should call an onBlur prop when it has an onBlur prop', () => {
      const component = mount(<InputDatalist onBlur={jest.fn()}/>)
      component.find('input').simulate('blur')
      expect(component.props().onBlur).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call an onChange prop when it has an onChange prop', async () => {
      const onChange = jest.fn()
      const component = mount(<InputDatalist name="myName" onChange={onChange}/>)
      component.find('input').simulate('change', { target: { value: 'value' } })
      await delay(200)
      expect(component.props().onChange).toHaveBeenCalledTimes(1)
      expect(component.props().onChange).toHaveBeenCalledWith('myName', 'value')
      component.unmount()
    })

    it('should call an onClear prop when it has an onClear prop', () => {
      const component = mount(<InputDatalist onClear={jest.fn()}/>)
      component.instance().onClear()
      expect(component.props().onClear).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call an onClick prop when it has an onClick prop', () => {
      const component = mount(<InputDatalist onClick={jest.fn()}/>)
      component.find('input').simulate('click')
      expect(component.props().onClick).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call an onFocus prop when it has an onFocus prop', () => {
      const component = mount(<InputDatalist onFocus={jest.fn()}/>)
      component.find('input').simulate('focus')
      expect(component.props().onFocus).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call an onKeyDown prop when it has an onKeyDown prop', () => {
      const component = mount(<InputDatalist onKeyDown={jest.fn()}/>)
      component.find('input').simulate('keyDown')
      expect(component.props().onKeyDown).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call an onKeyUp prop when it has an onKeyUp prop', () => {
      const component = mount(<InputDatalist onKeyUp={jest.fn()}/>)
      component.find('input').simulate('keyUp')
      expect(component.props().onKeyUp).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call an onSelect prop when it has an onSelect prop', () => {
      const component = mount(<InputDatalist onSelect={jest.fn()}/>)
      component.instance().onSelect()
      expect(component.props().onSelect).toHaveBeenCalledTimes(1)
      expect(component.props().onSelect).toHaveBeenCalledWith({ item: undefined, label: '' })
      component.unmount()
    })
  })

  describe('options displaying', () => {
    describe('openList method', () => {
      it('should set isActive to true when openList method has been called', () => {
        const component = shallow(<InputDatalist/>)
        expect(component.state().isActive).toBe(false)
        component.instance().openList()
        expect(component.state().isActive).toBe(true)
      })

      it('should not set isActive to false when openList method has been called and isActive state already true', () => {
        const component = shallow(<InputDatalist/>)
        expect(component.state().isActive).toBe(false)
        component.instance().openList()
        expect(component.state().isActive).toBe(true)
        component.instance().openList()
        expect(component.state().isActive).toBe(true)
      })
    })

    it('should not open list when input get focus but options is empty', () => {
      const component = mount(<InputDatalist options={[]}/>)
      component.find('input').simulate('focus')
      expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(0)
      component.unmount()
    })

    describe('when it has options', () => {
      it('should open list when input get focus', () => {
        const component = mount(<InputDatalist options={options}/>)
        expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(0)
        component.find('input').simulate('focus')
        expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(1)
        component.unmount()
      })

      it('should not open list when input get focus but it is isReadOnly', () => {
        const component = mount(<InputDatalist isReadOnly options={options}/>)
        expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(0)
        component.find('input').simulate('focus')
        expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(0)
        component.unmount()
      })

      it('should not open list when input get focus but it is isDisabled', () => {
        const component = mount(<InputDatalist isDisabled options={options}/>)
        expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(0)
        component.find('input').simulate('focus')
        expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(0)
        component.unmount()
      })

      it('should not open list when input get focus but it is isLoading', () => {
        const component = mount(<InputDatalist isLoading options={options}/>)
        expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(0)
        component.find('input').simulate('focus')
        expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(0)
        component.unmount()
      })

      describe('a11y', () => {
        it('should have a list with listbox role', () => {
          const component = mount(<InputDatalist options={options}/>)
          component.find('input').simulate('focus')
          expect(component.find('[data-testid="InputDatalistList"]').prop('role')).toEqual(
            'listbox'
          )
          component.unmount()
        })
      })

      describe('class', () => {
        it('should have a list with fadeIn class when isAnimated is true', () => {
          const component = mount(<InputDatalist isAnimated options={options}/>)
          component.find('input').simulate('focus')
          expect(component.find('[data-testid="InputDatalistList"]').parent().hasClass('fadeIn')).toBe(true)
          component.unmount()
        })

        it('should not have a list with fadeIn class when isAnimated is false', () => {
          const component = mount(<InputDatalist isAnimated={false} options={options}/>)
          component.find('input').simulate('focus')
          expect(component.find('[data-testid="InputDatalistList"]').hasClass('fadeIn')).toBe(
            false
          )
          component.unmount()
        })
      })

      describe('items rendering', () => {
        let component

        beforeEach(() => {
          component = mount(<InputDatalist options={options}/>)
          component.find('input').simulate('focus')
        })

        afterEach(() => {
          component.unmount()
        })

        it('should render as many items as options length', () => {
          expect(component.find('[data-testid="InputDatalistList"] li').length).toEqual(
            options.length
          )
        })

        it('should not render items with no label', () => {
          component.setProps({
            options: [
              ...options,
              {
                icon: TRIDENT3,
                subLabel1: 'sublabel11',
                subLabel2: 'sublabel12',
                type: 'villa'
              }
            ]
          })
          expect(component.find('[data-testid="InputDatalistList"] li').length).toEqual(
            options.length
          )
        })
      })
    })
  })

  describe('options selection', () => {
    let component
    let input
    let onKeyDown
    let instanceOnKeyDown
    let instanceOnSelect
    let onSelect
    let onValidate

    beforeEach(() => {
      onKeyDown = jest.fn()
      onSelect = jest.fn()
      onValidate = jest.fn()
      component = mount(
        <InputDatalist
          onKeyDown={onKeyDown}
          onSelect={onSelect}
          onValidate={onValidate}
          options={options}
        />
      )
      instanceOnKeyDown = jest.spyOn(component.instance(), 'onKeyDown')
      instanceOnSelect = jest.spyOn(component.instance(), 'onSelect')
      input = component.find('input')
      input.simulate('focus')
    })

    afterEach(() => {
      component.unmount()
    })

    describe('when an item from list has been clicked', () => {
      it('should call onSelect with list item', () => {
        component
          .find('[data-testid="InputDatalistList"] li')
          .at(1)
          .simulate('click')
        const sanitizedItem = {
          ...options[1],
          label: options[1].label
        }
        expect(component.state('isActive')).toBe(false)
        expect(component.state('index')).toEqual(-1)
        expect(component.state('selected')).toEqual(options[1].input)
        expect(instanceOnSelect).toHaveBeenCalledWith(options[1])
        expect(onSelect).toHaveBeenCalledWith(sanitizedItem)
      })
    })

    describe('when keyboard is used', () => {
      it('should call onKeyDown callback when input get a keyDown event', () => {
        input.simulate('keyDown')
        expect(instanceOnKeyDown).toHaveBeenCalledTimes(1)
        expect(onKeyDown).toHaveBeenCalledTimes(1)
      })

      it('should have -1 at initial index', () => {
        expect(component.state('index')).toEqual(-1)
      })

      it('should go to next item when arrow down has been pressed', () => {
        input.simulate('keyDown', { keyCode: ARROW_DOWN })
        expect(component.state('index')).toEqual(0)
      })

      it('should not go to next item when arrow down has been pressed and it is the last item', () => {
        component.setState({ index: 3 })
        input.simulate('keyDown', { keyCode: ARROW_DOWN })
        expect(component.state('index')).toEqual(3)
      })

      it('should go to previous item when arrow up has been pressed', () => {
        component.setState({ index: 2 })
        input.simulate('keyDown', { keyCode: ARROW_UP })
        expect(component.state('index')).toEqual(1)
      })

      it('should not go to previous item when arrow up has been pressed and it is the first item', () => {
        component.setState({ index: 0 })
        input.simulate('keyDown', { keyCode: ARROW_UP })
        expect(component.state('index')).toEqual(0)
      })

      it('should call onValidate with no item when ENTER is hit for input', () => {
        input.simulate('keydown', { keyCode: ENTER })
        expect(component.state('isActive')).toBe(false)
        expect(onValidate).toHaveBeenCalledTimes(1)
      })

      it('should call onSelect with item when ENTER is hit from list', () => {
        input.simulate('keyDown', { keyCode: ARROW_DOWN })
        input.simulate('keydown', { keyCode: ENTER })
        const sanitizedItem = {
          ...options[0],
          label: options[0].label
        }
        expect(component.state('isActive')).toBe(false)
        expect(component.state('index')).toEqual(-1)
        expect(component.state('selected')).toEqual(options[0].label)
        expect(instanceOnSelect).toHaveBeenCalledWith(options[0])
        expect(onSelect).toHaveBeenCalledWith(sanitizedItem)
      })
    })
  })

  describe('when it has change event', () => {
    let onChange
    let component
    let input

    beforeEach(async () => {
      onChange = jest.fn()
      component = mount(<InputDatalist name="myName" onChange={onChange} options={options}/>)
      input = component.find('input')
      input.simulate('focus')
      input.simulate('change', { target: { value: 'test' } })

      await delay(200)
    })

    afterEach(() => {
      onChange.mockRestore()
      component.unmount()
    })

    it('should display options', () => {
      expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(1)
      expect(component.state('isActive')).toBe(true)
    })

    it('should call onChange callback with name and value', () => {
      expect(onChange).toHaveBeenCalledWith('myName', 'test')
    })
  })

  describe('when input is cleared', () => {
    let onClear
    let component
    let input

    beforeEach(() => {
      onClear = jest.fn()
      component = mount(<InputDatalist onClear={onClear} options={options} value="test"/>)
      input = component.find('input')
      input.simulate('focus')
    })

    afterEach(() => {
      onClear.mockRestore()
      component.unmount()
    })

    it('should reset value', () => {
      expect(component.find(InputText).prop('value')).toEqual('test')
      expect(component.state('selected')).toEqual('test')
      component.instance().onClear()
      component.update()
      expect(component.find(InputText).prop('value')).toEqual('')
      expect(component.state('selected')).toEqual('')
    })

    it('should reset options', () => {
      expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(1)
      expect(component.state('isActive')).toBe(true)
      component.instance().onClear()
      component.update()
      expect(component.find('[data-testid="InputDatalistList"]')).toHaveLength(0)
      expect(component.state('isActive')).toBe(false)
    })
  })
})

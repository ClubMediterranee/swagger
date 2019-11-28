/**
 * @jest-environment jsdom
 */
import React from 'react'
import { mount, shallow } from 'enzyme'

import VALIDATION_STATES from '../../utils/form/validationStates.enum'

import { FormControl } from '../form-control/FormControl.jsx'
import { Icon } from '../icon/Icon.jsx'
import { ReactComponent as MAP_ROTATE_LEFT } from '../../statics/svg/map_rotate_left.svg'
import { ReactComponent as MAP_ROTATE_RIGHT } from '../../statics/svg/map_rotate_right.svg'

import { InputText } from './InputText.jsx'

describe('InputText Component', () => {
  describe('a11y', () => {
    it('should have a textbox role by default on input', () => {
      const component = shallow(<InputText/>)
      expect(component.find('input').prop('role')).toEqual('textbox')
    })

    it('should have a search role on input when it has search #type', () => {
      const component = shallow(<InputText type="search"/>)
      expect(component.find('input').prop('role')).toEqual('search')
    })
  })

  describe('FormControl', () => {
    it('should render a FormControl component', () => {
      const component = shallow(<InputText/>)
      expect(component.find(FormControl)).toHaveLength(1)
    })

    it('should spread props to FormControl component', () => {
      const props = {
        iconLeft: MAP_ROTATE_LEFT,
        iconRight: MAP_ROTATE_RIGHT,
        id: 'myId',
        isActive: true,
        isDisabled: true,
        isLoading: true,
        isReadOnly: true,
        isRequired: true,
        label: 'myLabel',
        notes: 'myNotes',
        size: 'small',
        theme: 'default',
        validationState: VALIDATION_STATES.IS_INVALID
      }
      const component = shallow(<InputText {...props} />)
      expect(component.find(FormControl).props()).toMatchObject(props)
    })

    it('should spread onClear method to FormControl', () => {
      const component = shallow(<InputText/>)
      const { onClear } = component.instance()
      expect(component.find(FormControl).prop('onClear')).toEqual(onClear)
    })

    describe('FormControl hasClear setting', () => {
      it('should have FormControl #hasClear false when #hasClear is false', () => {
        const component = shallow(<InputText hasClear={false}/>)
        expect(component.find(FormControl).prop('hasClear')).toBe(false)
      })

      it('should have FormControl #hasClear false when #hasClear is false and #value is empty', () => {
        const component = shallow(<InputText hasClear={false} value=""/>)
        expect(component.find(FormControl).prop('hasClear')).toBe(false)
      })

      it('should have FormControl #hasClear false when #hasClear is false and #value is not empty', () => {
        const component = shallow(<InputText hasClear={false} value="value"/>)
        expect(component.find(FormControl).prop('hasClear')).toBe(false)
      })

      it('should have FormControl #hasClear false when #hasClear is true and #value is empty', () => {
        const component = shallow(<InputText hasClear value=""/>)
        expect(component.find(FormControl).prop('hasClear')).toBe(false)
      })

      it('should have FormControl #hasClear true when #hasClear is true and #value is not empty', () => {
        const component = shallow(<InputText hasClear value="value"/>)
        expect(component.find(FormControl).prop('hasClear')).toBe(true)
      })
    })
  })

  describe('input settings', () => {
    describe('#autocomplete', () => {
      it('should have an input with off autocomplete when #autoComplete set to off', () => {
        const component = shallow(<InputText autoComplete="off"/>)
        expect(component.find('input').prop('autoComplete')).toEqual('off')
      })

      it('should have an input with on autocomplete when #autoComplete set to on', () => {
        const component = shallow(<InputText autoComplete="on"/>)
        expect(component.find('input').prop('autoComplete')).toEqual('on')
      })
    })

    describe('#isDisabled', () => {
      it('should have an input that is not disabled when it has i#sDisabled set to false', () => {
        const component = shallow(<InputText isDisabled={false}/>)
        expect(component.find('input').prop('disabled')).toBe(false)
      })

      it('should have an input that is disabled when it has #isDisabled set to true', () => {
        const component = shallow(<InputText isDisabled/>)
        expect(component.find('input').prop('disabled')).toBe(true)
      })
    })

    describe('#id', () => {
      it('should have an input with a custom id when it has #id', () => {
        const component = shallow(<InputText id="myId"/>)
        expect(component.find('input').prop('id')).toEqual('myId')
      })

      it('should have an input with random id when it has no #id', () => {
        const component = shallow(<InputText/>)
        expect(component.find('input').prop('id')).not.toBeUndefined()
      })
    })

    describe('#maxLength', () => {
      it('should have an input with maxLength when it has #maxLength', () => {
        const component = shallow(<InputText maxLength={20}/>)
        expect(component.find('input').prop('maxLength')).toEqual(20)
      })

      it('should have an input without maxLength when it has no #maxLength', () => {
        const component = shallow(<InputText/>)
        expect(component.find('input').prop('maxLength')).toBeUndefined()
      })

      it('should have an input without maxLength when it has invalid no integer #maxLength', () => {
        const component = shallow(<InputText maxLength={2.6}/>)
        expect(component.find('input').prop('maxLength')).toBeUndefined()
      })
    })

    describe('#minLength', () => {
      it('should have an input with minLength when it has #minLength', () => {
        const component = shallow(<InputText minLength={1}/>)
        expect(component.find('input').prop('minLength')).toEqual(1)
      })

      it('should have an input without minLength when it has no #minLength', () => {
        const component = shallow(<InputText/>)
        expect(component.find('input').prop('minLength')).toBeUndefined()
      })

      it('should have an input without minLength when it has invalid no integer #minLength', () => {
        const component = shallow(<InputText minLength={2.6}/>)
        expect(component.find('input').prop('minLength')).toBeUndefined()
      })
    })

    describe('#name', () => {
      it('should have an input with a name when it has #name', () => {
        const component = shallow(<InputText name="myName"/>)
        expect(component.find('input').prop('name')).toEqual('myName')
      })

      it('should have an input without name when it has no #name', () => {
        const component = shallow(<InputText/>)
        expect(component.find('input').prop('name')).toBeUndefined()
      })
    })

    describe('#pattern', () => {
      it('should have an input with a pattern when it has #pattern', () => {
        const component = shallow(<InputText pattern="[A-Za-z]{3}"/>)
        expect(component.find('input').prop('pattern')).toEqual('[A-Za-z]{3}')
      })

      it('should have an input without pattern when it has no #pattern', () => {
        const component = shallow(<InputText/>)
        expect(component.find('input').prop('pattern')).toBeUndefined()
      })
    })

    describe('#placeholder', () => {
      it('should have an input with a placeholder when it has #placeholder', () => {
        const component = shallow(<InputText placeholder="Enter value here"/>)
        expect(component.find('input').prop('placeholder')).toEqual('Enter value here')
      })

      it('should have required marked placeholder when it has #placeholder and #isRequired true', () => {
        const component = shallow(<InputText isRequired placeholder="Enter value here"/>)
        expect(component.find('input').prop('placeholder')).toEqual('Enter value here*')
      })

      it('should have an input without placeholder when it has no #placeholder', () => {
        const component = shallow(<InputText/>)
        expect(component.find('input').prop('placeholder')).toBeUndefined()
      })
    })

    describe('#isReadOnly', () => {
      it('should have an input that is not readOnly when it has #isReadOnly set to false', () => {
        const component = shallow(<InputText isReadOnly={false}/>)
        expect(component.find('input').prop('readOnly')).toBe(false)
      })

      it('should have an input that is readOnly when it has #isReadOnly set to true', () => {
        const component = shallow(<InputText isReadOnly/>)
        expect(component.find('input').prop('readOnly')).toBe(true)
      })

      it('should have an input that is readOnly when it has #isLoading set to true', () => {
        const component = shallow(<InputText isLoading/>)
        expect(component.find('input').prop('readOnly')).toBe(true)
      })

      it('should have an input that is readOnly when it has #isNotEditable set to true', () => {
        const component = shallow(<InputText isNotEditable/>)
        expect(component.find('input').prop('readOnly')).toBe(true)
      })
    })

    describe('#isRequired', () => {
      it('should have an input that is not required when it has #isRequired set to false', () => {
        const component = shallow(<InputText isRequired={false}/>)
        expect(component.find('input').prop('required')).toBe(false)
      })

      it('should have an input that is required when it has #isRequired set to true', () => {
        const component = shallow(<InputText isRequired/>)
        expect(component.find('input').prop('required')).toBe(true)
      })
    })

    describe('#type', () => {
      it('should have an input with default text type when it has no #type', () => {
        const component = shallow(<InputText/>)
        expect(component.find('input').prop('type')).toEqual('text')
      })

      it('should have an input with custom type when it has #type', () => {
        const component = shallow(<InputText type="search"/>)
        expect(component.find('input').prop('type')).toEqual('search')
      })
    })
  })

  describe('callbacks', () => {
    it('should call #onBlur prop when it has #onBlur', () => {
      const component = mount(<InputText onBlur={jest.fn()}/>)
      component.find('input').simulate('blur')
      expect(component.props().onBlur).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call #onChange with args when it has #onChange', () => {
      const component = mount(<InputText onChange={jest.fn()} name="myName"/>)
      component.find('input').simulate('change', { target: { value: 'value' } })
      expect(component.props().onChange).toHaveBeenCalledTimes(1)
      expect(component.props().onChange).toHaveBeenCalledWith('myName', 'value')
      component.unmount()
    })

    it('should call #onClick when it has #onClick', () => {
      const component = mount(<InputText onClick={jest.fn()}/>)
      component.find('input').simulate('click')
      expect(component.props().onClick).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call #onFocus when it has #onFocus', () => {
      const component = mount(<InputText onFocus={jest.fn()}/>)
      component.find('input').simulate('focus')
      expect(component.props().onFocus).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call #onKeyDown when it has #onKeyDown', () => {
      const component = mount(<InputText onKeyDown={jest.fn()}/>)
      component.find('input').simulate('keyDown')
      expect(component.props().onKeyDown).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call #onKeyUp when it has #onKeyUp', () => {
      const component = mount(<InputText onKeyUp={jest.fn()}/>)
      component.find('input').simulate('keyUp')
      expect(component.props().onKeyUp).toHaveBeenCalledTimes(1)
      component.unmount()
    })
  })

  describe('#onClear', () => {
    it('should reset value when onClear is called', () => {
      const component = mount(<InputText value="myValue"/>)
      expect(component.state('value')).toEqual('myValue')
      expect(component.find('input').prop('value')).toEqual('myValue')
      component.instance().onClear()
      component.update()
      expect(component.state('value')).toEqual('')
      expect(component.find('input').prop('value')).toEqual('')
      component.unmount()
    })

    it('should call #onClear callback when onClear is called', () => {
      const component = mount(<InputText onClear={jest.fn()}/>)
      component.instance().onClear()
      expect(component.props().onClear).toHaveBeenCalledTimes(1)
      component.unmount()
    })
  })

  describe('value state management', () => {
    it('should have empty value by default', () => {
      const component = shallow(<InputText/>)
      expect(component.state('value')).toEqual('')
      expect(component.find('input').prop('value')).toEqual('')
    })

    it('should have value when it has #value', () => {
      const component = shallow(<InputText value="myValue"/>)
      expect(component.state('value')).toEqual('myValue')
      expect(component.find('input').prop('value')).toEqual('myValue')
    })

    it('should have new value when it has been changed', () => {
      const component = mount(<InputText value="initialValue"/>)
      expect(component.find('input').prop('value')).toEqual('initialValue')
      component.find('input').simulate('change', { target: { value: 'newValue' } })
      expect(component.find('input').prop('value')).toEqual('newValue')
      component.unmount()
    })

    describe('when it has #isReadOnly true', () => {
      it('should not change value', () => {
        const component = mount(<InputText value="value1" isReadOnly/>)
        expect(component.find('input').prop('value')).toEqual('value1')
        component.find('input').simulate('change', { target: { value: 'value2' } })
        expect(component.find('input').prop('value')).toEqual('value1')
        component.unmount()
      })
    })

    describe('when it has #isLoading true', () => {
      it('should not change value', () => {
        const component = mount(<InputText value="value1" isLoading/>)
        expect(component.find('input').prop('value')).toEqual('value1')
        component.find('input').simulate('change', { target: { value: 'value2' } })
        expect(component.find('input').prop('value')).toEqual('value1')
        component.unmount()
      })
    })
  })

  describe('toggler', () => {
    it('should not render a toggler Button when it has #hasTypeToggler true', () => {
      const component = shallow(<InputText hasTypeToggler={false}/>)
      expect(component.find('[data-testid="InputTextToggler"]')).toHaveLength(0)
    })

    it('should render a toggler Button when it has #hasTypeToggler true', () => {
      const component = shallow(<InputText hasTypeToggler/>)
      expect(component.find('[data-testid="InputTextToggler"]')).toHaveLength(1)
    })

    it('should switch input type when toggler has been clicked', () => {
      const component = shallow(
        <InputText
          hasTypeToggler
          type="search"
          typeToggler={{
            antiIcon: MAP_ROTATE_LEFT,
            antiType: 'url',
            icon: MAP_ROTATE_RIGHT
          }}
        />
      )
      expect(component.find('input').prop('type')).toEqual('search')
      expect(
        component
          .find('[data-testid="InputTextToggler"]')
          .find(Icon)
          .prop('svg')
      ).toEqual(MAP_ROTATE_RIGHT)
      component.find('[data-testid="InputTextToggler"]').simulate('click')
      expect(component.find('input').prop('type')).toEqual('url')
      expect(
        component
          .find('[data-testid="InputTextToggler"]')
          .find(Icon)
          .prop('svg')
      ).toEqual(MAP_ROTATE_LEFT)
    })
  })
})

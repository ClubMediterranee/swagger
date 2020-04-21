/**
 * @jest-environment jsdom
 */
import React from 'react'
import { mount, shallow } from 'enzyme'

import VALIDATION_STATES from '../../utils/form/validationStates.enum'
import { Icon } from '../icon/Icon.jsx'
import { FormControl } from '../form-control/FormControl.jsx'

import { InputSelect } from './InputSelect.jsx'
import { ReactComponent as MAP_ROTATE_LEFT } from '../../statics/svg/map_rotate_left.svg'
import { ReactComponent as MAP_ROTATE_RIGHT } from '../../statics/svg/map_rotate_right.svg'
import { ReactComponent as SELECT } from '../../statics/svg/select.svg'

describe('InputSelect Component', () => {
  describe('FormControl', () => {
    it('should render a FormControl component', () => {
      const component = shallow(<InputSelect/>)
      expect(component.find(FormControl)).toHaveLength(1)
    })

    it('should spread props to FormControl component', () => {
      const props = {
        iconLeft: MAP_ROTATE_LEFT,
        iconRight: MAP_ROTATE_RIGHT,
        id: 'myId',
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
      const component = shallow(<InputSelect {...props} />)
      expect(component.find(FormControl).props()).toMatchObject(props)
    })

    it('should spread onClear method to FormControl', () => {
      const component = shallow(<InputSelect/>)
      const { onClear } = component.instance()
      expect(component.find(FormControl).prop('onClear')).toEqual(onClear)
    })

    describe('FormControl hasClear setting', () => {
      it('should have FormControl #hasClear false when #hasClear is false', () => {
        const component = shallow(<InputSelect hasClear={false}/>)
        expect(component.find(FormControl).prop('hasClear')).toBe(false)
      })

      it('should have FormControl #hasClear false when #hasClear is false and #value is empty', () => {
        const component = shallow(<InputSelect hasClear={false} value=""/>)
        expect(component.find(FormControl).prop('hasClear')).toBe(false)
      })

      it('should have FormControl #hasClear false when #hasClear is false and #value is not empty', () => {
        const component = shallow(<InputSelect hasClear={false} value="value"/>)
        expect(component.find(FormControl).prop('hasClear')).toBe(false)
      })

      it('should have FormControl #hasClear false when #hasClear is true and #value is empty', () => {
        const component = shallow(<InputSelect hasClear value=""/>)
        expect(component.find(FormControl).prop('hasClear')).toBe(false)
      })

      it('should have FormControl #hasClear true when #hasClear is true and #value is not empty', () => {
        const component = shallow(<InputSelect hasClear value="value"/>)
        expect(component.find(FormControl).prop('hasClear')).toBe(true)
      })
    })
  })

  describe('caret', () => {
    it('should have a caret with default icon', () => {
      const component = shallow(<InputSelect/>)
      expect(
        component
          .find('[data-testid="InputSelectCaret"]')
          .find(Icon)
          .prop('svg')
      ).toEqual(SELECT)
    })

    it('should have a caret with custom icon', () => {
      const component = shallow(<InputSelect caretIcon="custom"/>)
      expect(
        component
          .find('[data-testid="InputSelectCaret"]')
          .find(Icon)
          .prop('svg')
      ).toEqual('custom')
    })
  })

  describe('select settings', () => {
    describe('#isDisabled', () => {
      it('should have a select that is not disabled when it has #isDisabled set to false', () => {
        const component = shallow(<InputSelect isDisabled={false}/>)
        expect(component.find('select').prop('disabled')).toBe(false)
      })

      it('should have a select that is disabled when it has #isDisabled set to true', () => {
        const component = shallow(<InputSelect isDisabled/>)
        expect(component.find('select').prop('disabled')).toBe(true)
      })
    })

    describe('#id', () => {
      it('should have an input with a custom id when it has #id', () => {
        const component = shallow(<InputSelect id="myId"/>)
        expect(component.find('select').prop('id')).toEqual('myId')
      })

      it('should have an input with random id when it has no #id', () => {
        const component = shallow(<InputSelect/>)
        expect(component.find('select').prop('id')).not.toBeUndefined()
      })
    })

    describe('#name', () => {
      it('should have a select with a name when it has #name', () => {
        const component = shallow(<InputSelect name="myName"/>)
        expect(component.find('select').prop('name')).toEqual('myName')
      })

      it('should have a select without name when it has no #name', () => {
        const component = shallow(<InputSelect/>)
        expect(component.find('select').prop('name')).toBeUndefined()
      })
    })

    describe('#isReadOnly', () => {
      it('should have a select that is not disabled when it has #isReadOnly set to false', () => {
        const component = shallow(<InputSelect isReadOnly={false}/>)
        expect(component.find('select').prop('disabled')).toBe(false)
      })

      it('should have a select that is disabled when it has #isReadOnly set to true', () => {
        const component = shallow(<InputSelect isReadOnly/>)
        expect(component.find('select').prop('disabled')).toBe(true)
      })

      it('should have a select that is disabled when it has #isLoading set to true', () => {
        const component = shallow(<InputSelect isLoading/>)
        expect(component.find('select').prop('disabled')).toBe(true)
      })
    })

    describe('#isRequired', () => {
      it('should have a select that is not required when it has #isRequired set to false', () => {
        const component = shallow(<InputSelect isRequired={false}/>)
        expect(component.find('select').prop('required')).toBe(false)
      })

      it('should have a select that is required when it has #isRequired set to true', () => {
        const component = shallow(<InputSelect isRequired/>)
        expect(component.find('select').prop('required')).toBe(true)
      })
    })
  })

  describe('#placeholder', () => {
    it('should have a select with an option placeholder when it has #placeholder', () => {
      const component = shallow(<InputSelect placeholder="Enter value here"/>)
      const option = component
        .find('select')
        .find('option')
        .at(0)
      expect(option.text()).toEqual('Enter value here')
      expect(option.prop('label')).toEqual('Enter value here')
    })

    it('should have a select with an option placeholder disabled with empty value', () => {
      const component = shallow(<InputSelect placeholder="Enter value here"/>)
      const option = component
        .find('select')
        .find('option')
        .at(0)
      expect(option.prop('value')).toEqual('')
      expect(option.prop('disabled')).toBe(true)
    })

    it('should have required marked placeholder when it has #placeholder and #isRequired true', () => {
      const component = shallow(<InputSelect isRequired placeholder="Enter value here"/>)
      const option = component
        .find('select')
        .find('option')
        .at(0)
      expect(option.text()).toEqual('Enter value here*')
      expect(option.prop('label')).toEqual('Enter value here*')
    })
  })

  describe('callbacks', () => {
    it('should call onBlur when it has #onBlur', () => {
      const component = mount(<InputSelect onBlur={jest.fn()}/>)
      component.find('select').simulate('blur')
      expect(component.props().onBlur).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call #onChange with args when it has #onChange', () => {
      const component = mount(<InputSelect onChange={jest.fn()} name="myName"/>)
      component.find('select').simulate('change', { target: { value: 'option2' } })
      expect(component.props().onChange).toHaveBeenCalledTimes(1)
      expect(component.props().onChange).toHaveBeenCalledWith('myName', 'option2')
      component.unmount()
    })

    it('should call #onClick when it has #onClick', () => {
      const component = mount(<InputSelect onClick={jest.fn()}/>)
      component.find('select').simulate('click')
      expect(component.props().onClick).toHaveBeenCalledTimes(1)
      component.unmount()
    })

    it('should call #onFocus when it has #onFocus', () => {
      const component = mount(<InputSelect onFocus={jest.fn()}/>)
      component.find('select').simulate('focus')
      expect(component.props().onFocus).toHaveBeenCalledTimes(1)
      component.unmount()
    })
  })

  describe('#options', () => {
    it('should have as many options as passed', () => {
      const component = shallow(
        <InputSelect
          options={[{ label: 'option1' }, { label: 'option2' }, { label: 'option3' }]}
        />
      )
      expect(component.find('option')).toHaveLength(3)
    })

    it('should not display option with no label', () => {
      const component = shallow(
        <InputSelect options={[{ label: 'option1' }, { label: '' }, { label: 'option3' }]}/>
      )
      expect(component.find('option')).toHaveLength(2)
      expect(
        component
          .find('option')
          .at(0)
          .text()
      ).toEqual('option1')
      expect(
        component
          .find('option')
          .at(1)
          .text()
      ).toEqual('option3')
    })

    it('should have option with props', () => {
      const component = shallow(
        <InputSelect
          options={[
            { label: 'option0', value: 'value0' },
            { label: 'option1', value: 'value1' },
            { label: 'option2', value: 'value2' }
          ]}
        />
      )
      component.find('option').forEach((option, index) => {
        expect(option.prop('label')).toEqual(`option${index}`)
        expect(option.prop('value')).toEqual(`value${index}`)
      })
    })

    it('should have disabled option', () => {
      const component = shallow(<InputSelect options={[{ label: 'option0', isDisabled: true }]}/>)
      expect(component.find('option').prop('disabled')).toBe(true)
    })
  })

  describe('#onClear', () => {
    it('should reset value when onClear is called', () => {
      const component = mount(<InputSelect value="myValue"/>)
      expect(component.state('value')).toEqual('myValue')
      expect(component.find('select').prop('value')).toEqual('myValue')
      component.instance().onClear()
      component.update()
      expect(component.state('value')).toEqual('')
      expect(component.find('select').prop('value')).toEqual('')
      component.unmount()
    })

    it('should call #onClear callback when onClear is called', () => {
      const component = mount(<InputSelect onClear={jest.fn()}/>)
      component.instance().onClear()
      expect(component.props().onClear).toHaveBeenCalledTimes(1)
      component.unmount()
    })
  })

  describe('value state management', () => {
    it('should have empty value by default', () => {
      const component = shallow(<InputSelect/>)
      expect(component.state('value')).toEqual('')
      expect(component.find('select').prop('value')).toEqual('')
    })

    it('should have value when it has #value', () => {
      const component = shallow(<InputSelect value="myValue"/>)
      expect(component.state('value')).toEqual('myValue')
      expect(component.find('select').prop('value')).toEqual('myValue')
    })

    it('should have new value when it has been changed', () => {
      const component = mount(<InputSelect value="initialValue"/>)
      expect(component.find('select').prop('value')).toEqual('initialValue')
      component.find('select').simulate('change', { target: { value: 'newValue' } })
      expect(component.find('select').prop('value')).toEqual('newValue')
      component.unmount()
    })

    describe('when it has #isReadOnly true', () => {
      it('should not change value', () => {
        const component = mount(<InputSelect value="option1" isReadOnly/>)
        expect(component.find('select').prop('value')).toEqual('option1')
        component.find('select').simulate('change', { target: { value: 'option2' } })
        expect(component.find('select').prop('value')).toEqual('option1')
        component.unmount()
      })
    })

    describe('when it has #isLoading true', () => {
      it('should not change value', () => {
        const component = mount(<InputSelect value="option1" isLoading/>)
        expect(component.find('select').prop('value')).toEqual('option1')
        component.find('select').simulate('change', { target: { value: 'option2' } })
        expect(component.find('select').prop('value')).toEqual('option1')
        component.unmount()
      })
    })
  })
})

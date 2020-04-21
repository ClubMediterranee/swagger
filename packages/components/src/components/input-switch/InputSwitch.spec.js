/**
 * @jest-environment jsdom
 */
import React from 'react'
import { mount, shallow } from 'enzyme'
import { Icon } from '../icon/Icon.jsx'
import { Spinner } from '../spinner/Spinner.jsx'
import { InputSwitch } from './InputSwitch.jsx'
import { ReactComponent as CHECKBOX_UNCHECKED } from '../../statics/svg/checkboxUnchecked.svg'
import { ReactComponent as CHECKBOX_CHECKED } from '../../statics/svg/checkboxChecked.svg'

describe('InputSwitch Component', () => {
  describe('input settings', () => {
    describe('#isDisabled', () => {
      it('should have an input that is not disabled when it has #isDisabled set to false', () => {
        const component = shallow(<InputSwitch isDisabled={false}/>)
        expect(component.find('input').prop('disabled')).toBe(false)
      })

      it('should have an input that is disabled when it has #isDisabled set to true', () => {
        const component = shallow(<InputSwitch isDisabled/>)
        expect(component.find('input').prop('disabled')).toBe(true)
      })
    })

    describe('#id', () => {
      it('should have an input with a custom id when it has #id', () => {
        const component = shallow(<InputSwitch id="myId"/>)
        expect(component.find('input').prop('id')).toEqual('myId')
      })

      it('should have an input with random id when it has no #id', () => {
        const component = shallow(<InputSwitch/>)
        expect(component.find('input').prop('id')).not.toBeUndefined()
      })
    })

    describe('#label', () => {
      it('should have an input with a label when it has #label', () => {
        const component = shallow(<InputSwitch label="myLabel"/>)
        expect(component.find('input').prop('label')).toEqual('myLabel')
      })

      it('should have an input without label when it has no #label', () => {
        const component = shallow(<InputSwitch/>)
        expect(component.find('input').prop('label')).toBeUndefined()
      })
    })

    describe('#name', () => {
      it('should have an input with a name when it has #name', () => {
        const component = shallow(<InputSwitch name="myName"/>)
        expect(component.find('input').prop('name')).toEqual('myName')
      })

      it('should have an input without name when it has no #name', () => {
        const component = shallow(<InputSwitch/>)
        expect(component.find('input').prop('name')).toBeUndefined()
      })
    })

    describe('#isRequired', () => {
      it('should have an input that is not required when it has #isRequired set to false', () => {
        const component = shallow(<InputSwitch isRequired={false}/>)
        expect(component.find('input').prop('required')).toBe(false)
      })

      it('should have an input that is required when it has #isRequired set to true', () => {
        const component = shallow(<InputSwitch isRequired/>)
        expect(component.find('input').prop('required')).toBe(true)
      })
    })

    describe('type', () => {
      it('should have an input with default checkbox type', () => {
        const component = shallow(<InputSwitch/>)
        expect(component.find('input').prop('type')).toEqual('checkbox')
      })
    })

    describe('#value', () => {
      it('should have an input with a value when it has #value', () => {
        const component = shallow(<InputSwitch value="myValue"/>)
        expect(component.find('input').prop('value')).toEqual('myValue')
      })

      it('should have an input without value when it has no #value', () => {
        const component = shallow(<InputSwitch/>)
        expect(component.find('input').prop('value')).toBeUndefined()
      })
    })
  })

  describe('callbacks', () => {
    it('should call an #onChange with args when it has an #onChange', () => {
      const component = mount(<InputSwitch onChange={jest.fn()} value="value" name="myName"/>)
      component.find('input').simulate('change')
      expect(component.props().onChange).toHaveBeenCalledTimes(1)
      expect(component.props().onChange).toHaveBeenCalledWith('myName', true, 'value')
      component.unmount()
    })

    it('should call an #onClick when it has an #onClick', () => {
      const component = mount(<InputSwitch onClick={jest.fn()}/>)
      component.find('input').simulate('click')
      expect(component.props().onClick).toHaveBeenCalledTimes(1)
      component.unmount()
    })
  })

  describe('checked state management', () => {
    it('should have false checked by default', () => {
      const component = shallow(<InputSwitch/>)
      expect(component.state('isChecked')).toBe(false)
      expect(component.find('input').prop('checked')).toBe(false)
    })

    it('should have false checked when it has #isChecked false', () => {
      const component = shallow(<InputSwitch isChecked={false}/>)
      expect(component.state('isChecked')).toBe(false)
      expect(component.find('input').prop('checked')).toBe(false)
    })

    it('should have true checked when it has #isChecked true', () => {
      const component = shallow(<InputSwitch isChecked/>)
      expect(component.state('isChecked')).toBe(true)
      expect(component.find('input').prop('checked')).toBe(true)
    })

    it('should have new checked when it has been changed', () => {
      const component = mount(<InputSwitch isChecked/>)
      expect(component.find('input').prop('checked')).toBe(true)
      component.find('input').simulate('change')
      expect(component.find('input').prop('checked')).toBe(false)
      component.unmount()
    })

    describe('when it has #isReadOnly true', () => {
      it('should not change checked', () => {
        const component = mount(<InputSwitch isChecked isReadOnly/>)
        expect(component.find('input').prop('checked')).toBe(true)
        component.find('input').simulate('change')
        expect(component.find('input').prop('checked')).toBe(true)
        component.unmount()
      })
    })

    describe('when it has #isDisabled true', () => {
      it('should not change checked', () => {
        const component = mount(<InputSwitch isChecked isDisabled/>)
        expect(component.find('input').prop('checked')).toBe(true)
        component.find('input').simulate('change')
        expect(component.find('input').prop('checked')).toBe(true)
        component.unmount()
      })
    })

    describe('when it has #isLoading true', () => {
      it('should not change checked', () => {
        const component = mount(<InputSwitch isChecked isLoading/>)
        expect(component.find('input').prop('checked')).toBe(true)
        component.find('input').simulate('change')
        expect(component.find('input').prop('checked')).toBe(true)
        component.unmount()
      })
    })
  })

  describe('loader', () => {
    it('should not have Spinner when it has #isLoading false', () => {
      const component = shallow(<InputSwitch isLoading={false}/>)
      expect(component.find(Spinner)).toHaveLength(0)
    })

    it('should have Spinner when it has #isLoading true', () => {
      const component = shallow(<InputSwitch isLoading/>)
      expect(component.find(Spinner)).toHaveLength(1)
    })
  })

  xdescribe('#label', () => {
    it('should not have label when it has no #label', () => {
      const component = shallow(<InputSwitch/>)
      expect(component.find('label')).toHaveLength(0)
    })

    it('should have label with htmlFor when it has #id and #label', () => {
      const component = shallow(<InputSwitch id="myId" label="label"/>)
      expect(component.find('label')).toHaveLength(1)
      expect(component.find('label').prop('htmlFor')).toEqual('myId')
      expect(component.find('input').prop('id')).toEqual('myId')
    })
  })

  describe('when it has custom check icons', () => {
    it('should switch icons on change', () => {
      const component = mount(
        <InputSwitch
          iconUnChecked={CHECKBOX_UNCHECKED}
          iconChecked={CHECKBOX_CHECKED}
        />
      )
      expect(component.find(Icon).prop('svg')).toEqual(CHECKBOX_UNCHECKED)
      component.find('input').simulate('change')
      expect(component.find(Icon).prop('svg')).toEqual(CHECKBOX_CHECKED)
      component.unmount()
    })
  })
})

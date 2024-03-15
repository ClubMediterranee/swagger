/**
 * @jest-environment jsdom
 */
import React from 'react'
import { shallow } from 'enzyme'

import { Icon } from '../icon/Icon.jsx'
import { Spinner } from '../spinner/Spinner.jsx'

import { FormControl } from './FormControl.jsx'

import { ReactComponent as BOLDER_ARROW_FORTH } from '../../statics/svg/bolderArrowForth.svg'

describe('FormControl Component', () => {
  describe('rendering', () => {
    it('should not render component when it has no #children', () => {
      const component = shallow(<FormControl/>)
      expect(component.isEmptyRender()).toBe(true)
    })

    it('should render component when it has #children', () => {
      const component = shallow(
        <FormControl>
          <div id="myId"/>
        </FormControl>
      )
      expect(component.isEmptyRender()).toBe(false)
      expect(component.find('#myId')).toHaveLength(1)
    })
  })

  describe('#iconLeft', () => {
    it('should not have Icon on left side when it has no #iconLeft', () => {
      const component = shallow(
        <FormControl iconLeft={null}>
          <div/>
        </FormControl>
      )
      expect(component.find('.FormControl-icon--left')).toHaveLength(0)
      expect(component.find(Icon)).toHaveLength(0)
    })

    it('should have Icon on left side when it has #iconLeft', () => {
      const component = shallow(
        <FormControl iconLeft={BOLDER_ARROW_FORTH}>
          <div/>
        </FormControl>
      )
      expect(component.find(Icon).prop('svg')).toEqual(BOLDER_ARROW_FORTH)
    })
  })

  describe('#iconRight', () => {
    it('should not have Icon on right side when it has no #iconRight', () => {
      const component = shallow(
        <FormControl iconRight={null}>
          <div/>
        </FormControl>
      )
      expect(component.find('.FormControl-icon--right')).toHaveLength(0)
      expect(component.find(Icon)).toHaveLength(0)
    })

    it('should have Icon on right side when it has #iconRight', () => {
      const component = shallow(
        <FormControl iconRight={BOLDER_ARROW_FORTH}>
          <div/>
        </FormControl>
      )
      expect(component.find(Icon).prop('svg')).toEqual(BOLDER_ARROW_FORTH)
    })
  })

  describe('#id', () => {
    it('should have label with htmlFor when it has #id and #label', () => {
      const component = shallow(
        <FormControl id="myId" label="label">
          <div/>
        </FormControl>
      )
      expect(component.find('label').prop('htmlFor')).toEqual('myId')
    })
  })

  describe('clear button', () => {
    describe('rendering', () => {
      it('should not have clear when it has #hasClear false', () => {
        const component = shallow(
          <FormControl hasClear={false}>
            <div/>
          </FormControl>
        )
        expect(component.find('button')).toHaveLength(0)
      })

      it('should have clear when it has #hasClear true', () => {
        const component = shallow(
          <FormControl hasClear>
            <div/>
          </FormControl>
        )
        expect(component.find('button')).toHaveLength(1)
      })

      it('should not have clear when it has #isDisabled true even if #hasClear true', () => {
        const component = shallow(
          <FormControl hasClear isDisabled>
            <div/>
          </FormControl>
        )
        expect(component.find('button')).toHaveLength(0)
      })

      it('should not have clear when it has #isReadOnly true even if #hasClear true', () => {
        const component = shallow(
          <FormControl hasClear isReadOnly>
            <div/>
          </FormControl>
        )
        expect(component.find('button')).toHaveLength(0)
      })

      it('should not have clear when it has #isLoading true even if #hasClear true', () => {
        const component = shallow(
          <FormControl hasClear isLoading>
            <div/>
          </FormControl>
        )
        expect(component.find('button')).toHaveLength(0)
      })
    })

    describe('when it has #onClear callback', () => {
      it('should call #onClear when button has been clicked', () => {
        const onClear = jest.fn()
        const component = shallow(
          <FormControl hasClear onClear={onClear}>
            <div/>
          </FormControl>
        )
        component.find('button').simulate('click')
        expect(onClear).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('loader', () => {
    it('should not have Spinner when it has #isLoading false', () => {
      const component = shallow(
        <FormControl isLoading={false}>
          <div/>
        </FormControl>
      )
      expect(component.find(Spinner)).toHaveLength(0)
    })

    it('should have Spinner when it has #isLoading true', () => {
      const component = shallow(
        <FormControl isLoading>
          <div/>
        </FormControl>
      )
      expect(component.find(Spinner)).toHaveLength(1)
    })
  })

  describe('#label', () => {
    it('should not have label when it has no #label', () => {
      const component = shallow(
        <FormControl label="">
          <div/>
        </FormControl>
      )
      expect(component.find('label')).toHaveLength(0)
    })

    it('should have label when it has #label', () => {
      const component = shallow(
        <FormControl label="label">
          <div/>
        </FormControl>
      )
      expect(component.find('label').text()).toEqual('label')
    })

    it('should have required marked label when it has #label and #isRequired true', () => {
      const component = shallow(
        <FormControl isRequired label="label">
          <div/>
        </FormControl>
      )
      expect(component.find('label').text()).toEqual('label*')
    })
  })

  describe('#notes', () => {
    it('should not have notes when it has no #notes', () => {
      const component = shallow(
        <FormControl notes="">
          <div/>
        </FormControl>
      )
      expect(component.find('[data-testid="FormControlNotes"]')).toHaveLength(0)
    })

    it('should have notes when it has #notes', () => {
      const component = shallow(
        <FormControl notes="notes">
          <div/>
        </FormControl>
      )
      expect(component.find('[data-testid="FormControlNotes"]').text()).toEqual('notes')
    })
  })
})

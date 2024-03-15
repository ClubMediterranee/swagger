import React from 'react'
import { shallow } from 'enzyme'

import { SpinnerLabel } from './SpinnerLabel.jsx'

describe('SpinnerLabel Component', () => {
  describe('#label', () => {
    it('should not display a spinner label when it has no label', () => {
      const component = shallow(<SpinnerLabel/>)
      expect(component.isEmptyRender()).toBe(true)
    })

    it('should display a spinner label', () => {
      const component = shallow(<SpinnerLabel label="myLabel"/>)
      expect(component.text()).toEqual('myLabel')
    })
  })
})

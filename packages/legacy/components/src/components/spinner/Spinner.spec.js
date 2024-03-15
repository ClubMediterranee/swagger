import React from 'react'
import { shallow } from 'enzyme'

import { Icon } from '../icon/Icon.jsx'
import { Spinner } from './Spinner.jsx'
import { ReactComponent as CROSS } from '../../statics/svg/cross.svg'

describe('Spinner Component', () => {
  describe('#color', () => {
    it('should render a spinner with default color class', () => {
      const component = shallow(<Spinner/>)
      expect(component.hasClass('text-blue')).toBe(true)
    })

    it('should render a spinner with custom color class', () => {
      const component = shallow(<Spinner color="white"/>)
      expect(component.hasClass('text-white')).toBe(true)
    })
  })

  describe('#iconName', () => {
    it('should not render an Icon when it has no #iconName', () => {
      const component = shallow(<Spinner/>)
      expect(component.find(Icon)).toHaveLength(0)
    })

    it('should render an Icon when it has #iconName', () => {
      const component = shallow(<Spinner iconSvg={CROSS}/>)
      expect(component.find(Icon).prop('svg')).toEqual(CROSS)
    })
  })

  describe('#iconSize', () => {
    it('should render an Icon with custom size when it has #iconSize', () => {
      const component = shallow(<Spinner iconSvg={CROSS} iconSize="2rem"/>)
      expect(component.find(Icon).prop('width')).toEqual('2rem')
    })
  })
})

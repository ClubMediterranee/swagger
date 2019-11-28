/**
 * @jest-environment jsdom
 */
import React from 'react'
import { mount, shallow } from 'enzyme'
import { COLORS } from '../../utils/color/colors.js'
import { Icon } from './Icon.jsx'
import { ReactComponent as AGAC } from '../../statics/svg/agac.svg'

describe('Icon Component', () => {
  describe('rendering', () => {
    it('should not render component when it has no #name', () => {
      const component = shallow(<Icon/>)
      expect(component.isEmptyRender()).toBe(true)
    })

    it('should not render component when it has empty #svg', () => {
      const component = shallow(<Icon svg=""/>)
      expect(component.isEmptyRender()).toBe(true)
    })

    it('should render a svg component when Icon is valid', () => {
      const component = mount(<Icon svg={AGAC}/>)
      expect(component.find('svg')).toHaveLength(1)
    })
  })

  describe('#alt', () => {
    it('should have empty title when it has no #alt', () => {
      const component = shallow(<Icon svg={AGAC}/>)
      expect(component.prop('title')).toEqual('')
    })

    it('should have title when it has #alt', () => {
      const component = shallow(<Icon svg={AGAC} alt="AGACTitle"/>)
      expect(component.prop('title')).toEqual('AGACTitle')
    })
  })

  describe('#className', () => {
    it('should have className when it has #className', () => {
      const component = shallow(<Icon svg={AGAC} className="myClass1 myClass2"/>)
      expect(component.prop('className')).toMatch('myClass1 myClass2')
    })
  })

  describe('#color', () => {
    it('should have default color class when it has no #color', () => {
      const component = shallow(<Icon svg={AGAC}/>)
      expect(component.prop('className')).toMatch('text-inherit')
    })

    it('should have color class when it has #color', () => {
      const component = shallow(<Icon svg={AGAC} color={COLORS.GRAY_DARKER}/>)
      expect(component.prop('className')).toMatch(`text-${COLORS.GRAY_DARKER}`)
    })

    it('should not have color class when it has empty #color', () => {
      const component = shallow(<Icon svg={AGAC} color=""/>)
      expect(component.prop('className')).not.toMatch('text-inherit')
    })
  })

  describe('#isNotMonoChrome', () => {
    it('should have icon-monochrome class when it has #isNotMonoChrome false', () => {
      const component = shallow(<Icon svg={AGAC} isNotMonoChrome={false}/>)
      expect(component.prop('className')).toMatch('icon-monochrome')
    })

    it('should not have icon-monochrome class when it has #isNotMonoChrome true', () => {
      const component = shallow(<Icon svg={AGAC} isNotMonoChrome/>)
      expect(component.prop('className')).not.toMatch('icon-monochrome')
    })
  })

  describe('#isNotSquare', () => {
    it('should have ratio 100 by default', () => {
      const component = shallow(<Icon svg={AGAC}/>)
      component.instance().setDimensions({})
      expect(component.state('ratio')).toEqual(100)
    })

    it('should have ratio 100 if #isNotSquare is false', () => {
      const component = shallow(<Icon svg={AGAC} isNotSquare={false}/>)
      component.instance().setDimensions({})
      expect(component.state('ratio')).toEqual(100)
    })

    it('should have ratio 50 if #isNotSquare is true', () => {
      const component = mount(<Icon svg={AGAC} isNotSquare/>)
      component.instance().nodeRef.current.querySelector('svg').viewBox = {
        baseVal: {
          height: 250,
          width: 500
        }
      }

      component.instance().setDimensions()
      expect(component.state('ratio')).toEqual(50)
    })

    it('should have ratio 0 when it has uncorrect svg', () => {
      const component = mount(<Icon svg={AGAC} isNotSquare/>)
      const svg = {
        viewBox: {}
      }
      component.instance().setDimensions(svg)
      expect(component.state('ratio')).toEqual(0)
    })
  })

  describe('#rotation', () => {
    it('should have no rotation style when it has no #rotation', () => {
      const component = shallow(<Icon svg={AGAC}/>)
      expect(component.prop('style')).not.toMatchObject({ transform: 'rotate(0deg)' })
    })

    it('should have rotation style when it has #rotation', () => {
      const component = shallow(<Icon svg={AGAC} rotation={90}/>)
      expect(component.prop('style')).toMatchObject({ transform: 'rotate(90deg)' })
    })
  })

  describe('#width', () => {
    it('should have default width style when it has no #width', () => {
      const component = shallow(<Icon svg={AGAC}/>)
      expect(component.prop('style')).toMatchObject({ width: '1rem' })
    })

    it('should have width style when it has #width', () => {
      const component = shallow(<Icon svg={AGAC} width="2.5rem"/>)
      expect(component.prop('style')).toMatchObject({ width: '2.5rem' })
    })

    describe('#isNotSquare', () => {
      it('should have equals width and height style when it has no #isNotSquare', () => {
        const component = shallow(<Icon svg={AGAC} width="2.5rem"/>)
        expect(component.prop('style')).toMatchObject({ width: '2.5rem', height: '2.5rem' })
      })

      it('should have equals width and height style when #isNotSquare is false', () => {
        const component = shallow(<Icon svg={AGAC} width="2.5rem" isNotSquare={false}/>)
        expect(component.prop('style')).toMatchObject({ width: '2.5rem', height: '2.5rem' })
      })

      it('should have height style auto when #isNotSquare is true', () => {
        const component = shallow(<Icon svg={AGAC} width="2.5rem" isNotSquare/>)
        expect(component.prop('style')).toMatchObject({ width: '2.5rem', height: 'auto' })
      })
    })
  })
})

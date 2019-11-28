import React from 'react'
import { mount } from 'enzyme'
import { Button } from './Button'

describe('Button Component', () => {
  describe('rendering', () => {
    it('should render a button with default tag and label', () => {
      // WHEN
      const component = mount(<Button>Label</Button>)

      // THEN
      const button = component.find('button')
      expect(component.find('button span span').contains('Label')).toEqual(true)
      expect(button.hasClass('bg-blue')).toEqual(true)
      expect(button.hasClass('text-white')).toEqual(true)
      expect(button.hasClass('border-blue')).toEqual(true)
      expect(button.hasClass('focus:bg-blue-active')).toEqual(true)
      expect(button.hasClass('focus:border-blue-active')).toEqual(true)
      expect(button.hasClass('hover:bg-blue-active')).toEqual(true)
      expect(button.hasClass('hover:border-blue-active')).toEqual(true)
      expect(button.hasClass('focus:text-white-active')).toEqual(true)
      expect(button.hasClass('hover:text-white-active')).toEqual(true)

      expect(component.find('button > span').hasClass('font-bold')).toEqual(true)
      expect(component.find('button > span').hasClass('px-4')).toEqual(true)
      expect(component.find('button > span').hasClass('py-1')).toEqual(true)
    })

    it('should render a custom  given tag with default tag and label', () => {
      // WHEN
      const component = mount(<Button component="a">Label</Button>)

      // THEN
      expect(component.find('a span span').contains('Label')).toEqual(true)
    })

    it('should render a disabled component', () => {
      // WHEN
      const component = mount(<Button disabled={true}>Label</Button>)

      // THEN
      const button = component.find('button')

      expect(button.hasClass('bg-gray-light')).toEqual(true)
      expect(button.hasClass('text-white')).toEqual(true)
      expect(button.hasClass('border-gray-light')).toEqual(true)
      expect(button.hasClass('focus:bg-gray-light-active')).toEqual(true)
      expect(button.hasClass('focus:border-gray-light-active')).toEqual(true)
      expect(button.hasClass('hover:bg-gray-light-active')).toEqual(true)
      expect(button.hasClass('hover:border-gray-light-active')).toEqual(true)
      expect(button.hasClass('focus:text-white-active')).toEqual(true)
      expect(button.hasClass('hover:text-white-active')).toEqual(true)
    })

    it('should render button with customer color', () => {
      // WHEN
      const component = mount(<Button
        bgColor={'red'}
        borderColor={'yellow'}
        color={'black'}
        fontWeight={'lighter'}
        paddingX={2}
        paddingY={3}>Label</Button>)

      // THEN
      const button = component.find('button')

      expect(button.hasClass('bg-red')).toEqual(true)
      expect(button.hasClass('text-black')).toEqual(true)
      expect(button.hasClass('border-yellow')).toEqual(true)
      expect(button.hasClass('focus:bg-red-active')).toEqual(true)
      expect(button.hasClass('focus:border-yellow-active')).toEqual(true)
      expect(button.hasClass('hover:bg-red-active')).toEqual(true)
      expect(button.hasClass('hover:border-yellow-active')).toEqual(true)
      expect(button.hasClass('focus:text-black-active')).toEqual(true)
      expect(button.hasClass('hover:text-black-active')).toEqual(true)
      expect(component.find('button > span').hasClass('font-lighter')).toEqual(true)
      expect(component.find('button > span').hasClass('px-2')).toEqual(true)
      expect(component.find('button > span').hasClass('py-3')).toEqual(true)
    })
  })
})

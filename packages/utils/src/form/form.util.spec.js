import { getFormattedLabel } from './form.util.js'

describe('Form Util', () => {
  describe('getFormattedLabel', () => {
    it('should return required placeholder when isRequired is true', () => {
      expect(getFormattedLabel('Enter some value', true)).toBe('Enter some value*')
    })

    it('should return unchanged placeholder when isRequired is false', () => {
      expect(getFormattedLabel('Enter some value', false)).toBe('Enter some value')
    })
  })
})

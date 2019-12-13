/**
 * @jest-environment jsdom
 */
import {
  camelToSnakeCase,
  dataSetProps,
  getCapitalLetters,
  getFirstWord,
  getValidString,
  getValidTagName,
  isValidString,
  isValidTagName,
  titleCase,
  truncate
} from './string.util.js'

describe('String Util', () => {
  describe('camelToSnakeCase', () => {
    it('Should return \'test-one\' for \'TestOne\'', () => {
      expect(camelToSnakeCase('TestOne')).toBe('test-one')
    })

    it('Should return \'test-two-two\' for \'TestTwoTwo\'', () => {
      expect(camelToSnakeCase('TestTwoTwo')).toBe('test-two-two')
    })

    it('Should return \'test-three-three\' for \'testThreeThree\'', () => {
      expect(camelToSnakeCase('testThreeThree')).toBe('test-three-three')
    })
  })

  describe('titleCase', () => {
    it('Should titleCase the given words', () => {
      expect(titleCase('FRANCE')).toBe('France')
      expect(titleCase('ILE MAURICE')).toBe('Ile Maurice')
      expect(titleCase('TURKS ET CAICOS')).toBe('Turks Et Caicos')
    })
  })

  describe('dataSetProps', () => {
    it('Should return data attributes', () => {
      const props = {
        dataOne: 'dataOne',
        dataTwoTwo: 'dataTwoTwo',
        dataThreeThreeThree: 'dataThreeThreeThree',
        foo: 'bar'
      }
      const expectedProps = {
        'data-one': 'dataOne',
        'data-two-two': 'dataTwoTwo',
        'data-three-three-three': 'dataThreeThreeThree'
      }
      expect(dataSetProps(props)).toEqual(expectedProps)
    })
  })

  describe('getCapitalLetters', () => {
    it('Should return \'JD\' for \'John Doe\'', () => {
      expect(getCapitalLetters('John', 'Doe')).toBe('JD')
    })

    it('Should return \'JD\' for \'john doe\'', () => {
      expect(getCapitalLetters('john', 'doe')).toBe('JD')
    })

    it('Should return \'JC\' for \'Jean-Baptiste Cousin\'', () => {
      expect(getCapitalLetters('Jean-Baptiste', 'Cousin')).toBe('JC')
    })

    it('Should return \'J\' for \'Jean-Baptiste\'', () => {
      expect(getCapitalLetters('Jean-Baptiste', '')).toBe('J')
    })

    it('Should return \'C\' for \'Cousin\'', () => {
      expect(getCapitalLetters('', 'C')).toBe('C')
    })
  })

  describe('getValidString', () => {
    it('should return the string trim', () => {
      expect(getValidString(' toto ')).toBe('toto')
    })

    it('should return false if it is not a string', () => {
      expect(getValidString(13)).toBe('')
      expect(getValidString(['Hello'])).toBe('')
      expect(getValidString(true)).toBe('')
      expect(getValidString({ toto: 'titi' })).toBe('')
      expect(getValidString(undefined)).toBe('')
    })
  })

  describe('getValidTagName', () => {
    it('should return tag name if in default tag list', () => {
      expect(getValidTagName(' div ')).toBe('div')
      expect(getValidTagName('article')).toBe('article')
      expect(getValidTagName('section ')).toBe('section')
      expect(getValidTagName('header')).toBe('header')
      expect(getValidTagName(' footer')).toBe('footer')
      expect(getValidTagName('nav')).toBe('nav')
      expect(getValidTagName('aside')).toBe('aside')
    })

    it('should return tag name if it is in the given taglist', () => {
      const tagList = ['media', 'audio']
      expect(getValidTagName('media', tagList)).toBe('media')
      expect(getValidTagName('audio', tagList)).toBe('audio')
    })

    it('should return div if it is not in the list', () => {
      const tagList = ['media', 'audio']
      expect(getValidTagName('toto')).toBe('div')
      expect(getValidTagName('toto', tagList)).toBe('div')
    })
  })

  describe('isValidString', () => {
    it('should return the string trim', () => {
      expect(isValidString(' toto ')).toBe('toto')
    })

    it('should return false if it is not a string', () => {
      expect(isValidString(13)).toBe(false)
      expect(isValidString(['Hello'])).toBe(false)
      expect(isValidString(true)).toBe(false)
      expect(isValidString({ toto: 'titi' })).toBe(false)
      expect(isValidString(undefined)).toBe(false)
    })
  })

  describe('isValidTagName', () => {
    it('should return true for tag in default tag list', () => {
      expect(isValidTagName(' div ')).toBe(true)
      expect(isValidTagName('article')).toBe(true)
      expect(isValidTagName('section')).toBe(true)
      expect(isValidTagName('header')).toBe(true)
      expect(isValidTagName('footer')).toBe(true)
      expect(isValidTagName('nav')).toBe(true)
      expect(isValidTagName('aside')).toBe(true)
    })

    it('should return true if it is in the given taglist', () => {
      const tagList = ['media', 'audio']
      expect(isValidTagName('media', tagList)).toBe(true)
      expect(isValidTagName('audio', tagList)).toBe(true)
    })

    it('should return false if it is not in the list', () => {
      const tagList = ['media', 'audio']
      expect(isValidTagName('toto')).toBe(false)
      expect(isValidTagName('toto', tagList)).toBe(false)
    })
  })

  describe('truncate', () => {
    it('should return the string truncate', () => {
      expect(truncate(' Hello ', 3)).toBe('Hel…')
      expect(truncate(' Hello ', 5)).toBe('Hello')
      expect(truncate('Hello', 10)).toBe('Hello')
      expect(truncate('Hello', 0)).toBe('Hello')
      expect(truncate(' Hello ')).toBe('Hello')
      expect(truncate(' Hello World', 8, true)).toBe('Hello…')
    })
  })

  describe('getCapitalLetters', () => {
    it('Should return \'JD\' for \'John Doe\'', () => {
      expect(getCapitalLetters('John', 'Doe')).toBe('JD')
    })

    it('Should return \'JD\' for \'john doe\'', () => {
      expect(getCapitalLetters('john', 'doe')).toBe('JD')
    })

    it('Should return \'JC\' for \'Jean-Baptiste Cousin\'', () => {
      expect(getCapitalLetters('Jean-Baptiste', 'Cousin')).toBe('JC')
    })

    it('Should return \'J\' for \'Jean-Baptiste\'', () => {
      expect(getCapitalLetters('Jean-Baptiste', '')).toBe('J')
    })

    it('Should return \'C\' for \'Cousin\'', () => {
      expect(getCapitalLetters('', 'C')).toBe('C')
    })
  })

  describe('getFirstWord', () => {
    it('should return \'Hello\' for \'Hello World Jim\'', () => {
      expect(getFirstWord('Hello World Jim')).toBe('Hello')
    })

    it('should return empty string if string is invalid', () => {
      const number = 1234
      expect(getFirstWord(number)).toBe('')
    })
  })
})

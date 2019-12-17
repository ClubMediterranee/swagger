// @flow
import { isString } from 'lodash'

function isValidString (str: ?string): string | false {
  return isString(str) && str.trim()
}

function isValidTagName (tagName: string, tagList: ?Array<string>): string | boolean {
  const list =
    Array.isArray(tagList) && tagList.length > 0
      ? tagList
      : ['div', 'article', 'section', 'header', 'footer', 'nav', 'aside']
  return isValidString(tagName) && list.indexOf(tagName.trim()) !== -1
}

function getCapitalLetters (firstName: string, lastName: string): string {
  return (
    (firstName ? firstName.charAt(0).toUpperCase() : '') +
    (lastName ? lastName.charAt(0).toUpperCase() : '')
  )
}

function getFirstWord (str: ?string) {
  return isString(str) ? str.replace(/\s.*/, '') : ''
}

function getValidString (str: ?string) {
  return isString(str) ? str.trim() : ''
}

function getValidTagName (tagName: string, tagList: ?Array<string>): string {
  return isValidTagName(tagName, tagList) ? tagName.trim() : 'div'
}

function truncate (str: string, characters: ?number, preserveWords: boolean = false): string {
  const strTrimed = getValidString(str)

  if (!characters) {
    return strTrimed
  }

  if (characters < 0) {
    return ''
  }

  if (strTrimed.length > characters) {
    const length = preserveWords ? strTrimed.lastIndexOf(' ', characters) : characters
    return strTrimed.substring(0, length) + '…'
  }
  return strTrimed
}

function camelToSnakeCase (str: string): string {
  return str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase()
}

function titleCase (str: string) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

function dataSetProps (props: * = {}) {
  return Object.keys(props)
    .filter(propKey => propKey.indexOf('data') === 0)
    .reduce((res, propKey) => {
      res[camelToSnakeCase(propKey)] = props[propKey]
      return res
    }, {})
}

function camelCasify (text: string): string {
  return text
    .split(' ')
    .map((word, i) => {
      if (i > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
      return word.toLowerCase()
    })
    .join('')
}

export {
  camelToSnakeCase,
  dataSetProps,
  getCapitalLetters,
  getFirstWord,
  getValidString,
  getValidTagName,
  isValidString,
  isValidTagName,
  titleCase,
  truncate,
  camelCasify
}

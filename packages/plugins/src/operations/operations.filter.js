import luceneQueryParser from 'lucene-query-parser'
import luceneFilter from 'lucene-filter'
import { fromJS } from 'immutable'

const lucene = luceneFilter(luceneQueryParser)
const mapFilters = new Map()

function getLucene (keyword) {
  if (keyword.startsWith('/') && keyword.endsWith('/')) {
    keyword = 'path: ' + keyword
  }
  return lucene(keyword)
}

function getModels (item, set = new Set()) {
  if (!item) {
    return set
  }

  if (typeof item === 'string' && item.indexOf('#/definitions') > -1) {
    set.add(item.replace('#/definitions/', ''))
    return set
  }

  if (typeof item === 'object') {
    Object
      .values(item)
      .forEach((value) => {
        getModels(value, set)
      })
  }

  return set
}

function mapItem (item) {
  item = item.toObject()
  const operation = item.operation.toJSON()
  const tags = operation.tags

  return {
    ...item,
    ...operation,
    model: Array.from(getModels(operation)).join(','),
    tags
  }
}

export function operationsFilter (operations, keyword) {
  try {
    if (!mapFilters.has(keyword)) {
      mapFilters.set(keyword, getLucene(keyword))
    }

    const filter = mapFilters.get(keyword)

    return operations.filter((item, key) => {
      return filter(mapItem(item))
    })
  } catch (er) {
    return fromJS([])
  }
}

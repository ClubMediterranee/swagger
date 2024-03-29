import { List } from 'immutable'

const SWAGGER2_OPERATION_METHODS = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch'
]

const OAS3_OPERATION_METHODS = SWAGGER2_OPERATION_METHODS.concat(['trace'])

export function getOperationsMixins (props) {
  let {
    specSelectors,
    layoutSelectors,
    operationsSelectors,
    getConfigs,
    fn
  } = props

  let taggedOps = specSelectors.taggedOperations()

  let {
    maxDisplayedTags
  } = getConfigs()

  let tagKeyword = layoutSelectors.currentFilter()

  if (tagKeyword) {
    if (tagKeyword !== true) {
      taggedOps = fn.opsFilter(taggedOps, tagKeyword)
    }
  }

  if (maxDisplayedTags && !isNaN(maxDisplayedTags) && maxDisplayedTags >= 0) {
    taggedOps = taggedOps.slice(0, maxDisplayedTags)
  }

  const operationsKeyword = operationsSelectors.currentFilter()
  const { deprecated: displayDeprecated, ...tags } = operationsSelectors.currentTagsFilter()
  return {
    taggedOps: taggedOps.sortBy((v, k) => k.toUpperCase()),
    bookmarkedOps: taggedOps
      .reduce(
        (flatOps, opsTag) => flatOps.concat(opsTag.get('operations')),
        List()
      )
      .filter(op =>
        operationsSelectors
          .isBookmarked(op.get('path'), op.get('method'))
      ),
    operationsFilter (operations) {
      const newOperations = operations
        .filter((op) => {
          const method = op.get('method')

          // FIXME: (someday) this logic should probably be in a selector,
          // but doing so would require further opening up
          // selectors to the plugin system, to allow for dynamic
          // overriding of low-level selectors that other selectors
          // rely on. --KS, 12/17
          const validMethods = specSelectors.isOAS3()
            ? OAS3_OPERATION_METHODS : SWAGGER2_OPERATION_METHODS

          if (validMethods.indexOf(method) === -1) {
            return false
          }

          const deprecated = !!op.get('operation').get('deprecated')

          if (deprecated && !displayDeprecated) {
            return false
          }

          const operationTags = op.get('operation').get('tags').toJSON()
          const operationCustomFilterTags = op.get('operation').get('x-filter-tags')

          if (operationCustomFilterTags) {
            operationTags.push(...operationCustomFilterTags.toJSON())
          }

          const tag = operationTags.find((tag) => {
            return tags[tag] === undefined ? false : !tags[tag]
          })

          return !tag
        })

      if (operationsKeyword && operationsKeyword !== true) {
        return fn.operationsFilter(newOperations, operationsKeyword)
      }

      return newOperations
    }
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import Im from 'immutable'

const SWAGGER2_OPERATION_METHODS = [
  'get', 'put', 'post', 'delete', 'options', 'head', 'patch'
]

const OAS3_OPERATION_METHODS = SWAGGER2_OPERATION_METHODS.concat(['trace'])

export default class Operations extends React.Component {
  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
    getConfigs: PropTypes.func.isRequired,
    fn: PropTypes.func.isRequired
  }

  render () {
    let {
      specSelectors,
      getComponent,
      layoutSelectors,
      layoutActions,
      operationsSelectors,
      getConfigs,
      fn
    } = this.props

    let taggedOps = specSelectors.taggedOperations()

    const OperationContainer = getComponent('OperationContainer', true)
    const OperationTag = getComponent('OperationTag')

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

    const hasHidden = String(window.location.search).includes('tags=hidden')

    taggedOps = taggedOps.filter((tagObj, tag) => {
      return hasHidden ? tag === 'hidden' : tag !== 'hidden'
    })

    let operationsKeyword = operationsSelectors.currentFilter()
    let displayDeprecatedOperations = operationsSelectors.currentDeprecatedFilter()

    return (
      <div>
        {
          taggedOps.map((tagObj, tag) => {
            let operations = tagObj.get('operations')

            if (operationsKeyword) {
              if (operationsKeyword !== true) {
                operations = fn.operationsFilter(operations, operationsKeyword)
              }
            }

            if (operations.size === 0) {
              return null
            }

            return (
              <OperationTag
                key={'operation-' + tag}
                tagObj={tagObj}
                tag={tag}
                layoutSelectors={layoutSelectors}
                layoutActions={layoutActions}
                getConfigs={getConfigs}
                getComponent={getComponent}>
                {
                  operations.map(op => {
                    const path = op.get('path')
                    const method = op.get('method')
                    const deprecated = !!op.get('operation').get('deprecated')
                    const specPath = Im.List(['paths', path, method])

                    if (!displayDeprecatedOperations && deprecated) {
                      return null
                    }

                    // FIXME: (someday) this logic should probably be in a selector,
                    // but doing so would require further opening up
                    // selectors to the plugin system, to allow for dynamic
                    // overriding of low-level selectors that other selectors
                    // rely on. --KS, 12/17
                    const validMethods = specSelectors.isOAS3()
                      ? OAS3_OPERATION_METHODS : SWAGGER2_OPERATION_METHODS

                    if (validMethods.indexOf(method) === -1) {
                      return null
                    }

                    return <OperationContainer
                      key={`${path}-${method}`}
                      specPath={specPath}
                      op={op}
                      path={path}
                      method={method}
                      tag={tag}
                    />
                  }).toArray()
                }
              </OperationTag>
            )
          }).toArray()
        }

        {taggedOps.size < 1 ? <h3> No operations defined in spec! </h3> : null}
      </div>
    )
  }
}

Operations.propTypes = {
  layoutActions: PropTypes.object.isRequired,
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  fn: PropTypes.object.isRequired
}

import Im from 'immutable'
import PropTypes from 'prop-types'
import React from 'react'
import { getOperationsMixins } from '../common/getOperationsMixins'

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
      getComponent,
      layoutSelectors,
      layoutActions,
      getConfigs
    } = this.props

    const OperationContainer = getComponent('OperationContainer', true)
    const OperationTag = getComponent('OperationTag')
    let { taggedOps, operationsFilter } = getOperationsMixins(this.props)

    return (
      <div>
        {
          taggedOps
            .map((tagObj, tag) => {
              let operations = operationsFilter(tagObj.get('operations'))

              if (operations.size === 0) {
                return null
              }

              return (
                <OperationTag
                  key={`operation-${tag}`}
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
                      const specPath = Im.List(['paths', path, method])

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

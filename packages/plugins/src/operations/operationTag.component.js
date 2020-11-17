import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'

const wrapOperationTag = (OpeTag, {
  layoutSelectors,
  layoutActions,
  getConfigs,
  getComponent,
  operationsSelectors
}) => {
  const OperationTag = ({
    tag,
    tagObj,
    operations,
    hideBookmarks
  }) => {
    const OperationContainer = getComponent('OperationContainer', true)
    return (
      <OpeTag
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
            const specPath = List(['paths', path, method])

            if (hideBookmarks && operationsSelectors.isBookmarked(path, method)) {
              return null
            }

            return (
              <OperationContainer
                specPath={specPath}
                op={op}
                path={path}
                method={method}
                tag={tag}
              />
            )
          })
        }
      </OpeTag>
    )
  }

  OperationTag.propTypes = {
    tag: PropTypes.string,
    tagObj: PropTypes.object,
    operations: PropTypes.object,
    hideBookmarks: PropTypes.bool
  }

  return OperationTag
}

export default wrapOperationTag

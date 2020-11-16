import React from 'react'
import BookmarkButton from './bookmarkButton.component'
import PropTypes from 'prop-types'
import { List } from 'immutable'

const wrapOperationTag = (OpeTag, {
  layoutSelectors,
  layoutActions,
  getConfigs,
  getComponent,
  operationsActions,
  operationsSelectors
}) => {
  const OperationTag = ({
    tag,
    tagObj,
    operations
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
            const opId = `${path}-${method}`

            return (
              <div className="flex place-content-center" key={`bookmark-${opId}`}>
                <span className="my-3 mx-2 flex-initial">
                  <BookmarkButton
                    onClick={() => operationsActions.toggleBookmark(opId)}
                    isActive={operationsSelectors.isBookmarked(path, method)}
                  />
                </span>
                <div className="flex-1">
                  <OperationContainer
                    specPath={specPath}
                    op={op}
                    path={path}
                    method={method}
                    tag={tag}
                  />
                </div>
              </div>
            )
          })
        }
      </OpeTag>
    )
  }

  OperationTag.propTypes = {
    tag: PropTypes.string,
    tagObj: PropTypes.object,
    operations: PropTypes.object
  }

  return OperationTag
}

export default wrapOperationTag

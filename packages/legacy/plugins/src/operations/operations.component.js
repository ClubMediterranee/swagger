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
    const { getComponent } = this.props

    const OperationTag = getComponent('OperationTag')
    const { taggedOps, operationsFilter, bookmarkedOps } = getOperationsMixins(this.props)

    const bookmarkedOperations = operationsFilter(bookmarkedOps)

    return (
      <div>
        <OperationTag
          tag="bookmarks"
          operations={bookmarkedOperations}
        />
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
                  operations={operations}
                  hideBookmarks
                />
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

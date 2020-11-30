import React from 'react'
import toString from 'lodash/toString'
import BookmarkButton from './bookmarkButton.component'

export const wrapOperationSummary = (OpeSummary, {
  getComponent,
  authActions,
  authSelectors,
  operationsActions,
  operationsSelectors
}) => {
  const OperationSummary = ({
    toggleShown,
    operationProps,
    specPath
  }) => {
    const {
      summary,
      isAuthorized,
      method,
      path,
      op,
      showSummary,
      operationId,
      originalOperationId,
      displayOperationId
    } = operationProps.toJS()

    const {
      summary: resolvedSummary
    } = op

    const security = operationProps.get('security')

    const AuthorizeOperationBtn = getComponent('authorizeOperationBtn')
    const OperationSummaryMethod = getComponent('OperationSummaryMethod')
    const OperationSummaryPath = getComponent('OperationSummaryPath')
    const JumpToPath = getComponent('JumpToPath', true)
    return (
      <div className={`opblock-summary opblock-summary-${method}`} onClick={toggleShown}>
        <div>
          <OperationSummaryMethod method={method}/>
        </div>
        <div className={'pl-3'} style={{ flex: '1 1 auto' }}>
          <OperationSummaryPath getComponent={getComponent} operationProps={operationProps} specPath={specPath}/>
          {!showSummary
            ? null
            : <div className="opblock-summary-description text-sm text-gray-darker">
              {toString(resolvedSummary || summary)}
            </div>
          }
        </div>

        {displayOperationId && (originalOperationId || operationId)
          ? <span className="opblock-summary-operation-id">{originalOperationId || operationId}</span> : null}
        <div className="flex self-center">
          {
            (!security || !security.count()) ? null
              : <AuthorizeOperationBtn
                isAuthorized={isAuthorized}
                onClick={() => {
                  const applicableDefinitions = authSelectors.definitionsForRequirements(security)
                  authActions.showDefinitions(applicableDefinitions)
                }}
              />
          }
          <BookmarkButton
            onClick={() => operationsActions.toggleBookmark(`${path}-${method}`)}
            isActive={operationsSelectors.isBookmarked(path, method)}
            className="mr-1"
          />
        </div>
        <JumpToPath path={specPath}/>{/* TODO: use wrapComponents here, swagger-ui doesn't care about jumpToPath */}
      </div>
    )
  }

  return OperationSummary
}

import React, { PureComponent } from 'react'
import toString from 'lodash/toString'

export default class OperationSummary extends PureComponent {
  render () {
    let {
      toggleShown,
      getComponent,
      authActions,
      authSelectors,
      operationProps,
      specPath
    } = this.props

    let {
      summary,
      isAuthorized,
      method,
      op,
      showSummary,
      operationId,
      originalOperationId,
      displayOperationId
    } = operationProps.toJS()

    let {
      summary: resolvedSummary
    } = op

    let security = operationProps.get('security')

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
        <JumpToPath path={specPath}/>{/* TODO: use wrapComponents here, swagger-ui doesn't care about jumpToPath */}
      </div>
    )
  }
}

import React from 'react'
import classNames from 'classnames'
import { helpers } from 'swagger-client'
import { getOperationsMixins } from '../common/getOperationsMixins'

const { opId } = helpers

function getOperationId (op) {
  const path = op.get('path')
  const method = op.get('method')

  return op.getIn(['operation', '__originalOperationId']) ||
    op.getIn(['operation', 'operationId']) ||
    opId(op.get('operation'), path, method) ||
    op.get('id')
}

function formatMethod (method) {
  return ({
    'get': 'get',
    'put': 'put',
    'post': 'post',
    'delete': 'del',
    'options': 'opt',
    'head': 'head',
    'patch': 'patch',
    'trace': 'trace'
  }[method]) || method
}

function SidebarOperation ({ id, operation, tag }) {
  const path = operation.get('path')
  const method = operation.get('method')
  const deprecated = operation.get('operation').get('deprecated')

  const whenClick = () => {
    const hash = `operations-${tag}-${id}`
    const ele = document.getElementById(hash)

    window.location.anchor = (hash)

    window.scrollTo({
      top: ele.offsetTop - 15,
      left: ele.offsetLeft,
      behavior: 'smooth'
    })
  }

  const classes = classNames('sidebar-operation-method', deprecated ? 'bg-operation-disabled' : 'bg-operation-' + method.toLowerCase())

  const summary = operation.get('operation').get('summary')

  return <li
    className={classNames('flex content-center px-5 py-3 font-sans hover:bg-gray-xlight cursor-pointer')}
    onClick={whenClick}>
    <div>
      <div className={classes}>{formatMethod(method)}</div>
    </div>
    <div
      className={classNames('flex w-full self-center text-sm text-gray-darker whitespace-normal', deprecated ? 'line-through' : '')}
      title={path}>
      {summary || path}
    </div>
  </li>
}

function SidebarOperationTag ({ tag }) {
  return <div
    className="flex flex-row items-center px-5 pt-3 pb-1 uppercase font-happiness text-blue">{tag.replace(/_/gi, ' ')}</div>
}

const Sidebar = (props) => {
  let { taggedOps, operationsFilter } = getOperationsMixins(props)

  if (taggedOps.size < 1) {
    return null
  }

  return <div
    className="absolute flex flex-column contain overflow-hidden pt-5 top-0 left-0 bottom-0 right-0 contain-strict bg-gray-xlighter overflow-y-scroll">
    <ul className={'reset-list'}>
      {
        taggedOps
          .map((tagObj, tag) => {
            let operations = operationsFilter(tagObj.get('operations'))

            if (operations.size === 0) {
              return null
            }

            return <li key={tag}>
              <SidebarOperationTag tag={tag}/>

              <ul className={'reset-list'}>
                {
                  operations.map(op => {
                    const operationId = getOperationId(op)

                    return <SidebarOperation
                      key={operationId}
                      id={operationId}
                      operation={op}
                      tag={tag}/>
                  }).toArray()
                }
              </ul>

            </li>
          })
          .toArray()
      }
    </ul>
  </div>
}

export default Sidebar

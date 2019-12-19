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

function SidebarOperation ({ id, operation, tag, onClick }) {
  const path = operation.get('path')
  const method = operation.get('method')
  const deprecated = operation.get('operation').get('deprecated')
  const summary = operation.get('operation').get('summary')
  const version = path.match(/^\/v(\d)/) ? path.split('/')[1] : ''
  const classes = classNames('sidebar-operation-method', deprecated ? 'bg-operation-disabled' : 'bg-operation-' + method.toLowerCase())

  return <li
    className={classNames('flex content-center px-5 py-3 font-sans hover:bg-gray-xlight cursor-pointer')}
    onClick={() => onClick('operations', tag, id)}>
    <div>
      <div className={classes}>{formatMethod(method)}</div>
      {version ? <div className={'text-sm text-gray-medium text-right pr-2'}>{version}</div> : null}
    </div>
    <div
      className={classNames('w-full self-center text-sm text-gray-darker whitespace-normal', deprecated ? 'line-through' : '')}
      title={path} dangerouslySetInnerHTML={{ __html: summary || path }}>
    </div>
  </li>
}

function SidebarOperationTag ({ tag }) {
  return <div
    className="flex flex-row items-center px-5 pt-3 pb-1 uppercase font-happiness text-blue">{tag.replace(/_/gi, ' ')}</div>
}

class Sidebar extends React.Component<{}> {
  constructor (props) {
    super(props)

    this.ref = React.createRef()
  }

  whenClick = (type, tag, id) => {
    const ref = this.ref
    const { fn, layoutActions } = this.props
    const isShownKey = [type, tag, id]

    const hash = isShownKey.join('-')
    const container = fn.getScrollParent(ref.current.parentNode)
    const el = container.querySelector(`#${hash}`)

    if (el) {
      container.scrollTo({
        top: el.offsetTop - 15,
        left: el.offsetLeft,
        behavior: 'smooth'
      })
    }

    // if (type === 'operations') {
    // we're going to show an operation, so we need to expand the tag as well
    // const tagIsShownKey = layoutSelectors.isShownKeyFromUrlHashArray([tag])

    // If an `_` is present, trigger the legacy escaping behavior to be safe
    // TODO: remove this in v4.0, it is deprecated
    // if (tag.indexOf('_') > -1) {
    // console.warn('Warning: escaping deep link whitespace with `_` will be unsupported in v4.0, use `%20` instead.')
    // layoutActions.show(tagIsShownKey.map(val => val.replace(/_/g, ' ')), true)
    // }
    // }

    layoutActions.show(isShownKey, true)
  }

  render () {
    let { taggedOps, operationsFilter } = getOperationsMixins(this.props)

    if (taggedOps.size < 1) {
      return null
    }

    return <div
      ref={this.ref}
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
                        {...this.props}
                        key={operationId}
                        id={operationId}
                        operation={op}
                        tag={tag}
                        onClick={this.whenClick}/>
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
}

export default Sidebar

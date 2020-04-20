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
    className={classNames('flex items-start px-5 py-2 font-sans hover:bg-gray-xlight cursor-pointer')}
    onClick={() => onClick('operations', tag, id)}>
    <div>
      <div className={classes}>{formatMethod(method)}</div>
      {version && summary ? <div className={'text-sm text-gray-medium text-right pr-2'}>{version}</div> : null}
    </div>
    <div
      className={classNames('w-full text-sm text-gray-darker whitespace-normal', deprecated ? 'line-through' : '')}
      title={path}
      style={{ 'marginTop': '2px' }}
      dangerouslySetInnerHTML={{ __html: summary || path }}>
    </div>
  </li>
}

function SidebarOperationTag ({ tag, onClick }) {
  return <div
    onClick={() => onClick('operations-tag', tag)}
    className="flex flex-row items-center px-5 pt-3 pb-1 uppercase font-happiness text-xs text-gray cursor-pointer">
    {tag.replace(/_/gi, ' ')}
  </div>
}

class Sidebar extends React.Component<{}> {
  constructor (props) {
    super(props)

    this.ref = React.createRef()
  }

  whenClick = (type, tag, id) => {
    const { layoutActions } = this.props
    const isShownKey = [type, tag, id].filter(Boolean)

    const hash = isShownKey.join('-')
    this.scrollTo(`#${hash}`)

    layoutActions.show(isShownKey, true)
  }

  scrollTo = (selector) => {
    const ref = this.ref
    const { fn } = this.props
    const container = fn.getScrollParent(ref.current.parentNode)
    const el = container.querySelector(selector)

    if (el) {
      container.scrollTo({
        top: el.offsetTop - 15,
        left: el.offsetLeft // ,
        // behavior: 'smooth'
      })
    }
  }

  scrollToModels = () => {
    this.scrollTo('.models')
  }

  render () {
    const { getComponent } = this.props
    let { taggedOps, operationsFilter } = getOperationsMixins(this.props)

    if (taggedOps.size < 1) {
      return null
    }

    const Footer = getComponent('Footer', true)

    return <div
      ref={this.ref}
      className="absolute flex flex-col contain overflow-hidden pt-2 top-0 left-0 bottom-0 right-0 contain-strict bg-gray-xlighter">
      <div>
        <ul className={'reset-list'}>
          <li>
            <div
              onClick={() => this.scrollTo('.information-container')}
              className="px-5 pt-3 pb-2 uppercase font-happiness text-blue hover:bg-gray-xlight cursor-pointer">
              Introduction
            </div>
            <div
              onClick={() => this.scrollTo('.operations-container')}
              className="px-5 uppercase font-happiness text-blue hover:bg-gray-xlight cursor-pointer">
              <div className="pt-3 pb-2">Routes</div>
              <div className="border-b border-gray-light"/>
            </div>
          </li>
        </ul>
      </div>
      <div className="overflow-y-scroll">
        <ul className={'reset-list'}>
          {
            taggedOps
              .map((tagObj, tag) => {
                let operations = operationsFilter(tagObj.get('operations'))

                if (operations.size === 0) {
                  return null
                }

                return <li key={tag}>
                  <SidebarOperationTag tag={tag} onClick={this.whenClick}/>

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
      <div>
        <ul className={'reset-list pb-2'}>
          <li>
            <div
              onClick={() => this.scrollTo('.models-container')}
              className="px-5 uppercase font-happiness text-blue hover:bg-gray-xlight cursor-pointer">
              <div className="border-b border-gray-light"/>
              <div className="pt-3 pb-2">Models</div>
            </div>
            {
              Footer ? <div
                onClick={() => this.scrollTo('.footer-container')}
                className="px-5 uppercase font-happiness text-blue hover:bg-gray-xlight cursor-pointer">
                <div className="pt-3 pb-2">About</div>
              </div> : null
            }
          </li>
        </ul>
      </div>
    </div>
  }
}

export default Sidebar

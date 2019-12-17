import { Icon } from '@reswagger/components'
import { ReactComponent as ARROWFORTH } from '@reswagger/components/src/statics/svg/arrowForth.svg'
import React from 'react'
import classNames from 'classnames'
import { helpers } from 'swagger-client'
const { opId } = helpers

const SWAGGER2_OPERATION_METHODS = [
  'get', 'put', 'post', 'delete', 'options', 'head', 'patch'
]

const OAS3_OPERATION_METHODS = SWAGGER2_OPERATION_METHODS.concat(['trace'])

const Sidebar = ({ fn, getConfigs, layoutSelectors, operationsSelectors, specSelectors }) => {
  let taggedOps = specSelectors.taggedOperations()

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

  return <div
    className="absolute flex flex-column contain overflow-hidden top-0 left-0 bottom-0 right-0 contain-strict bg-gray-lighter overflow-y-scroll">
    {taggedOps
      .map((tagObj, tag) => {
        let operations = tagObj.get('operations')
        if (operationsKeyword) {
          if (operationsKeyword !== true) {
            operations = fn.operationsFilter(operations, operationsKeyword)
          }
        }

        if (operations.size === 0) {
          return null
        }
        return <div key={tag}>
          <div className='flex flex-row items-center m-1 p-1 font-sans hover:bg-gray-light'>
            <Icon svg={ARROWFORTH} width='1.1rem' color='blue'/>
            <span className='ml-1 text-lg text-blue'>{tag}</span>
          </div>
          {
            operations.map(op => {
              const path = op.get('path')
              const method = op.get('method')
              const operationId =
                op.getIn(['operation', '__originalOperationId']) ||
                op.getIn(['operation', 'operationId']) ||
                opId(op.get('operation'), path, method) ||
                op.get('id')

              const validMethods = specSelectors.isOAS3()
                ? OAS3_OPERATION_METHODS
                : SWAGGER2_OPERATION_METHODS

              if (validMethods.indexOf(method) === -1) {
                return null
              }

              return (
                <div
                  className={classNames('flex content-center m-1 p-1 font-sans hover:bg-gray-light')}
                  onClick={() => {
                    const ele = document.getElementById(`operations-${tag}-${operationId}`)
                    if (ele) {
                      window.scrollTo({
                        top: ele.offsetTop - 15,
                        left: ele.offsetLeft,
                        behavior: 'smooth'
                      })
                    } else {
                      console.log('WRONG operationID, u bad crafter')
                    }
                  }}>
                  <div className={
                    classNames('min-w-1/5 mr-2 text-sm font-bold uppercase self-center justify-center', {
                      'text-emerald': method === 'post',
                      'text-blue': method === 'get',
                      'text-red': method === 'delete',
                      'text-waterGreen-active': method === 'patch',
                      'text-orange': method === 'put'
                    })
                  }>
                    {method}
                  </div>
                  <div
                    className='flex w-full self-center text-sm text-gray-darker truncate'
                    title={path}>{path}</div>
                </div>
              )
            }).toArray()
          }
        </div>
      })
      .toArray()
    }
  </div>
}

export default Sidebar

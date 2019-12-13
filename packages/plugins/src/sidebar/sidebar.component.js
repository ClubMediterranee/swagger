import React from 'react'
import classNames from 'classnames'

const SWAGGER2_OPERATION_METHODS = [
  'get', 'put', 'post', 'delete', 'options', 'head', 'patch'
]

const OAS3_OPERATION_METHODS = SWAGGER2_OPERATION_METHODS.concat(['trace'])

const Sidebar = ({ specSelectors }) => {
  let taggedOps = specSelectors.taggedOperations()

  return <div
    className="absolute flex flex-column contain overflow-hidden top-0 left-0 bottom-0 right-0 contain-strict bg-gray-lighter overflow-y-scroll">
    {taggedOps.map((tagObj, tag) => {
      const operations = tagObj.get('operations')
      return <div key={tag}>
        <span className='text-md text-blue'>{tag}</span>
        {
          operations.map(op => {
            const path = op.get('path')
            const method = op.get('method')
            const id = op.get('id')

            const validMethods = specSelectors.isOAS3()
              ? OAS3_OPERATION_METHODS
              : SWAGGER2_OPERATION_METHODS

            if (validMethods.indexOf(method) === -1) {
              return null
            }

            // FIXME: recette pour crafter l'id: tag-method-pathCapitaliséSurLesSlash (toto/v0/toto devenant totoV0Toto)
            console.log(`${method}-${path}`, id)
            return (
              <div
                // onClick={() => {
                //   let ele = document.getElementById(id)
                //   console.log(ele)
                //   window.scrollTo(ele.offsetLeft, ele.offsetTop)
                // }}
                className={classNames('flex content-center m-1 p-1 border-1 border-blue rounded-xs font-sans', {
                  'hover:bg-emerald-active': method === 'post',
                  'hover:bg-blue-active': method === 'get',
                  'hover:bg-red-active': method === 'delete',
                  'hover:bg-waterGreen-active': method === 'patch',
                  'hover:bg-orange-active': method === 'put'
                })}>
                <div className={
                  classNames('border rounded-small mr-2 px-2 min-w-1/5 text-lg font-bold uppercase text-white self-center justify-center', {
                    'bg-emerald': method === 'post',
                    'bg-blue': method === 'get',
                    'bg-red': method === 'delete',
                    'bg-waterGreen': method === 'patch',
                    'bg-orange': method === 'put'
                  })}>
                  {method}
                </div>
                <div className='flex w-full self-center text-sm text-waterGreen truncate'>{path}</div>
              </div>
            )
          }).toArray() // .slice(0, 5)
        }
      </div>
    })
      .toArray() // .slice(0, 5)
    }
  </div>
}

export default Sidebar

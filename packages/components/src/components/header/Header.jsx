import React, { useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Header = ({ children, sticky = true }) => {
  const headerRef = useRef(null)
  const [height, setHeight] = useState()

  useLayoutEffect(() => {
    if (headerRef) {
      setHeight(`${headerRef.current.offsetHeight}px`)
    }
  }, [headerRef])

  return (
    <div style={{ height }}>
      <div ref={headerRef} className={classNames('z-6 bg-white w-full top-0 right-0 left-0 mb-10 border-b-1 border-gray-light', {
        'absolute': !sticky,
        'fixed': sticky
      })}>
        <div className="relative flex items-center p-4">
          <div className='flex flex-row w-full'>
            <div className='flex flex-col sm:flex-row sm:items-center flex-auto'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  sticky: PropTypes.bool
}

export {
  Header
}

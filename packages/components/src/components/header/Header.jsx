import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Header = ({ children, sticky = true }) => {
  return (
    <div className={classNames('z-6 bg-white w-full top-0 right-0 left-0', { 'absolute': !sticky, 'fixed': sticky })}>
      <div className="relative flex items-center p-4 sm:px-12 lg:px-56">
        {children}
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

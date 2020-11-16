import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { ReactComponent as HEART } from '@clubmed/components/src/statics/svg/star.svg'
import { Icon } from '@clubmed/components'

const DEFAULT_COLOR = 'dimgrey'
const ACTIVE_COLOR = 'yellow'

const BookmarkButton = ({ isActive, onClick, className, ...props }) => {
  const [isHover, setIsHover] = useState(false)

  return <Icon
    svg={HEART}
    width="1.5rem"
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
    color={(isHover || isActive) ? ACTIVE_COLOR : DEFAULT_COLOR}
    svgProps={{
      fill: (isHover || isActive) ? 'currentColor' : 'none',
      stroke: 'currentColor'
    }}
    isNotMonoChrome
    className={classnames('cursor-pointer', className)}
    onClick={onClick}
    {...props}
  />
}

BookmarkButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default BookmarkButton

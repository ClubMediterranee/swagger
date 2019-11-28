import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Button = (props) => {
  let {
    component: Component = 'button',
    children,
    borderColor,
    bgColor = 'blue',
    color = 'white',
    fontWeight = 'bold',
    paddingX = 4,
    paddingY = 1,
    disabled,
    ...otherProps
  } = props

  if (disabled) {
    bgColor = 'gray-light'
    borderColor = 'gray-light'
  }

  if (!borderColor) {
    borderColor = bgColor
  }

  const classNames = `reset-button inline-flex flex-col items-stretch overflow-hidden text-base transition-colors
  bg-${bgColor} border-${borderColor} text-${color} focus:bg-${bgColor}-active focus:border-${borderColor}-active 
  hover:bg-${bgColor}-active hover:border-${borderColor}-active focus:text-${color}-active hover:text-${color}-active cursor-pointer border-1 border-solid rounded-small`

  return (
    <Component
      {...otherProps}
      disabled={disabled}
      className={classnames(classNames, props.className)}>
      <span
        className={`flex justify-center items-center w-full font-${fontWeight} px-${paddingX} py-${paddingY}`}>
        <span className="m-1 text-center flex justify-center items-center">{children}</span>
      </span>
    </Component>
  )
}

Button.propTypes = {
  component: PropTypes.any,
  borderColor: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  paddingX: PropTypes.number,
  paddingY: PropTypes.number,
  disabled: PropTypes.bool
}

export { Button }

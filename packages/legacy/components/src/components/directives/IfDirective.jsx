import React from 'react'

export function withIf (Component) {
  return ({ if: show, ...props }) => {
    if (!show) {
      return null
    }

    return <Component {...props}/>
  }
}

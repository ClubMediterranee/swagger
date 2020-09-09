import React from 'react'

export function AuthorizeSvg ({ isAuthorized }) {
  return <svg width="20" height="20">
    <use href={isAuthorized ? '#locked' : '#unlocked'} xlinkHref={isAuthorized ? '#locked' : '#unlocked'}/>
  </svg>
}

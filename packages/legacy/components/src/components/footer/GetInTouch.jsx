import React from 'react'

export function GetInTouch () {
  return <div
    className="bg-gray-darker font-bold inline-block px-2 relative text-md text-gray-darker"
    style={{ 'bottom': '-1px', 'height': '2.5rem', 'left': '1.5rem', 'lineHeight': '2.5rem', 'right': '1.5rem' }}>
    <svg
      className="absolute fill-current pin-t" width="24" height="40" viewBox="0 0 24 40"
      style={{ 'height': '2.5rem', 'left': '-23px' }}>
      <path d="M24 0c-4.3 0-8 3.1-8.7 7.3L8.6 33c-.8 4-4.5 7-8.6 7h24V0z"></path>
    </svg>
    <svg
      className="absolute fill-current pin-t -scale-x-1" width="24" height="40" viewBox="0 0 24 40"
      style={{ 'height': '2.5rem', 'right': '-23px' }}>
      <path d="M24 0c-4.3 0-8 3.1-8.7 7.3L8.6 33c-.8 4-4.5 7-8.6 7h24V0z"></path>
    </svg>
    <span className="text-white">GET IN TOUCH</span>
  </div>
}

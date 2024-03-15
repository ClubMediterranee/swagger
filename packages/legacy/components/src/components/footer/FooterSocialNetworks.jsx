import { Icon } from '../..'
import React from 'react'

export function FooterSocialNetworks ({ items }) {
  if (!items) {
    return null
  }
  return <div className="decoration-strikethrough lg:rtl:pl-3 relative w-full lg:w-auto z-1">
    <ul className="reset-list flex md:justify-center lg:justify-start -mx-1 py-5 md:py-0">
      {items.map(({ icon, href }) => (
        <li className="mx-1" key={href}>
          <a
            href={href}
            className="bg-gray-darker border-1 border-gray-dark flex items-center justify-center text-center text-white focus:text-gray-light hover:text-gray-light"
            target="_blank"
            rel="noreferrer noopener"
            style={{ width: '3.125rem', height: '3.125rem' }}>
            <Icon svg={icon} width="1.5rem"/>
          </a>
        </li>
      ))}
    </ul>
  </div>
}

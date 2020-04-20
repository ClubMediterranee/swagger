import { ReactComponent as FAQ } from '../../statics/svg/faq.svg'
import React from 'react'

export function FooterContacts ({ href }) {
  return <div className="pt-4 relative w-full z-1 lg:border-b-1 border-gray-dark md:pb-4">
    <ul className="reset-list flex flex-col md:flex-row md:justify-between md:-mx-1">
      <li
        className="border-b-1 md:border-b-0 border-gray-dark mb-3 md:mb-0 md:mx-1 pb-3 md:pb-0 last-child-mb-0 last-child-border-b-0">
        <a
          className="cursor-pointer flex items-center font-bold font-sans leading-one no-underline text-sm text-white"
          href={href}
          rel="noopener noreferrer"
          target=""
          title="Your Club Med Advisor Toll Free Number">
          <span
            className="flex-no-shrink rtl:mr-1 inline-block overflow-hidden text-inherit icon-phoneBubble icon-monochrome"
            style={{ 'width': '2.5rem', 'height': '2.5rem', 'transition': 'all 0.25s ease-out 0s' }}>
            <span className="relative w-full block" style={{ 'paddingBottom': '100%' }}>
              <FAQ/>
            </span>
          </span>
          <span>
            <div className="BlockLink-text-0" data-testid="BlockLink-text">Contact us</div>
          </span>
        </a>
      </li>
    </ul>
  </div>
}

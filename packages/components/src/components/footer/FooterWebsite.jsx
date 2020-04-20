// @flow
import React from 'react'
import { Icon } from '../..'

type FooterWebsiteProps = {
  description: string,
  href: string,
  iconAlt: string,
  svg: Node,
  iconWidth: string,
  isVisible?: boolean,
};

export function FooterWebsite ({ description, href, iconAlt, svg, iconWidth, isVisible }: FooterWebsiteProps) {
  if (!isVisible) {
    return null
  }
  return (
    <li className="align-top inline-block mb-9 px-3 w-1/2 lg:w-1/3">
      <a
        className="reset-anchor block focus:underline hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
      >
        <p
          aria-level="2"
          className="reset-paragraph mb-1"
          role="heading"
          style={{ minHeight: '2.5rem' }}
        >
          <Icon alt={iconAlt} svg={svg} isNotSquare width={iconWidth}/>
          <span className="a11y">{iconAlt}</span>
        </p>
        <p className="reset-paragraph text-base">{description}</p>
      </a>
    </li>
  )
}

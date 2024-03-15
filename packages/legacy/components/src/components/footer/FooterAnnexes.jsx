import React from 'react'

export function FooterAnnexes ({ className, items }) {
  return (
    <div className={className}>
      <ul className="reset-list mb-5 -mx-2">
        {items.map(({ label, links }) => (
          <li
            className="align-top inline-block mb-5 px-2 w-1/3"
            data-testid="FooterAnnexesItem"
            key={label}
          >
            <p
              aria-level="2"
              className="reset-paragraph font-bold leading-one mb-2 text-sm uppercase"
              data-testid="FooterAnnexesHeading"
              role="heading"
            >
              {label}
            </p>
            <ul className="reset-list">
              {links.map(link => (
                <li className="leading-loose mb-1 text-sm" key={link.label}>
                  <a
                    className="inline-block leading-one text-inherit focus:text-gray-light hover:text-gray-light transition-color"
                    target="_blank"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

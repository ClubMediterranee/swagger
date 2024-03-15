// @flow
import React from 'react'

export function FooterSeo ({ className, description, title }) {
  if (!description && !title) {
    return null
  }

  return (
    <section className={className}>
      <p aria-level="2" className="mb-2 text-sm uppercase" role="heading">
        {title}
      </p>
      <p className="mb-2 reset-paragraph text-base">{description}</p>
    </section>
  )
}

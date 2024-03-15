import React from 'react'
import { FooterWebsite } from './FooterWebsite'
import { ReactComponent as CLUBMED_MEETINGS } from '@clubmed/components/src/statics/svg/clubmedMeetings.svg'
import { ReactComponent as CLUBMED_PROPERTY } from '@clubmed/components/src/statics/svg/clubmedProperty.svg'
import { ReactComponent as CLUBMED_JOBS } from '@clubmed/components/src/statics/svg/clubmedJobs.svg'
import { ReactComponent as CLUBMED } from '@clubmed/components/src/statics/svg/clubmed.svg'

export function FooterWebsites ({ business, className, corp, job, property }) {
  return <div className={className}>
    <ul className="reset-list -mx-3">
      <FooterWebsite
        {...business}
        iconAlt="Meetings and events by Club Med"
        svg={CLUBMED_MEETINGS}
        iconWidth="12.5rem"
      />
      <FooterWebsite
        {...property}
        iconAlt="Club Med Property"
        svg={CLUBMED_PROPERTY}
        iconWidth="7.5rem"
      />
      <FooterWebsite
        {...job}
        iconAlt="ClubMed Jobs"
        svg={CLUBMED_JOBS}
        iconWidth="7.5rem"
      />
      <FooterWebsite
        {...corp}
        iconAlt="Club Méditerranée"
        svg={CLUBMED}
        iconWidth="7.5rem"
      />
    </ul>
  </div>
}

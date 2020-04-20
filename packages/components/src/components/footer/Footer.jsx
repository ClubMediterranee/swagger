import React from 'react'
import { ReactComponent as FACEBOOK } from '@clubmed/components/src/statics/svg/facebook.svg'
import { ReactComponent as TWITTER } from '@clubmed/components/src/statics/svg/twitter.svg'
import { ReactComponent as YOUTUBE } from '@clubmed/components/src/statics/svg/youtube.svg'
import { ReactComponent as INSTAGRAM } from '@clubmed/components/src/statics/svg/instagram.svg'
import { ReactComponent as PINSTAREST } from '@clubmed/components/src/statics/svg/pintarest.svg'
import { FooterWebsites } from './FooterWebsites'
import { FooterSeo } from './FooterSeo'
import { FooterSocialNetworks } from './FooterSocialNetworks'
import { GetInTouch } from './GetInTouch'
import { FooterContacts } from './FooterContacts'

export function Footer () {
  const contact = 'mailto:lvisdigiapi@clubmed.com'
  const socials = [
    {
      label: 'Facebook',
      icon: FACEBOOK,
      href: 'https://www.facebook.com/ClubMedFrance'
    },
    {
      label: 'Twitter',
      icon: TWITTER,
      href: 'https://twitter.com/ClubMedfr'
    },
    {
      label: 'Youtube',
      icon: YOUTUBE,
      href: 'https://www.youtube.com/clubmed'
    },
    {
      label: 'Instagram',
      icon: INSTAGRAM,
      href: 'https://www.instagram.com/clubmed'
    },
    {
      label: 'Pintarest',
      icon: PINSTAREST,
      href: 'https://fr.pinterest.com/clubmed/'
    }
  ]

  const websites = {
    business: {
      href: 'http://www.meetings-events-clubmed.fr/',
      description: 'World class service in dream locations. With everything you expect from an all-inclusive and much more. For groups of 20 adults or more, Club Med organizes events for all types of groups. From corporate meetings, exotic incentive programs, social gatherings, family reunions to Full Resort Buy Outs and more.',
      isVisible: true
    },
    corp: {
      href: 'http://www.clubmed-corporate.com/?lang=fr',
      description: 'Visit the Corporate Club Med site, to learn more about the Group, the ownership and sustainable development policy.',
      isVisible: true
    },
    job: {
      href: 'http://www.clubmedjobs.fr/',
      description: 'Looking to participate in the ClubMed adventure? Learn more on the international recruitment page and stay ahead of the latest Club Med HR news.',
      isVisible: true
    },
    property: {}
  }
  const seo = {
    title: 'WHATEVER YOUR IDEA OF HAPPINESS IS, YOU’LL FIND IT AT CLUB MED',
    description: 'Club Med specializes in premium all-inclusive vacations packages for families – with absolutely no hidden costs. There are 65 award-winning resorts worldwide; choose between tropical island oasis, thrilling ski retreat, exotic adventure, and luxurious cruise aboard a sailing ship – at Club Med, the best vacation deals are at your fingertips.'
  }

  return <div>
    <div className="Layout relative table table-fixed w-full">
      <div className="relative z-3">
        <div className="text-md text-white">
          <div className="m-auto w-full max-w-site">
            <GetInTouch/>
          </div>
          <div className="bg-gray-darker flex items-center px-5">
            <div className="flex flex-col lg:flex-row md:items-end m-auto max-w-site relative w-full">
              <FooterContacts href={contact}/>
              <FooterSocialNetworks items={socials}/>
            </div>
          </div>
        </div>
        <footer className="bg-gray-darker text-white">
          <div className="flex flex-wrap m-auto max-w-site px-5 py-5">
            <FooterWebsites {...websites} className="hidden sm:block"/>
            <div className="lg:w-3/5">
              <FooterSeo {...seo} className="md:w-4/5 lg:w-auto"/>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
}

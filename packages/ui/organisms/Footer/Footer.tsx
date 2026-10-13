"use client";

import { Icon } from "@clubmed/trident-icons";
import { IconicNames } from "@clubmed/trident-icons";
import { useDevice } from "@clubmed/trident-ui/contexts/Devices/Device";
import { Button } from "@clubmed/trident-ui/ui/buttons/Button";
import { ElasticHeight } from "@clubmed/trident-ui/ui/ElasticHeight";
import { Link } from "@clubmed/trident-ui/ui/Link";
import classnames from "classnames";
import { Fragment, FunctionComponent, PropsWithChildren, ReactNode, useState } from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterReviews {
  hasGoogle: boolean;
  hasTripAdvisor: boolean;
  label: string;
}

export interface FooterProps {
  contact?: {
    phoneCost: string;
    phoneNumber: string;
  };
  columns: {
    label: string;
    links: FooterLink[];
  }[];
  cookiesConsentLabel?: string;
  corporateLinks: {
    label: string;
    href: string;
    description: string;
  }[];
  socialNetworks: {
    label: string;
    href: string;
    icon: IconicNames;
  }[];
  legalLinks: FooterLink[];
  newsletter?: {
    cta: FooterLink;
    label: string;
  } | null;
  reviews?: FooterReviews;
}

const openDidomiPreferences = (e: React.SyntheticEvent) => {
  e.preventDefault();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Didomi?.preferences.show();
};

export function Footer({ contact, columns, corporateLinks, newsletter, socialNetworks, legalLinks, cookiesConsentLabel }: FooterProps) {
  const socialNetworksBlock = (
    <Fragment>
      {socialNetworks.map(({ label, href, icon }) => (
        <Button
          component="a"
          key={label}
          icon={icon}
          aria-label={label}
          href={href}
          color="black"
          theme="outline"
          variant="circle"
          target="_blank"
        />
      ))}
    </Fragment>
  );

  return (
    <footer>
      <div className="flex flex-col items-center gap-y-20 bg-white p-20 lg:flex-row lg:justify-between lg:p-40">
        {contact ? (
          <a className="flex items-center gap-x-12 lg:ms-auto" href={`tel:${contact.phoneNumber.split(" ").join("")}`}>
            {/* this might need to become its own component in time */}
            <span className="flex flex-col text-end">
              <span className="text-h5 font-serif">{contact.phoneNumber}</span>
              <span className="text-b5">{contact.phoneCost}</span>
            </span>
            <Button component="span" icon="Phone" color="black" theme="solid" variant="circle" aria-label={contact.phoneNumber} />
          </a>
        ) : null}

        {!!newsletter && (
          <div className="flex flex-col items-center gap-x-20 gap-y-12 lg:-order-1 lg:flex-row">
            <>
              <p className="text-b2 font-semibold">{newsletter.label}</p>
              <Button component="a" color="black" theme="solid" href={newsletter.cta.href} target="_blank">
                {newsletter.cta.label}
              </Button>
            </>
          </div>
        )}
      </div>

      <div className="bg-lightSand">
        <div className="max-w-1220 mx-auto justify-between gap-x-40 p-20 md:flex md:items-start lg:p-40">
          <section className="">
            <div className="divide-sand divide-y md:flex md:flex-wrap md:items-start md:gap-x-32 md:divide-none">
              {columns.map(({ label, links }) => (
                <div key={label} className="py-20 md:pt-0">
                  <FooterColumn label={label} header={<span className="text-b3 font-semibold">{label}</span>}>
                    <div className="flex flex-col gap-y-8 pt-20">
                      {links.map(({ label, href }) => (
                        <Link key={label} label={label} href={href} target="_blank" underlined={false} />
                      ))}
                    </div>
                  </FooterColumn>
                </div>
              ))}
            </div>
            <div className="hidden gap-x-8 pt-20 md:flex">{socialNetworksBlock}</div>
          </section>
          <section className="divide-sand border-sand md:max-w-360 divide-y border-t md:divide-none md:border-none">
            {corporateLinks.map(({ label, href, description }) => {
              return (
                <div key={label} className="py-20 md:pt-0">
                  <span className="flex items-center justify-between gap-x-8 md:justify-start">
                    <Link className="w-full font-semibold md:w-auto" href={href} label={label} target="_blank" underlined={false} />
                    <Icon name="ArrowTailRight" width="24px" />
                  </span>
                  <p className="text-b3 mt-20 hidden md:block">{description}</p>
                </div>
              );
            })}
          </section>
          <section className="flex gap-x-8 py-20 md:hidden">{socialNetworksBlock}</section>
        </div>
      </div>

      <div className="bg-lightSand p-20 pt-0 md:px-40">
        <div className="flex flex-col justify-between gap-x-20 gap-y-12 md:flex-row md:items-end">
          <div className="flex flex-wrap gap-x-20 gap-y-12">
            {legalLinks.map(({ label, href }) => (
              <Link key={label} label={label} href={href} target="_blank" underlined={false} />
            ))}
            {cookiesConsentLabel && (
              <button
                className="text-b3 decoration-none link-container cursor-pointer text-inherit"
                title="didomi"
                onClick={openDidomiPreferences}
              >
                {cookiesConsentLabel}
              </button>
            )}
          </div>
          {/* TODO add Footer reviews here*/}
        </div>
      </div>
    </footer>
  );
}

const FooterColumn: FunctionComponent<PropsWithChildren<{ header: ReactNode; label?: string }>> = ({ header, children, label = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useDevice("medium");

  return (
    <Fragment>
      <button
        className="flex w-full items-center justify-between text-start"
        aria-controls={`footer-column-${label}-links`}
        aria-expanded={isDesktop || isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {header}
        <span
          className={classnames("inline-flex shrink-0 md:hidden transition-transform duration-300 motion-reduce:transition-none", {
            "rotate-180": isOpen
          })}
        >
          <Icon name="ArrowDefaultDown" width="30px" />
        </span>
      </button>
      <ElasticHeight
        isExpanded={isDesktop || isOpen}
        role="presentation"
        id={`footer-column-${label}-links`}
        className="[&[data-expanded=false]>div]:invisible"
      >
        {children}
      </ElasticHeight>
    </Fragment>
  );
};

export default Footer;

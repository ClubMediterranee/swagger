"use client";
import { Icon } from "@clubmed/trident-ui/atoms/Icon";
import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { ElasticHeight } from "@clubmed/trident-ui/molecules/ElasticHeight";
import { HamburgerIcon } from "@clubmed/trident-ui/molecules/HamburgerIcon";
import { animated, useSpring } from "@react-spring/web";
import classnames from "classnames";
import { Fragment, FunctionComponent, PropsWithChildren, ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { HeaderNavItemProps, HeaderNavTab } from "./HeaderNavPanel";
import { useMenu } from "./hooks/useMenu";

export interface HeaderProps {
  sublabel?: string | ReactNode;
  homepageUrl: string;
  items?: HeaderNavItemProps[];
  openMenu: string;
}

export const HOVER_ENTRY_DURATION = 300;
export const HOVER_EXIT_DURATION = 500;
export const Header: FunctionComponent<PropsWithChildren<HeaderProps>> = ({ children, homepageUrl, sublabel, items, openMenu }) => {
  const { isMobileMenuOpen, activeIndex, setIsMobileMenuOpen, setMenu, resetMenu, transition } = useMenu();

  const height = 60;

  items = useMemo(() => {
    return items?.map((item, index) => {
      return {
        ...item,
        index
      };
    });
  }, [items]);

  return (
    <header role="banner" style={{ height: `${height}px` }}>
      <div
        style={{ height: `${height}px` }}
        className="z-1 fixed top-0 left-0 bg-white w-full flex items-center justify-between p-8 ps-20 lg:px-20"
      >
        <Link to={homepageUrl} title="Club Med Homepage">
          <div className="w-[120px] md:w-[160px]">
            <Icon name="ClubMed" width="100%" className="text-ultramarine" />
          </div>
          {sublabel}
        </Link>
        <nav className="flex items-center gap-x-12 px-8">
          {items
            ?.filter(({ position }) => {
              return position !== "right";
            })
            .map((item) => {
              return (
                <HeaderNavTab
                  key={item.url}
                  index={item.index as number}
                  activeIndex={activeIndex}
                  setMenu={setMenu}
                  resetMenu={resetMenu}
                  item={item}
                />
              );
            })}
        </nav>
        <div className="flex gap-x-8">
          {items
            ?.filter(({ position }) => {
              return position === "right";
            })
            .map((item) => {
              return (
                <HeaderNavTab
                  key={item.url}
                  index={item.index as number}
                  activeIndex={activeIndex}
                  setMenu={setMenu}
                  resetMenu={resetMenu}
                  item={item}
                />
              );
            })}
          {children}
          {items && (
            <Button
              variant="icon"
              title={openMenu}
              theme="blackStroke"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className={classnames("md:hidden", { "border-0": isMobileMenuOpen })}
            >
              <HamburgerIcon isActive={isMobileMenuOpen} />
            </Button>
          )}
        </div>
      </div>
      {transition(
        (styles, item) =>
          item && (
            <animated.div
              style={styles}
              role="menu"
              aria-label="mobile-menu"
              className="z-1 fixed inset-x-0 bottom-0 top-[64px] overflow-y-auto bg-white md:hidden"
            >
              {items?.map((item) => {
                return (
                  <MobileMenuCollapse
                    key={item.url}
                    label={item.label}
                    header={<span className="text-b2 font-bold">{item.label}</span>}
                    className="border-pearl border-b p-20"
                  >
                    {item.columns?.map((column) => {
                      return column.sections.map((section) => {
                        return (
                          <div key={section.title} className="px-20">
                            <div className="border-pearl border-b">
                              <MobileMenuCollapse
                                label={section.title}
                                header={<span className="text-b3 py-20 font-bold">{section.title}</span>}
                              >
                                <ul className="text-b3 border-pearl space-y-8 border-b pb-20">
                                  {section.links.map((link) => {
                                    return (
                                      <li key={link.label}>
                                        <a href={link.url} className="">
                                          {link.label}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </MobileMenuCollapse>
                            </div>
                          </div>
                        );
                      });
                    })}
                  </MobileMenuCollapse>
                );
              })}
            </animated.div>
          )
      )}
    </header>
  );
};

const MobileMenuCollapse: FunctionComponent<PropsWithChildren<{ header: ReactNode; label?: string; className?: string }>> = ({
  header,
  children,
  label = "",
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const AnimatedIcon = animated(Icon);

  const { rotate } = useSpring({
    rotate: isOpen ? -180 : 0
  });
  return (
    <Fragment>
      <button
        className={classnames("flex w-full items-center justify-between text-start", className)}
        aria-controls={`navigation-section-${label}-links`}
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {header}
        <AnimatedIcon name="ArrowDefaultDown" className="md:hidden" width="30px" style={{ rotate }} />
      </button>
      <ElasticHeight role="presentation" id={`navigation-section-${label}-links`} className={classnames("md:h-auto", { "h-0": !isOpen })}>
        {children}
      </ElasticHeight>
    </Fragment>
  );
};

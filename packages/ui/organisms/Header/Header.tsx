"use client";

import {animated, useSpring, useTransition} from "@react-spring/web";
import classnames from "classnames";
import {Fragment, FunctionComponent, PropsWithChildren, ReactNode, useEffect, useRef, useState} from "react";

import {Icon} from "../../atoms/Icon";
import {useDevice} from "../../contexts/Device";
import {Button} from "../../molecules/Buttons";
import {ButtonAnchor} from "../../molecules/Buttons/ButtonAnchor";
import {ElasticHeight} from "../../molecules/ElasticHeight";
import {HamburgerIcon} from "../../molecules/HamburgerIcon";
import {Link} from "react-router-dom";

export interface HeaderNavItemProps extends Record<string, unknown> {
  label: string;
  url: string;
  columns?: {
    sections: { title: string; url: string; links: { label: string; url: string }[] }[];
  }[];
}

export interface HeaderProps {
  sublabel?: string | ReactNode;
  homepageUrl: string;
  items?: HeaderNavItemProps[];
  openMenu: string;
}

export const HOVER_ENTRY_DURATION = 300;
export const HOVER_EXIT_DURATION = 500;

function HeaderNavPanel({index, activeIndex, item}: {
  index: number,
  activeIndex: number,
  item: HeaderNavItemProps
}) {
  return <div
    className={classnames(
      "absolute inset-x-0 top-full flex columns-5 justify-center gap-x-40 bg-white px-20 py-40",
      {
        hidden: index !== activeIndex || item.columns?.length === 0
      }
    )}
    role="menu"
    aria-label="desktop-menuItem"
  >
    {item.columns?.map((column, columnIndex) => {
      return (
        <div
          key={columnIndex}
          className="text-b3 break-inside-avoid-column"
          role="menuitem"
        >
          {column.sections.map(({links, title, url}, sectionIndex) => {
            return (
              <div
                key={title}
                className={classnames({
                  "mt-32": sectionIndex !== 0 && links.length,
                  "mb-12": !links.length
                })}
              >
                {title && (
                  <a
                    href={url}
                    className={classnames("block font-bold", {
                      "pb-20": links.length
                    })}
                  >
                    {title}
                  </a>
                )}
                <ul className="space-y-8">
                  {links.map((link) => {
                    return (
                      <li key={link.label}>
                        <a href={link.url} className="">
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      );
    })}
  </div>;
}

function useHeader() {
  const hoverInTimeout = useRef<ReturnType<typeof setTimeout>>();
  const hoverOutTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isDesktop = useDevice("desktop");

  useEffect(() => {
    return () => {
      clearTimeout(hoverOutTimeout.current);
      clearTimeout(hoverInTimeout.current);
    };
  }, []);

  const setMenu = (index: number, isFocused?: boolean) => {
    clearTimeout(hoverOutTimeout.current);
    hoverInTimeout.current = setTimeout(
      () => {
        setActiveIndex(index);
      },
      isFocused ? 0 : HOVER_ENTRY_DURATION
    );
  };

  const resetMenu = (isFocused?: boolean) => {
    clearTimeout(hoverInTimeout.current);
    hoverOutTimeout.current = setTimeout(
      () => {
        setActiveIndex(-1);
      },
      isFocused ? 0 : HOVER_EXIT_DURATION
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [isDesktop]);

  const transition = useTransition(isMobileMenuOpen, {
    from: {opacity: 0, x: "-100%"},
    enter: {opacity: 1, x: "0"},
    leave: {opacity: 0, x: "100%"}
  });

  return {isMobileMenuOpen, setIsMobileMenuOpen, activeIndex, setMenu, resetMenu, transition};
}

export const Header: FunctionComponent<PropsWithChildren<HeaderProps>> = ({
                                                                            children,
                                                                            homepageUrl,
                                                                            sublabel,
                                                                            items,
                                                                            openMenu
                                                                          }) => {
  const {isMobileMenuOpen, activeIndex, setIsMobileMenuOpen, setMenu, resetMenu, transition} = useHeader();

  const height = 60;

  return (
    <header role="banner" style={{height: `${height}px`}}>
      <div style={{height: `${height}px`}}
           className="z-1 fixed top-0 left-0 bg-white w-full flex items-center justify-between p-8 ps-20 lg:px-20">
        <Link to={homepageUrl} title="Club Med Homepage">
          <div className="w-[120px] md:w-[160px]">
            <Icon name="ClubMed" width="100%" className="text-ultramarine"/>
          </div>
          {sublabel}
        </Link>
        <nav className="flex items-center gap-x-12 px-8">
          {items?.map((item, index) => {
            return (
              <Fragment key={item.url}>
                <div
                  onMouseEnter={() => {
                    setMenu(index);
                  }}
                  onMouseLeave={() => {
                    resetMenu(false);
                  }}
                >
                  <ButtonAnchor
                    variant="text"
                    theme="blackStroke"
                    onBlur={() => {
                      resetMenu(true);
                    }}
                    onFocus={() => {
                      setMenu(index, true);
                    }}
                    className="hidden border-0 md:inline-block"
                    href={item.url}
                  >
                    {item.label}
                  </ButtonAnchor>

                  {
                    item?.columns?.length && item?.columns?.length > 0 ? (
                        <HeaderNavPanel index={index} activeIndex={activeIndex} item={item}/>)
                      : null
                  }
                </div>
              </Fragment>
            );
          })}
        </nav>
        <div className="flex gap-x-8">
          {children}
          {items && (
            <Button
              variant="icon"
              title={openMenu}
              theme="blackStroke"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className={classnames("md:hidden", {"border-0": isMobileMenuOpen})}
            >
              <HamburgerIcon isActive={isMobileMenuOpen}/>
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
                    className="border-pearl border-b px-20 py-20"
                  >
                    {item.columns?.map((column) => {
                      return column.sections.map((section) => {
                        return (
                          <div key={section.title} className="px-20">
                            <div className="border-pearl border-b">
                              <MobileMenuCollapse
                                label={section.title}
                                header={
                                  <span className="text-b3 py-20 font-bold">{section.title}</span>
                                }
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

const MobileMenuCollapse: FunctionComponent<
  PropsWithChildren<{ header: ReactNode; label?: string; className?: string }>
> = ({header, children, label = "", className}) => {
  const [isOpen, setIsOpen] = useState(false);
  const AnimatedIcon = animated(Icon);

  const {rotate} = useSpring({
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
        <AnimatedIcon
          name="ArrowDefaultDown"
          className="md:hidden"
          width="30px"
          style={{rotate}}
        />
      </button>
      <ElasticHeight
        role="presentation"
        id={`navigation-section-${label}-links`}
        className={classnames("md:h-auto", {"h-0": !isOpen})}
      >
        {children}
      </ElasticHeight>
    </Fragment>
  );
};

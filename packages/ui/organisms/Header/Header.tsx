"use client";

import { Icon } from "@clubmed/trident-icons";
import { Button, CommonButtonProps } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { HamburgerIcon } from "@clubmed/trident-ui/molecules/HamburgerIcon";
import classnames from "classnames";
import { type PropsWithChildren, type ReactNode, useMemo } from "react";

import { Link as BaseLink } from "../../molecules/Link/Link";
import { HeaderColumn, HeaderColumns } from "./HeaderColumns.js";
import { HeaderMobile } from "./HeaderMobile";
import { HeaderPanel } from "./HeaderPanel";
import { HeaderSection, HeaderSectionProps } from "./HeaderSection";
import { useMenu } from "./hooks/useMenu";

export interface HeaderColumnProps {
  sections: HeaderSectionProps[];
}

export interface HeaderNavItemProps extends CommonButtonProps, Record<string, unknown> {
  label: string;
  url?: string;
  position?: string;
  columns?: HeaderColumnProps[];
  component?: ReactNode;
}

export interface HeaderProps {
  homepageUrl: string;
  items?: HeaderNavItemProps[];
  openMenu: string;
  topBurgerMenuContent?: ReactNode;
  Link?: HeaderSectionProps["Link"];
  version?: string;
}

export function Header({
  children,
  version,
  Link = BaseLink,
  homepageUrl,
  items,
  openMenu,
  topBurgerMenuContent
}: PropsWithChildren<HeaderProps>) {
  const { isMobileMenuOpen, activeIndex, setIsMobileMenuOpen, setMenu, resetMenu, transition } = useMenu();
  items = useMemo(() => {
    return items?.map((item, index) => {
      return {
        ...item,
        index
      };
    });
  }, [items]);

  return (
    <header role="banner" className="sticky top-0 bg-white z-2">
      <div className=" relative flex items-center justify-between p-8 lg:px-20">
        <Link href={homepageUrl} title="Club Med Homepage relative">
          <div className="w-[30px] md:w-[160px] ">
            <div className={"flex flex-col"}>
              <Icon name="ClubMed" width="100%" aspectRatio className="hidden md:block text-ultramarine" />
              <Icon name="Trident" width="100%" aspectRatio className="ml-8 md:hidden text-ultramarine" />
              <span className="hidden md:block text-b6">{version}</span>
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-x-12 px-8">
          {items
            ?.filter(({ position }) => {
              return position !== "right";
            })
            .map((item) => {
              const index: number = item.index as number;

              return (
                <HeaderPanel
                  Link={Link}
                  key={"header-panel-" + index}
                  {...item}
                  isActive={!!(item.index === activeIndex && (item.columns || item.component))}
                  onMouseEnter={() => setMenu(index)}
                  onMouseLeave={() => resetMenu(false)}
                >
                  {item.columns && (
                    <HeaderColumns>
                      {item.columns?.map((column, columnIndex) => (
                        <HeaderColumn key={"col-" + index + "-" + columnIndex}>
                          {column.sections.map((section, sectionIndex) => (
                            <HeaderSection
                              Link={Link}
                              key={"col-section-" + index + "-" + columnIndex + "-" + sectionIndex}
                              {...section}
                              sectionIndex={sectionIndex}
                            />
                          ))}
                        </HeaderColumn>
                      ))}
                    </HeaderColumns>
                  )}
                  {item.component}
                </HeaderPanel>
              );
            })}
        </nav>

        <div className="flex gap-x-8">
          {items
            ?.filter(({ position }) => {
              return position === "right";
            })
            .map((item) => {
              const index: number = item.index as number;

              if (!item.url && !item.columns?.length && !item.component) {
                return (
                  <span key={`header-panel-${index}`} className={item.className}>
                    {item.label}
                  </span>
                );
              }

              return (
                <HeaderPanel
                  key={`header-panel-${index}`}
                  {...item}
                  isActive={!!(item.index === activeIndex && (item.columns || item.component))}
                  onMouseEnter={() => setMenu(index)}
                  onMouseLeave={() => resetMenu(false)}
                >
                  {item.columns && (
                    <HeaderColumns>
                      {item.columns?.map((column, columnIndex) => (
                        <HeaderColumn key={"col-" + index + "-" + columnIndex}>
                          {column.sections.map((section, sectionIndex) => (
                            <HeaderSection
                              key={"col-section-" + index + "-" + columnIndex + "-" + sectionIndex}
                              {...section}
                              sectionIndex={sectionIndex}
                            />
                          ))}
                        </HeaderColumn>
                      ))}
                    </HeaderColumns>
                  )}
                  {item.component}
                </HeaderPanel>
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

      {items &&
        transition((styles, item) => item && <HeaderMobile styles={styles} topBurgerMenuContent={topBurgerMenuContent} items={items} />)}
    </header>
  );
}

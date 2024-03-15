"use client";

import { Icon } from "@clubmed/trident-ui/atoms/Icon";
import { Button, CommonButtonProps } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { HamburgerIcon } from "@clubmed/trident-ui/molecules/HamburgerIcon";
import classnames from "classnames";
import { type PropsWithChildren, type ReactNode, useMemo } from "react";

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
}

export function Header({ children, homepageUrl, items, openMenu, topBurgerMenuContent }: PropsWithChildren<HeaderProps>) {
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
    <header role="banner">
      <div className="z-2 relative flex items-center justify-between p-8 ps-20 lg:px-20">
        <a href={homepageUrl} title="Club Med Homepage">
          <div className="w-[120px] md:w-[160px]">
            <Icon name="ClubMed" width="100%" className="text-ultramarine" />
          </div>
        </a>
        <nav className="flex items-center gap-x-12 px-8">
          {items
            ?.filter(({ position }) => {
              return position !== "right";
            })
            .map((item) => {
              const index: number = item.index as number;
              return (
                <HeaderPanel
                  key={item.url}
                  url={item.url}
                  label={item.label}
                  isActive={!!(item.index === activeIndex && (item.columns || item.component))}
                  onBlur={() => resetMenu(true)}
                  onFocus={() => setMenu(index, true)}
                  onMouseEnter={() => setMenu(index)}
                  onMouseLeave={() => resetMenu(false)}
                >
                  {item.columns && (
                    <HeaderColumns>
                      {item.columns?.map((column, columnIndex) => (
                        <HeaderColumn key={columnIndex}>
                          {column.sections.map((section, sectionIndex) => (
                            <HeaderSection key={section.title} {...section} sectionIndex={sectionIndex} />
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

              return (
                <HeaderPanel
                  key={item.url}
                  url={item.url}
                  label={item.label}
                  isActive={!!(item.index === activeIndex && (item.columns || item.component))}
                  onBlur={() => resetMenu(true)}
                  onFocus={() => setMenu(index, true)}
                  onMouseEnter={() => setMenu(index)}
                  onMouseLeave={() => resetMenu(false)}
                >
                  {item.columns && (
                    <HeaderColumns>
                      {item.columns?.map((column, columnIndex) => (
                        <HeaderColumn key={columnIndex}>
                          {column.sections.map((section, sectionIndex) => (
                            <HeaderSection key={section.title} {...section} sectionIndex={sectionIndex} />
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

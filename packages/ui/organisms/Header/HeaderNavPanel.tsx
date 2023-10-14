import classnames from "classnames";
import classNames from "classnames";
import {ButtonAnchor} from "../../molecules/Buttons/ButtonAnchor";
import React, {Fragment, PropsWithChildren} from "react";
import {Button, CommonButtonProps} from "../../molecules/Buttons";

export interface HeaderNavSectionProps {
  title: string;
  url: string;
  links: { label: string; url: string }[];
}

export interface HeaderNavColumnProps {
  sections: HeaderNavSectionProps[];
}

export interface HeaderNavItemProps extends CommonButtonProps, Record<string, unknown> {
  label: string;
  url?: string;
  position?: string;
  columns?: HeaderNavColumnProps[];
  component?: React.ReactNode;
}

export function HeaderNavTab({index, activeIndex, setMenu, resetMenu, item}: {
  index: number,
  activeIndex: number,
  setMenu: (index: number, focused?: boolean) => void,
  resetMenu: (bool: boolean) => void,
  item: HeaderNavItemProps
}) {

  const Btn = item.url ? ButtonAnchor : Button;

  return <Fragment>
    <div
      onClick={() => {
        if (!item.url) {
          setMenu(index);
        }
      }}
      onMouseEnter={() => {
        setMenu(index);
      }}
      onMouseLeave={() => {
        resetMenu(false);
      }}
    >
      <Btn
        {...item}
        variant={item.variant || "text"}
        theme={item.theme || "blackStroke"}
        onBlur={() => {
          resetMenu(true);
        }}
        onFocus={() => {
          setMenu(index, true);
        }}
        className={item.className || "hidden border-0 md:inline-block"}
        href={item.url}
      />

      {
        item?.columns?.length && item?.columns?.length > 0
          ? (<HeaderNavPanel index={index} activeIndex={activeIndex}>
            <HeaderNavColumns item={item}/>
          </HeaderNavPanel>)
          : item?.component
            ? <HeaderNavPanel index={index} activeIndex={activeIndex}>
              {item.component}
            </HeaderNavPanel>
            : null
      }
    </div>
  </Fragment>;
}

export function HeaderNavSection({title, url, sectionIndex, links}: HeaderNavSectionProps & { sectionIndex: number }) {
  return <div
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
  </div>;
}

export function HeaderNavColumn({children, className}: PropsWithChildren<{className?: string}>) {
  return (
    <div
      className={classNames("text-b3 break-inside-avoid-column", className)}
      role="menuitem"
    >
      {children}
    </div>
  );
}

export function HeaderNavColumns({item}: { item: HeaderNavItemProps }) {
  return <>
    {item.columns?.map((column, columnIndex) =>
      <HeaderNavColumn key={columnIndex}>
        {
          column.sections.map((section, sectionIndex) =>
            <HeaderNavSection key={section.title} {...{
              ...section,
              sectionIndex
            }}/>)
        }
      </HeaderNavColumn>)}
  </>;
}

export function HeaderNavPanel({index, activeIndex, children}: PropsWithChildren<{
  index: number,
  activeIndex: number
}>) {
  return <div
    className={classnames(
      "absolute inset-x-0 top-full flex columns-5 justify-center gap-x-40 bg-white px-20 py-40",
      {
        hidden: index !== activeIndex
      }
    )}
    role="menu"
    aria-label="desktop-menuItem"
  >
    {children}
  </div>;
}

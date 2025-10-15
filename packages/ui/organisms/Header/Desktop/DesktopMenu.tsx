"use client";

import { ButtonContent } from "@clubmed/trident-ui/molecules/Buttons/ButtonContent";
import { useButton } from "@clubmed/trident-ui/molecules/Buttons/v2/Button";
import { getButtonClasses } from "@clubmed/trident-ui/molecules/Buttons/v2/Button.type";
import classnames from "classnames";
import {
  Children,
  type ComponentPropsWithoutRef,
  type FunctionComponent,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState
} from "react";

import type { NavItem } from "../types/NavItem";

export const HOVER_ENTRY_DURATION = 300;
export const HOVER_EXIT_DURATION = 500;

type SetMenu = (index: number) => void;
type ResetMenu = () => void;

interface Props extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
  children: (props: { activeItem: number; resetMenu: ResetMenu; setMenu: SetMenu }) => ReactNode;
}

export const DesktopMenu: FunctionComponent<Props> = ({ children, className, ...attrs }) => {
  const hoverInTimeout = useRef<ReturnType<typeof setTimeout>>(0 as any);
  const hoverOutTimeout = useRef<ReturnType<typeof setTimeout>>(0 as any);

  const [activeItem, setActiveItem] = useState(-1);

  useEffect(() => {
    return () => {
      clearTimeout(hoverOutTimeout.current);
      clearTimeout(hoverInTimeout.current);
    };
  }, []);

  const setMenu: SetMenu = (index) => {
    clearTimeout(hoverOutTimeout.current);
    hoverInTimeout.current = setTimeout(() => {
      setActiveItem(index);
    }, HOVER_ENTRY_DURATION);
  };

  const resetMenu: ResetMenu = () => {
    clearTimeout(hoverInTimeout.current);
    hoverOutTimeout.current = setTimeout(() => {
      setActiveItem(-1);
    }, HOVER_EXIT_DURATION);
  };

  return (
    <nav {...attrs} className={classnames("hidden items-center gap-x-12 px-8 lg:flex", className)} role="navigation">
      {children({ activeItem, setMenu, resetMenu })}
    </nav>
  );
};

const ButtonAnchor: FunctionComponent<any> = ({
  className,
  children,
  color = "saffron",
  icon,
  iconWidth,
  size = "medium",
  theme = "solid",
  variant = "pill",
  component: Link,
  ...props
}) => {
  const { attrs } = useButton(props);

  return (
    <Link {...attrs} className={classnames(getButtonClasses({ color, size, theme, variant }), className)}>
      <ButtonContent icon={icon} iconWidth={iconWidth}>
        {children}
      </ButtonContent>
    </Link>
  );
};

interface DesktopMenuItemProps {
  activeItem: number;
  index: number;
  Link?: any;
  item: NavItem;
  onClick?: () => void;
  resetMenu: ResetMenu;
  setMenu: SetMenu;
}

export const DesktopMenuItem: FunctionComponent<PropsWithChildren<DesktopMenuItemProps>> = ({
  activeItem,
  children,
  index,
  item,
  onClick,
  resetMenu,
  Link = "a",
  setMenu
}) => {
  const btnId = useId();
  const menuId = useId();
  const hasChildren = Children.count(children) > 0;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onMouseEnter={() => {
        setMenu(index);
      }}
      onMouseLeave={() => {
        resetMenu();
      }}
    >
      <ButtonAnchor
        component={Link}
        aria-controls={hasChildren ? menuId : undefined}
        aria-haspopup={hasChildren}
        className={classnames("!border-0", {
          "cursor-pointer": Boolean(item.url),
          "cursor-default": !item.url
        })}
        color="black"
        href={item.url === "" ? "#" : item.url || "#"}
        rel={item.external ? "external" : undefined}
        target={item.external ? "_blank" : undefined}
        id={btnId}
        onClick={onClick}
        theme="outline"
      >
        {item.label}
      </ButtonAnchor>
      {hasChildren && (
        <div
          className={classnames("absolute inset-x-0 top-full bg-white px-20 py-40", {
            hidden: index !== activeItem
          })}
        >
          <div aria-labelledby={btnId} className="mb-24 flex columns-5 justify-center gap-x-40" id={menuId} role="menu">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const DesktopMenuItemColumn: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className="break-inside-avoid-column space-y-32 text-b3">{children}</div>;
};

type DesktopMenuSectionProps = NavItem["columns"][number]["sections"][number] & {
  Link?: any;
  onClick?: () => void;
};

export const DesktopMenuSection: FunctionComponent<PropsWithChildren<DesktopMenuSectionProps>> = ({
  children,
  onClick,
  label,
  url,
  external,
  Link = "a"
}) => {
  const hasLinks = Children.count(children) > 0;

  return (
    <div role="group">
      {label && (
        <Link
          className="block font-bold"
          href={url || undefined}
          onClick={onClick}
          role="menuitem"
          rel={external ? "external" : undefined}
          target={external ? "_blank" : undefined}
        >
          {label}
        </Link>
      )}
      {hasLinks && (
        <ul className="mt-20 space-y-8" role="group">
          {children}
        </ul>
      )}
    </div>
  );
};

interface DesktopMenuLinkProps {
  link: DesktopMenuSectionProps["links"][number];
  onClick?: () => void;
  Link?: any;
}

export const DesktopMenuLink: FunctionComponent<DesktopMenuLinkProps> = ({ link, onClick, Link = "a" }) => {
  return (
    <li role="presentation">
      <Link
        href={link.url || undefined}
        onClick={onClick}
        rel={link.external ? "external" : undefined}
        target={link.external ? "_blank" : undefined}
        role="menuitem"
      >
        {link.label}
      </Link>
    </li>
  );
};

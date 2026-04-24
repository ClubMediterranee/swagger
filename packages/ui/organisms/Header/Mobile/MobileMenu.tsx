"use client";

import { Icon } from "@clubmed/trident-icons";
import { useDevice } from "@clubmed/trident-ui/contexts/Devices/Device";
import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { ElasticHeight } from "@clubmed/trident-ui/molecules/ElasticHeight";
import { HamburgerIcon } from "@clubmed/trident-ui/molecules/HamburgerIcon";
import classnames from "classnames";
import { type FunctionComponent, type PropsWithChildren, type ReactNode, useEffect, useId, useRef, useState } from "react";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { useScrollLock } from "../../../hooks/useScrollLock";
import type { NavItem } from "../types/NavItem";

interface Props {
  children: (isOpen: boolean) => ReactNode;
  onOpenMenu?: () => void;
  openMenu: string;
}

export const MobileMenu: FunctionComponent<Props> = ({ children, onOpenMenu, openMenu }) => {
  const wrappedRef = useRef<HTMLDivElement>(null);
  const { lock, unlock } = useScrollLock({ autoLock: false });
  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = useDevice("medium");

  const handleBlur = () => setIsOpen(false);

  useOnClickOutside(wrappedRef, handleBlur);

  useEffect(() => {
    if (isOpen) {
      lock();
    } else {
      unlock();
    }

    return () => {
      unlock();
    };
  }, [isOpen, lock, unlock]);

  useEffect(() => {
    setIsOpen(false);
  }, [isDesktop]);

  return (
    <div ref={wrappedRef}>
      <Button
        aria-label={openMenu}
        className={classnames("lg:hidden", { "border-0": isOpen })}
        color="black"
        onClick={() => {
          setIsOpen(!isOpen);
          onOpenMenu?.();
        }}
        theme="outline"
        variant="circle"
      >
        <HamburgerIcon isActive={isOpen} />
      </Button>
      {children(isOpen)}
    </div>
  );
};

interface MobileMenuItemsProps {
  isOpen?: boolean;
}

export const MobileMenuItems: FunctionComponent<PropsWithChildren<MobileMenuItemsProps>> = ({ children, isOpen }) => {
  return (
    <div
      aria-label="Mobile menu"
      className={classnames(
        "fixed inset-x-0 bottom-0 top-[--main-mobile-top-offset] z-1 overflow-y-auto bg-white transition-transform/opacity duration-500 transition-discrete",
        { "-translate-x-full opacity-0": !isOpen, "opacity-100": isOpen }
      )}
      role="menu"
    >
      {isOpen ? children : null}
    </div>
  );
};

interface MobileMenuItemProps {
  item: NavItem;
  onClick?: () => void;
}

export const MobileMenuItem: FunctionComponent<PropsWithChildren<MobileMenuItemProps>> = ({ item, children, onClick }) => {
  return (
    <MobileMenuCollapse
      className="border-b border-pearl p-20 text-b2 font-bold"
      header={item.label}
      key={item.url}
      label={item.label}
      onClick={onClick}
    >
      {children}
    </MobileMenuCollapse>
  );
};

interface MobileMenuSectionProps {
  section: NavItem["columns"][number]["sections"][number];
  onClick?: () => void;
}

export const MobileMenuSection: FunctionComponent<PropsWithChildren<MobileMenuSectionProps>> = ({ children, onClick, section }) => {
  return (
    <div className="border-b border-pearl px-20" key={section.label} role="group">
      <MobileMenuCollapse className="py-20 text-b3 font-bold" header={section.label} label={section.label} onClick={onClick}>
        <ul className="space-y-8 pb-20 text-b3" role="group">
          {children}
        </ul>
      </MobileMenuCollapse>
    </div>
  );
};

interface MobileMenuLinkProps {
  Link?: any;
  link: MobileMenuSectionProps["section"]["links"][number];
  onClick?: () => void;
}

export const MobileMenuLink: FunctionComponent<MobileMenuLinkProps> = ({ link, onClick, Link = "a" }) => {
  return (
    <li key={link.label} role="presentation">
      <Link href={link.url || undefined} onClick={onClick} role="menuitem">
        {link.label}
      </Link>
    </li>
  );
};

interface MobileMenuCollapseProps {
  className?: string;
  header: ReactNode;
  label?: string;
  onClick?: () => void;
}

const MobileMenuCollapse: FunctionComponent<PropsWithChildren<MobileMenuCollapseProps>> = ({ children, className, header, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const id = useId();

  return (
    <>
      <button
        aria-controls={id}
        aria-expanded={isOpen}
        className={classnames("flex w-full items-center justify-between text-start", className)}
        onClick={() => {
          setIsOpen(!isOpen);
          onClick?.();
        }}
        type="button"
      >
        {header}
        <Icon className="lg:hidden" name="ArrowDefaultDown" rotation={isOpen ? -180 : 0} svgClassName="transition-all" width="30px" />
      </button>
      <ElasticHeight id={id} isExpanded={isOpen} role="presentation">
        {children}
      </ElasticHeight>
    </>
  );
};

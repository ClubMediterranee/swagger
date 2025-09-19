import { MobileMenu, MobileMenuItem, MobileMenuItems, MobileMenuLink, MobileMenuSection } from "../Header/Mobile/MobileMenu.js";
import type { NavItem } from "../Header/types/NavItem.js";

export function MobileMenuContainer({ items }: { items?: NavItem[] }) {
  return (
    <MobileMenu openMenu="open menu">
      {(isOpen) => (
        <MobileMenuItems isOpen={isOpen}>
          {/*{withLocales && (*/}
          {/*  <Locales className="mx-8 flex items-center justify-end gap-4 border-b border-pearl px-20 py-20 font-sans text-b3 font-semibold" />*/}
          {/*)}*/}
          {items?.map((item) => (
            <MobileMenuItem key={item.url} item={item}>
              {item.columns.map((column) => {
                return column.sections.map((section) => (
                  <MobileMenuSection key={section.label} section={section}>
                    {section.links.map((link) => (
                      <MobileMenuLink key={link.label} link={link} />
                    ))}
                  </MobileMenuSection>
                ));
              })}
            </MobileMenuItem>
          ))}
        </MobileMenuItems>
      )}
    </MobileMenu>
  );
}

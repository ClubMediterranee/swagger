import { DesktopMenu, DesktopMenuItem, DesktopMenuItemColumn, DesktopMenuLink, DesktopMenuSection } from "../Header/Desktop/DesktopMenu.js";
import type { NavItem } from "../Header/types/NavItem.js";

export function DesktopMenuContainer({ items }: { items?: NavItem[] }) {
  return (
    <DesktopMenu>
      {({ activeItem, resetMenu, setMenu }) => {
        return items?.map((item, index) => (
          <DesktopMenuItem key={item.url} index={index} item={item} activeItem={activeItem} setMenu={setMenu} resetMenu={resetMenu}>
            {item.columns.map((column, columnIndex) => {
              return (
                <DesktopMenuItemColumn key={columnIndex}>
                  {column.sections.map(({ links, label, url }) => {
                    return (
                      <DesktopMenuSection key={label} label={label} url={url} links={links}>
                        {links.map((link) => {
                          return <DesktopMenuLink key={link.label} link={link} />;
                        })}
                      </DesktopMenuSection>
                    );
                  })}
                </DesktopMenuItemColumn>
              );
            })}
          </DesktopMenuItem>
        ));
      }}
    </DesktopMenu>
  );
}

import { DesktopMenu, DesktopMenuItem, DesktopMenuItemColumn, DesktopMenuLink, DesktopMenuSection } from "../Header/Desktop/DesktopMenu.js";
import type { NavItem } from "../Header/types/NavItem.js";

export function DesktopMenuContainer({ items, Link }: { items?: NavItem[]; Link?: any }) {
  return (
    <DesktopMenu>
      {({ activeItem, resetMenu, setMenu }) => {
        return items?.map((item, index) => (
          <DesktopMenuItem
            Link={Link}
            key={item.url}
            index={index}
            item={item}
            activeItem={activeItem}
            setMenu={setMenu}
            resetMenu={resetMenu}
          >
            {item.columns.map((column, columnIndex) => {
              return (
                <DesktopMenuItemColumn key={columnIndex}>
                  {column.sections.map(({ links, label, url }) => {
                    return (
                      <DesktopMenuSection key={label} label={label} url={url} links={links} Link={Link}>
                        {links.map((link) => {
                          return <DesktopMenuLink Link={Link} key={link.label} link={link} />;
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

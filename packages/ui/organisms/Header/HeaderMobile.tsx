import { animated } from "@react-spring/web";

import type { HeaderNavItemProps } from "./Header";
import { HeaderMobileCollapse } from "./HeaderMobileCollapse";

export function HeaderMobile({
  styles,
  topBurgerMenuContent,
  items
}: {
  styles: any;
  topBurgerMenuContent: any;
  items: HeaderNavItemProps[];
}) {
  return (
    <animated.div
      role="menu"
      aria-label="mobile-menu"
      className="z-2 fixed inset-x-0 bottom-0 top-[calc(var(--mobile-menu-offset,0px)+64px)] overflow-y-auto bg-white md:hidden"
      style={styles}
    >
      {topBurgerMenuContent}
      {items?.map((item) => {
        return (
          <HeaderMobileCollapse
            key={item.url}
            label={item.label}
            header={<span className="text-b2 font-bold">{item.label}</span>}
            className="border-pearl border-b p-20"
          >
            {item.columns?.map((column, columnIndex) => {
              return column.sections.map((section, sectionIndex) => {
                return (
                  <div key={"mob-col-section-" + "-" + columnIndex + "-" + sectionIndex} className="px-20">
                    <div className="border-pearl border-b">
                      <HeaderMobileCollapse label={section.title} header={<span className="text-b3 py-20 font-bold">{section.title}</span>}>
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
                      </HeaderMobileCollapse>
                    </div>
                  </div>
                );
              });
            })}
          </HeaderMobileCollapse>
        );
      })}
    </animated.div>
  );
}

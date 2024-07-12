import "../styles/toc.css";

import type { TocEntry } from "@stefanprobst/rehype-extract-toc";
import cx from "classnames";

export function Toc({ items, className }: { items: TocEntry[]; className?: string }) {
  return (
    <aside className={cx("toc sticky top-[50px] bottom-0 w-[250px]", className)}>
      <ul>
        {items
          .filter((item) => Number(item.depth) <= 3)
          .map((item, index) => (
            <li key={index} className={"-level-" + item.depth}>
              <a href={`#${item.id}`}>{item.value}</a>
            </li>
          ))}
      </ul>
    </aside>
  );
}

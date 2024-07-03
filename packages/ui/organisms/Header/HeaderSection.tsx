import classnames from "classnames";
import { AnchorHTMLAttributes, FunctionComponent, PropsWithChildren } from "react";

import { Link as BaseLink } from "../../molecules/Link/Link";

export interface HeaderSectionProps {
  Link?: FunctionComponent<PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>>;
  title: string;
  url: string;
  links: { label: string; url: string }[];
}

export function HeaderSection({
  Link = BaseLink,
  title,
  url,
  sectionIndex,
  links
}: HeaderSectionProps & {
  sectionIndex: number;
}) {
  return (
    <div
      key={title}
      className={classnames({
        "mt-32": sectionIndex !== 0 && links.length,
        "mb-12": !links.length
      })}
    >
      {title && (
        <Link
          href={url || undefined}
          className={classnames("block font-bold", {
            "pb-20": links.length
          })}
        >
          {title}
        </Link>
      )}
      <ul className="space-y-8">
        {links.map(({ label, url, ...link }) => {
          return (
            <li key={label}>
              <Link href={url || undefined} {...link} className="">
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import classnames from "classnames";

export interface HeaderSectionProps {
  title: string;
  url: string;
  links: { label: string; url: string }[];
}

export function HeaderSection({ title, url, sectionIndex, links }: HeaderSectionProps & { sectionIndex: number }) {
  return (
    <div
      key={title}
      className={classnames({
        "mt-32": sectionIndex !== 0 && links.length,
        "mb-12": !links.length
      })}
    >
      {title && (
        <a
          href={url || undefined}
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
              <a href={link.url || undefined} className="">
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

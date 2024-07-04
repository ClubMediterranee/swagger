import cx from "classnames";

import { parser } from "./remarkable";

export const Markdown = ({ source, className = "" }: { source: any; className: any }) => {
  if (typeof source !== "string") {
    return null;
  }

  if (source) {
    const html = parser.render(source);

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: html.trim()
        }}
        className={cx(className, "renderedMarkdown")}
      />
    );
  }
  return null;
};

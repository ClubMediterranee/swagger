import cx from "classnames";

import { useMarkdown } from "../../hooks/use-markdown.hook";

export const Markdown = ({ source, className = "" }: { source: any; className: any }) => {
  const { content } = useMarkdown({ source });

  if (typeof source !== "string" || !source || !content) {
    return null;
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content
      }}
      className={cx(className, "renderedMarkdown")}
    />
  );
};

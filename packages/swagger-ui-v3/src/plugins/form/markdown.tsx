import cx from "classnames";
import { Remarkable } from "remarkable";

import { System } from "../../interfaces/System";

const parser = new Remarkable("commonmark");
parser.block.ruler.enable(["table"]);
parser.set({ linkTarget: "_blank" });

export const Markdown = ({ source, className = "" }: System & { source: any; className: any }) => {
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

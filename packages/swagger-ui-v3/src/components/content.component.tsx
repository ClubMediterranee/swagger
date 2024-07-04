import "../styles/markdown.css";

import classnames from "classnames";
import React, { useMemo } from "react";

import { parser } from "../utils/remarkable";

export interface ContentProps {
  className?: string;
  html?: string;
  markdown?: string;
}

export function Content({ html, markdown, className }: ContentProps) {
  const content = useMemo<string>(() => {
    return html || parser.render(markdown || "");
  }, [html, markdown]);

  return <div className={classnames("markdown-body", className)} dangerouslySetInnerHTML={{ __html: content }} />;
}

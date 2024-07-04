import "../styles/markdown.css";

import { parser } from "@clubmed/swagger-ui-plugins/plugins/form/remarkable";
import classnames from "classnames";
import React, { useMemo } from "react";

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

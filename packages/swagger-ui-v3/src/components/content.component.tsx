import "../styles/markdown.css";

import { useMarkdown } from "@clubmed/swagger-ui-plugins/hooks/use-markdown.hook";
import classnames from "classnames";
import React, { useMemo } from "react";

export interface ContentProps {
  className?: string;
  html?: string;
  markdown?: string;
}

export function Content({ html, markdown, className }: ContentProps) {
  const md = useMarkdown({ source: markdown });

  const content = useMemo<string>(() => {
    return html || md.content || "";
  }, [html, md]);

  return <div className={classnames("markdown-body", className)} dangerouslySetInnerHTML={{ __html: content }} />;
}

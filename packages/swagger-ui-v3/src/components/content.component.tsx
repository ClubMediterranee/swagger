import "../styles/markdown.css";

export function Content({ html, markdown }: { html?: string; markdown?: string }) {
  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html || markdown || "" }} />;
}

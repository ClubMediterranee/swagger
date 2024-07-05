import { useMarkdown } from "@clubmed/swagger-ui-plugins/plugins/form/use-markdown.hook";
import { PropsWithChildren } from "react";

import { Container } from "./container.component";
import { Content } from "./content.component";
import { HeroBanner } from "./hero-banner.component";
import { Toc } from "./toc.component";

export function Page({
  className,
  classContainer = "wrapper",
  attributes,
  toc,
  markdown,
  html,
  children
}: PropsWithChildren<{
  className?: string;
  classContainer?: string;
  html?: string;
  toc?: { level: string; content: string }[];
  attributes: Record<string, unknown>;
  markdown: string;
}>) {
  const md = useMarkdown({ source: attributes.banner as string });

  return (
    <div className={className}>
      <Container className="mb-20">
        <HeroBanner
          className={classContainer}
          srcSet="https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=300&amp;height=300&amp;quality=70 300w, https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=600&amp;height=600&amp;quality=70 600w, https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=900&amp;height=900&amp;quality=85 900w"
          sizes="(min-width: 1220px) calc(50vw - 160px), (min-width: 1024px) calc(50vw - 120px), (min-width: 640px) calc(50vw - 20px), 100vw"
          src="https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=900&amp;height=900&amp;quality=70"
          alt=""
        >
          <h1 className="title">{attributes.title as string}</h1>
          {md.content && <div dangerouslySetInnerHTML={{ __html: md.content?.replace(/\\n/gi, "<br />") }} />}
        </HeroBanner>
      </Container>
      <div className={classContainer}>
        <div className={"flex page"}>
          <div className={"flex-1"}>
            <div className={"mb-40"}>
              <Content html={html} markdown={markdown} />
            </div>

            {children}
          </div>
          <div>{toc && <Toc items={toc} />}</div>
        </div>
      </div>
    </div>
  );
}

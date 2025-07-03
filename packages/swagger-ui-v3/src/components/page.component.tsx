import { useMarkdown } from "@clubmed/swagger-ui-plugins/hooks/use-markdown.hook";
import { Breadcrumb } from "@clubmed/trident-ui/molecules/Breadcrumb";
import type { TocEntry } from "@stefanprobst/rehype-extract-toc";
import cx from "classnames";
import pick from "lodash/pick";
import moment from "moment/moment";
import { PropsWithChildren } from "react";

import { Container } from "./container.component";
import { Content } from "./content.component";
import { HeroBanner } from "./hero-banner.component";
import { Toc } from "./toc.component";

const defaultAttributes = {
  srcSet:
    "https://media.api.clubmed/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=300&amp;height=300&amp;quality=70 300w, https://media.api.clubmed/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=600&amp;height=600&amp;quality=70 600w, https://media.api.clubmed/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=900&amp;height=900&amp;quality=85 900w",
  sizes: "(min-width: 1220px) calc(50vw - 160px), (min-width: 1024px) calc(50vw - 120px), (min-width: 640px) calc(50vw - 20px), 100vw",
  src: "https://media.api.clubmed/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=900&amp;height=900&amp;quality=70",
  alt: ""
};

export function Page({
  className,
  classContainer = "wrapper",
  attributes,
  toc,
  markdown,
  html,
  children,
  breadcrumb,
  ...props
}: PropsWithChildren<{
  className?: string;
  classContainer?: string;
  html?: string;
  toc?: TocEntry[];
  attributes: Record<string, unknown>;
  markdown?: string;
  breadcrumb?: {
    label: string;
    href: string;
  }[];
}>) {
  const md = useMarkdown({ source: attributes.banner as string });

  return (
    <div className={className}>
      <Container className="mb-20">
        <HeroBanner
          {...{
            ...defaultAttributes,
            ...pick(props, ["srcSet", "sizes", "src", "alt"])
          }}
          className={classContainer}
        >
          <h1 className="title">{attributes.title as string}</h1>
          {md.content && <div dangerouslySetInnerHTML={{ __html: md.content?.replace(/\\n/gi, "<br />") }} />}

          {attributes.publishedAt ? <p className={"text-b5"}>Published {moment(attributes.publishedAt).fromNow() as string}</p> : null}
        </HeroBanner>
      </Container>
      <div className={classContainer}>
        <div className={"flex page"}>
          <div
            className={cx("flex-1", {
              "max-w-full": !toc,
              "max-w-full xl:max-w-[910px]": toc
            })}
          >
            {breadcrumb ? (
              <div className={"mb-32"}>
                <Breadcrumb items={breadcrumb} />
              </div>
            ) : null}

            <div className={"mb-40"}>
              <Content html={html} markdown={markdown} />
            </div>

            {children}
          </div>
          <div>{toc && <Toc items={toc} className={"hidden xl:block"} />}</div>
        </div>
      </div>
    </div>
  );
}

import { Remarkable } from "remarkable";

import { Container } from "./container.component";
import { Content } from "./content.component";
import { HeroBanner } from "./hero-banner.component";

const parser = new Remarkable("commonmark");
parser.block.ruler.enable(["table"]);
parser.set({ linkTarget: "_blank" });

export function Page({ attributes, html }: { attributes: Record<string, unknown>; html: string }) {
  const bannerHtml = parser.render(attributes.banner as string);

  return (
    <>
      <Container>
        <HeroBanner
          srcSet="https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=300&amp;height=300&amp;quality=70 300w, https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=600&amp;height=600&amp;quality=70 600w, https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=900&amp;height=900&amp;quality=85 900w"
          sizes="(min-width: 1220px) calc(50vw - 160px), (min-width: 1024px) calc(50vw - 120px), (min-width: 640px) calc(50vw - 20px), 100vw"
          src="https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=900&amp;height=900&amp;quality=70"
          alt=""
        >
          <h1 className="title">{attributes.title as string}</h1>
          <div dangerouslySetInnerHTML={{ __html: bannerHtml.replace(/\\n/gi, "<br />") }} />
        </HeroBanner>
      </Container>
      <div className="wrapper">
        <Content html={html} />
      </div>
    </>
  );
}

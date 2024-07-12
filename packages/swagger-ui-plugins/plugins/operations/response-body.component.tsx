import { FunctionComponent } from "react";

import { NoHighlight } from "../form/nohightlight.component";

export function wrapResponseBody(Base: FunctionComponent<Record<string, unknown>>) {
  return (props: { contentType: string; content: unknown }) => {
    let { content, contentType } = props;

    if (/json/i.test(contentType)) {
      const textEncoder = new TextEncoder();
      if (textEncoder.encode(content as string).length > 1024 * 1024) {
        let body: string;

        try {
          body = JSON.stringify(JSON.parse(content as string), null, "  ");
        } catch (error) {
          body = "can't parse JSON.  Raw result:\n\n" + content;
        }

        const downloadName = "response_" + new Date().getTime();

        return (
          <div>
            <h5>Response body</h5>
            <NoHighlight {...props} downloadable fileName={`${downloadName}.json`} canCopy value={body} />
          </div>
        );
      }
    }

    return <Base {...props} />;
  };
}

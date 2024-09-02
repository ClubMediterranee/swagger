import { OrderedMap } from "immutable";
import { FunctionComponent } from "react";

import type { System } from "../../interfaces/System";

export function wrapRequestBody(Base: FunctionComponent<Record<string, unknown>>) {
  return (props: System & { requestBody?: any; contentType: any; specPath: any }) => {
    const { getComponent, requestBody, specPath } = props;
    const ModelExample = getComponent("modelExample");
    const requestBodyContent = requestBody?.get("content") ?? OrderedMap();
    const contentType = props.contentType || requestBodyContent.keySeq().first() || "";
    const mediaTypeValue = requestBodyContent.get(contentType) ?? OrderedMap();

    return (
      <ModelExample
        {...props}
        expandDepth={1}
        isExecute={true}
        schema={mediaTypeValue.get("schema")}
        specPath={specPath.push("content", contentType)}
        example={<Base {...props} />}
        includeWriteOnly={true}
      />
    );
  };
}

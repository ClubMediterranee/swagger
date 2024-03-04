import React, {Suspense} from "react";
import {JsonEditorField} from "@clubmed/ui/molecules/Forms/JsonEditorField";

let uid = 0;

export function TextareaComponent(props: any) {
  return <Suspense fallback={<div className={"text-sm color-blue"}>Loading...</div>}>
    <JsonEditorField name={`json-editor-${uid++}`} {...props} stytle/>
  </Suspense>;
}

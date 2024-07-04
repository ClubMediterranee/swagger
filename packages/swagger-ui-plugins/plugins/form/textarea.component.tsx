import { JsonEditorField } from "@clubmed/ui/molecules/Forms/JsonEditorField";
import React, { Suspense } from "react";

import type { System } from "../../interfaces/System";

let uid = 0;

export function TextareaComponent(props: System & { onChange: (value: unknown) => void } & Record<string, unknown>) {
  return (
    <Suspense fallback={<div className={"text-sm color-blue"}>Loading...</div>}>
      <JsonEditorField
        name={`json-editor-${uid++}`}
        {...props}
        onChange={(_, value) => {
          props.onChange({ target: { value } });
        }}
      />
    </Suspense>
  );
}

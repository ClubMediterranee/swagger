import React, {Suspense} from "react";
import JsonEditorComponent from "./json-editor.component";


let uid = 0;
export function TextareaComponent (props: any)  {
  return <Suspense fallback={<div className={'text-sm color-blue'}>Loading...</div>}>
      <JsonEditorComponent name={`json-editor-${uid++}`} {...props} stytle/>
  </Suspense>
}

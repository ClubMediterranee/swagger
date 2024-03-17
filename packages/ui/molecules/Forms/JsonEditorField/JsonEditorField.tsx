// eslint-disable-next-line
import ace from "brace";
import "brace/mode/json.js";
import "./json-editor.theme.js";
import "./JsonEditorField.css";

import { useValue, UseValueProps } from "@clubmed/trident-ui/hooks/useValue";
import { JsonEditor } from "jsoneditor-react18";

const JSE: any = JsonEditor;
function parse(value: any) {
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch (er) {}
  return {};
}

export interface JsonEditorComponentProps extends UseValueProps<string>, Record<string, any> {}

export function JsonEditorField(props: JsonEditorComponentProps) {
  const { value, setValue } = useValue<string>({
    ...props,
    initialValue: props.value,
    defaultValue: "{}"
  });

  return (
    <JSE
      {...props}
      name={props.name}
      value={parse(value)}
      mode={"code"}
      ace={ace}
      theme={"ace/theme/monokai"}
      search={false}
      htmlElementProps={{ style: { height: "40vh" } }}
      onChange={setValue}
      statusBar={false}
    />
  );
}

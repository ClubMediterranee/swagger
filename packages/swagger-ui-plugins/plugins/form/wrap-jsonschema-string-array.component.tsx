import { DebouncedArrayTextField } from "@clubmed/ui/molecules/Forms/TextField/DebouncedArrayTextField";
import { Map } from "immutable";
import omit from "lodash/omit";
import { FunctionComponent } from "react";

import { System } from "../../interfaces/System";

export function wrapJsonschemaStringArrayComponent(Base: FunctionComponent<any>, system: System) {
  return (
    props: System & {
      schema: Map<string, any>;
      value?: any;
      description: string;
      onChange: (value: string[]) => void;
    }
  ) => {
    let { schema, getComponent } = props;

    const schemaItemsEnum = schema.getIn(["items", "enum"]) || schema.get("enum");
    const schemaItemsType = schema.getIn(["items", "type"]);
    const schemaItemsFormat = schema.getIn(["items", "format"]);
    const Select = getComponent("Select");
    let isArrayItemFile = schemaItemsType === "file" || (schemaItemsType === "string" && schemaItemsFormat === "binary");
    const value = props.value && props.value?.toJS ? props.value.toJS() : props.value;

    if (schemaItemsEnum?.size) {
      return (
        <Select
          multiple={true}
          {...omit(props, ["value"])}
          value={value}
          allowedValues={schemaItemsEnum.toJS()}
          allowEmptyValue={false}
          onChange={(value: string[]) => {
            props.onChange(value);
          }}
        />
      );
    }

    if (isArrayItemFile) {
      return <Base {...props} />;
    }

    return (
      <DebouncedArrayTextField<string[]>
        className={"max-w-[340px]"}
        name={props.description}
        value={value}
        debounceTimeout={300}
        onChange={(_, value) => {
          props.onChange(value);
        }}
      />
    );
  };
}

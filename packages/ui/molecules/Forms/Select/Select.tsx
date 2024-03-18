import "./Select.css";

import { FormControl } from "@clubmed/trident-ui/molecules/Forms/FormControl";
import omit from "lodash/omit";

import { AllSelectProps, useChoice } from "./useChoice";

let uuid = 0;

export function Select(props: AllSelectProps) {
  const {
    className,
    name = "",
    id = `field-date-${++uuid}`,
    label,
    status = "default",
    icon = "",
    errorMessage,
    disabled = false,
    description = "",
    dataTestId = "SelectField",
    onChange: initialOnChange,
    ...rest
  } = props;

  const { ref } = useChoice(props);

  return (
    <FormControl dataTestId={dataTestId} dataName={"Select"} label={label} description={description}>
      <select {...omit(rest, ["options", "defaultValue", "value"])} disabled={disabled} ref={ref} name={name} id={id} />
    </FormControl>
  );
}

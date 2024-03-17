import "./Select.css";

import { FormControl } from "@clubmed/trident-ui/molecules/Forms/FormControl";
import classnames from "classnames";
import omit from "lodash/omit";

import { AllSelectProps, useSelect } from "./useSelect";

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

  const { ref } = useSelect(props);
  const internalStatus = disabled ? "disabled" : status;

  return (
    <FormControl dataTestId={dataTestId} dataName={"Select"} label={label} description={description}>
      <select {...omit(rest, ["options", "defaultValue", "value"])} disabled={disabled} ref={ref} name={name} id={id} />
      <div
        className={classnames(
          "pointer-events-none absolute inset-0 flex items-center justify-between px-20 py-12",
          disabled
            ? { "text-grey": true }
            : {
                "text-red": internalStatus === "error",
                "text-green": internalStatus === "success"
              }
        )}
      >
        {/*{icon && <Icon name={icon} width="24px"/>}*/}
        {/* <span className="ms-auto flex gap-x-8">*/}
        {/*   {internalStatus === "error" && <Icon name="CrossDefault" width="24px"/>}*/}
        {/*   {internalStatus === "success" && <Icon name="CheckDefault" width="24px"/>}*/}
        {/*   <button className="pointer-events-auto">*/}
        {/*     <Icon name="ArrowDefaultDown" width="24px" color="black"/>*/}
        {/*   </button>*/}
        {/*</span>*/}
      </div>
    </FormControl>
  );
}

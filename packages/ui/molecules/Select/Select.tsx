import classnames from "classnames";
import omit from "lodash/omit";
import {InputLabel} from "../InputLabel";
import {AllSelectProps, useSelect} from "./useSelect";

let uuid = 0;

export function Select(props: AllSelectProps) {
  const {
    className,
    value: initialValue,
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

  const {ref, choicesRef} = useSelect(props);
  const internalStatus = disabled ? "disabled" : status;

  return (
    <div className="space-y-4" data-name="Select" data-testid={dataTestId}>
      {label && <InputLabel label={label} description={description} id={id}/>}
      <div className="relative">
        <select
          {...omit(rest, ["options"])}
          ref={ref}
          name={name}
          id={id}
        />
        <div
          className={classnames(
            "pointer-events-none absolute inset-0 flex items-center justify-between px-20 py-12",
            disabled
              ? {"text-grey": true}
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
      </div>
    </div>
  );
}

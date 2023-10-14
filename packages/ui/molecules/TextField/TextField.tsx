import classnames from "classnames";

import {InputLabel} from "../InputLabel";

import {Icon, Iconics} from "../../atoms/Icon";
import {useValue} from "../../hooks/form/useValue";

export interface TextFieldProps<Value = string> extends Omit<React.HTMLAttributes<HTMLInputElement>, "onChange"> {
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Input value name
   */
  name?: string;
  /**
   * Input value
   */
  value?: Value;
  /**
   * Label text
   */
  label?: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Id of the input
   */
  id?: string;
  /**
   * Status of the input
   */
  status?: "error" | "success" | "default";
  /**
   * If the input has a dropdown
   */
  hasDropdown?: boolean;
  /**
   * Icon name
   */
  icon?: Iconics;
  /**
   * Error message
   */
  errorMessage?: string;
  /**
   * If the input is disabled
   */
  isDisabled?: boolean;
  /**
   * Data test id
   */
  dataTestId?: string;

  onChange?: (name: string, value: Value) => void;
}

let uuid = 0;

export function TextField<Value = string>(props: TextFieldProps<Value>) {
  const {
    className,
    value: initialValue,
    label,
    name = "",
    description,
    id = `field-date-${++uuid}`,
    status = "default",
    hasDropdown = false,
    icon = "CalendarDefault",
    errorMessage,
    isDisabled = false,
    dataTestId = "TextField",
    onChange: initialOnChange,
    ...rest
  } = props;
  const {
    value,
    setValue
  } = useValue({initialValue, name, onChange: initialOnChange});

  const internalStatus = isDisabled ? "disabled" : status;

  return (
    <div className="space-y-4" data-name="TextField" data-testid={dataTestId}>
      {label && <InputLabel label={label} description={description} id={id}/>}
      <div className="relative">
        <input
          {...rest}
          name={name}
          className={classnames(
            className,
            "text-b3 rounded-pill w-full border px-20 py-12 font-normal outline-none",
            {
              "border-lightGrey focus:border-black active:border-black":
                internalStatus === "default",
              "ps-[52px]": icon,
              "pe-[52px]":
                hasDropdown || internalStatus === "error" || internalStatus === "success",
              "pe-[84px]":
                hasDropdown && (internalStatus === "error" || internalStatus === "success")
            },
            isDisabled
              ? {"bg-pearl text-grey": true}
              : {
                "bg-white text-black": true,
                "border-red": internalStatus === "error",
                "border-green": internalStatus === "success"
              }
          )}
          id={id}
          value={value as any}
          onChange={(e) => setValue(e.target.value as Value)}
          disabled={isDisabled}
        />
        <div
          className={classnames(
            "pointer-events-none absolute inset-0 flex items-center justify-between px-20 py-12",
            isDisabled
              ? {"text-grey": true}
              : {
                "text-red": internalStatus === "error",
                "text-green": internalStatus === "success"
              }
          )}
        >
          {icon && <Icon name={icon} width="24px"/>}
          <span className="ms-auto flex gap-x-8">
            {internalStatus === "error" && <Icon name="CrossDefault" width="24px"/>}
            {internalStatus === "success" && <Icon name="CheckDefault" width="24px"/>}
            {hasDropdown && (
              <button className="pointer-events-auto">
                <Icon name="ArrowDefaultDown" width="24px" color="black"/>
              </button>
            )}
          </span>
        </div>
      </div>
      {internalStatus === "error" && errorMessage && (
        <span className="text-red text-b4 flex items-start gap-x-4 px-20">
          <Icon name="Error" width="20px"/>
          {errorMessage}
        </span>
      )}
    </div>
  );
}

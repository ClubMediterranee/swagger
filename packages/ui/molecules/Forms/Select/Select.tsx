import "./Select.css";

import type { IconicNames } from "@clubmed/trident-ui/atoms/Icons";
import { FormControl } from "@clubmed/trident-ui/molecules/Forms/FormControl";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

import { AllSelectProps, SelectOptionProps } from "./Select.interfaces";

const animatedComponents = makeAnimated();

let uuid = 0;

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLSelectElement>, "onChange"> {
  /**
   * name
   */
  name?: string;
  /**
   * label
   */
  label?: string;
  /**
   * Status of the input
   */
  status?: "error" | "success" | "default";
  /**
   * Icon name
   */
  icon?: IconicNames;
  /**
   * Error message
   */
  errorMessage?: string;
  description?: string;
  dataTestId?: string;
  options: SelectOptionProps[];
  placeholder?: string;
  disableSearch?: boolean;
  style?: any;
  disabled?: boolean;
  searchEnabled?: boolean;
}

export function Select(props: AllSelectProps) {
  const {
    className,
    name = "",
    id = `field-date-${++uuid}`,
    label,
    status = "default",
    errorMessage,
    disabled = false,
    description = "",
    dataTestId = "SelectField"
  } = props;

  return (
    <FormControl
      className={className}
      dataTestId={dataTestId}
      dataName={"Select"}
      label={label}
      description={description}
      validationStatus={status}
      errorMessage={errorMessage}
    >
      <ReactSelect<{ label: string; value: never | never[] }>
        id={id}
        className="react-select-container"
        classNamePrefix="react-select"
        name={description}
        components={animatedComponents}
        options={props.options as any}
        isDisabled={disabled}
        isSearchable={true}
        isMulti={props.multiple as never}
        value={props.options.find((t) => t.value === props.value) as any}
        onChange={(value) => {
          // @ts-ignore
          const v = (
            props.multiple
              ? []
                  .concat(value as never)
                  .filter(Boolean)
                  .map((v: { value: unknown }) => v.value)
              : (value as any).value
          ) as any;

          props.onChange && props.onChange(name, v);
        }}
      />
    </FormControl>
  );
}

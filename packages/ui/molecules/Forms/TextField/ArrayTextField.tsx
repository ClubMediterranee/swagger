import { useValue } from "@clubmed/trident-ui/hooks/useValue";
import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { FormControl, FormControlProps } from "@clubmed/trident-ui/molecules/Forms/FormControl";
import { TextField } from "@clubmed/trident-ui/molecules/Forms/TextField";
import classnames from "classnames";
import omit from "lodash/omit";
import { useId } from "react";

export interface ArrayTextFieldProps<Value = string> extends FormControlProps<Value[]> {}

/**
 * Ensure that the value is an array and return it or return default array value
 */
function ensureArray(value: never | never[]) {
  return Array.isArray(value) ? value : [];
}

export function ArrayTextField<Value = string>(props: ArrayTextFieldProps<Value>) {
  const internalId = useId();
  const { id = internalId, name = id } = props;

  const { value, setValue } = useValue<Value[]>({
    name: name,
    initialValue: props.value,
    defaultValue: [],
    onChange: props.onChange
  });

  return (
    <FormControl {...props} id={id} name={name}>
      {ensureArray(value as never[]).map((itemValue, index) => {
        return (
          <div key={name + index} className={classnames("flex gap-8 my-8", props.className)}>
            <div className={"flex-1"}>
              <TextField<Value>
                {...omit(props, ["label", "id", "name", "dataTestId"])}
                disabled={props.disabled}
                className={"w-full"}
                name={`${name}-${index}`}
                value={itemValue}
                onChange={(_, itemValue) => {
                  const newValue = [...value];
                  newValue[index] = itemValue;

                  setValue(newValue);
                }}
              />
            </div>
            <Button
              dataTestId={`remove-value-${name}-${index}`}
              variant="textSmall"
              icon="MinusDefault"
              theme="blackStroke"
              onClick={() => {
                setValue(value.filter((_, i) => i !== index));
              }}
            />
          </div>
        );
      })}
      {!props.disabled ? (
        <Button
          dataTestId={`add-new-value-${name}`}
          className={"mt-12"}
          icon="PlusDefault"
          variant="textSmall"
          onClick={() => {
            setValue([...(value || []), "" as unknown as Value]);
          }}
        >
          Add new value
        </Button>
      ) : null}
    </FormControl>
  );
}

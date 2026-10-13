import { useValue } from "@clubmed/trident-ui/hooks/useValue";
import { Button } from "@clubmed/trident-ui/ui/buttons/Button";
import { FormControl, FormControlProps } from "@clubmed/trident-ui/ui/forms/FormControl";
import { TextField } from "@clubmed/trident-ui/ui/forms/TextField";
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
              data-testid={`remove-value-${name}-${index}`}
              aria-label={`Remove value ${index + 1}`}
              variant="circle"
              icon="MinusDefault"
              color="black"
              theme="outline"
              onClick={() => {
                setValue(value.filter((_, i) => i !== index));
              }}
            />
          </div>
        );
      })}
      {!props.disabled ? (
        <Button
          data-testid={`add-new-value-${name}`}
          className={"mt-12"}
          icon="PlusDefault"
          size="small"
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

import { Select } from "@clubmed/ui/molecules/Forms/Select/Select";

export function SelectComponent(props: any) {
  let { allowedValues, allowEmptyValue, disabled } = props;

  const opts = (() => {
    const opts = allowedValues.map((value: string) => {
      return {
        value,
        label: value
      };
    });

    if (allowEmptyValue) {
      opts.unshift({
        label: " - ",
        value: ""
      });
    }

    return opts;
  })();

  return (
    <Select
      {...props}
      isDisabled={disabled}
      value={props.value}
      defaultValue={opts[0]}
      options={opts}
      multiple={props.multiple}
      isRequired={!allowEmptyValue}
      onChange={(_: string, value: string | string[]) => {
        let { onChange } = props;

        onChange && onChange(value);
      }}
    />
  );
}

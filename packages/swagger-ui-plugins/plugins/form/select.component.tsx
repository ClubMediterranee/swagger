import { Select } from "@clubmed/ui/molecules/Forms/Select/Select";

export function SelectComponent({ allowedValues, allowEmptyValue, ...props }: any) {
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
      value={props.value}
      options={opts}
      multiple={props.multiple}
      required={!allowEmptyValue}
      onChange={(_: string, value: string | string[]) => {
        let { onChange } = props;

        onChange && onChange(value);
      }}
    />
  );
}

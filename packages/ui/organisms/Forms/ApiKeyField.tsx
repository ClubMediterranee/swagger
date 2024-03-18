import moment from "moment";

import { useListStorage } from "../../hooks/storage/useLocaleStorage";
import { SelectOptionProps } from "../../molecules/Forms/Select/index";
import { AutoCompleteField, AutoCompleteFieldProps } from "../../molecules/Forms/TextField/AutoCompleteField";

function isApiKey(value: string) {
  return value.endsWith(".clubmed.com");
}

export function ApikeyField(props: Omit<AutoCompleteFieldProps, "options">) {
  const { options, pushValue, removeValue } = useListStorage("api_key", []);

  const onRemoveOption = (options: SelectOptionProps) => {
    removeValue(options.value);
  };

  const onChange = (name: string, value: string) => {
    if (isApiKey(value)) {
      pushValue(value);
    }

    props.onChange?.(name, value);
  };

  const items = options.map((item) => {
    return {
      value: item.id,
      label: (
        <div className="relative">
          <div className="flex flex-1 flex-col">
            <span>{item.id}</span>
            <small className="text-b6">{moment(item.lastUpdate).fromNow()}</small>
          </div>
        </div>
      )
    };
  });

  return <AutoCompleteField {...props} options={items} onChange={onChange} onRemoveOption={onRemoveOption} />;
}

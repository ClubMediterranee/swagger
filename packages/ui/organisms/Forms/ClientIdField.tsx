import moment from "moment";

import { useListStorage } from "../../hooks/storage/useLocaleStorage";
import { SelectOptionProps } from "../../molecules/Forms/Select/index";
import { AutoCompleteField, AutoCompleteFieldProps } from "../../molecules/Forms/TextField/AutoCompleteField";

function isClientID(value: string) {
  return value.length === 36;
}

export function ClientIdField(props: Omit<AutoCompleteFieldProps, "options">) {
  const { options, pushValue, removeValue } = useListStorage("client_id", []);

  const onRemoveOption = (options: SelectOptionProps) => {
    removeValue(options.value);
  };

  const onChange = (name: string, value: string) => {
    if (isClientID(value)) {
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

  return <AutoCompleteField {...props} className="w-full" options={items} onChange={onChange} onRemoveOption={onRemoveOption} />;
}

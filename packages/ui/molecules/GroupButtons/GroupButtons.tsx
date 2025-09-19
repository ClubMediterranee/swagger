import { useValue, UseValueProps } from "@clubmed/trident-ui/hooks/useValue";
import { Tag, TagProps } from "@clubmed/trident-ui/molecules/Tag";
import classNames from "classnames";

export interface GroupButtonsProps extends Omit<UseValueProps<string[]>, "initialValue"> {
  className?: string;
  choices?: (TagProps & { value: string })[];
  value?: string[];
}

export function GroupButtons(props: GroupButtonsProps) {
  const { value, setValue } = useValue<string[]>({
    ...props,
    initialValue: props.value,
    defaultValue: []
  });

  function handleClick(itemValue: string) {
    return () => {
      if (value.includes(itemValue)) {
        setValue(value.filter((v) => v !== itemValue));
      } else {
        setValue([...value, itemValue]);
      }
    };
  }

  return (
    <ul className={classNames("gap-8 flex flex-wrap", props.className)}>
      {props.choices?.map(({ value: itemValue, ...item }) => {
        return (
          <li key={itemValue}>
            <Tag
              {...item}
              role="button"
              className={"cursor-pointer text-b6 py-4 px-12"}
              backgroundColor={value.includes(itemValue) ? "saffron" : "blackStroke"}
              onClick={handleClick(itemValue)}
            >
              {item.label}
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}

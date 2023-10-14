import classNames from "classnames";
import {TagProps} from "../Tag/Tag";
import {useValue, UseValueProps} from "../../hooks/form/useValue";
import {Button} from "../Buttons";

export interface GroupButtonsProps extends Omit<UseValueProps<string[]>, "initialValue"> {
  className?: string;
  choices?: (TagProps & { value: string })[];
  value?: string[];
}

export function GroupButtons(props: GroupButtonsProps) {
  const {value, setValue} = useValue<string[]>({
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

  return <ul className={classNames("gap-8 flex flex-wrap", props.className)}>
    {
      props.choices?.map(({value: itemValue, ...item}) => {
        return <li key={itemValue}>
          <Button {...item} className={"text-b6 py-4 px-12"}
                  theme={value.includes(itemValue) ? "yellow" : "blackStroke"}
                  onClick={handleClick(itemValue)} />
        </li>;
      })
    }
  </ul>;
}

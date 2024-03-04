import Choices from "choices.js";
import {ReactNode, useEffect, useRef} from "react";
import type {Iconics} from "@clubmed/trident-ui/atoms/Icon";

export interface SelectOptionProps<Data = any> extends Record<string, any> {
  label: string | ReactNode;
  value: string;
  disabled?: boolean;
  note?: string | ReactNode;
  group?: string;
  data?: Data;
  template?: (item: SelectOptionProps<Data>) => ReactNode;
}

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
  icon?: Iconics;
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

export interface SelectSingle extends SelectProps {
  multiple?: false | undefined;
  value?: string;
  onChange?: (name: string | undefined, value: string) => void;
}

export interface SelectMultiple extends SelectProps {
  multiple: true;
  value?: string[];
  onChange?: (name: string | undefined, value: string[]) => void;
}

export type SelectOptionsByGroups = { label: string; id: number; choices: SelectOptionProps[] }[];

export type AllSelectProps = SelectSingle | SelectMultiple

export function useSelect({
                            name,
                            disabled,
                            multiple,
                            options,
                            placeholder,
                            searchEnabled = true,
                            value,
                            onChange
                          }: AllSelectProps) {
  const ref = useRef<any>();
  const choicesRef = useRef<Choices>();

  useEffect(() => {
    if (choicesRef.current) {
      const opts = options.length === 1 && options[0].choices?.length ? options[0].choices : options;

      if (multiple) {
        choicesRef.current.clearStore();
        choicesRef.current.setChoices(opts, "value", "label", true);
      } else {
        choicesRef.current.setChoices(opts, "value", "label", true);
      }
    }
  }, [multiple, options]);

  useEffect(() => {
    if (!choicesRef.current) {
      choicesRef.current = new Choices(ref.current, {
        silent: true,
        searchEnabled,
        searchPlaceholderValue: "Filter options",
        removeItemButton: true,
        items: options,
        placeholder: !!placeholder,
        placeholderValue: placeholder || null,
        itemSelectText: "",
        shouldSort: false,
        classNames: {
          containerOuter: `choices`
        },
       // callbackOnCreateTemplates
      } as any);
    }

    if (disabled) {
      choicesRef.current?.disable();
    } else {
      choicesRef.current?.enable();
    }

    const addItem = ({detail: {value: newValue}}: any) => {
      if (onChange) {
        if (multiple) {
          onChange(name, [...value as string[], newValue]);
        } else {
          onChange(name, newValue);
        }
      }
    };

    const removeItem = ({detail: {value: newValue}}: any) => {
      if (multiple) {
        onChange?.(name, (value as string[]).filter((v) => v !== newValue));
      }
    };

    choicesRef.current?.passedElement.element.addEventListener("addItem", addItem);
    choicesRef.current?.passedElement.element.addEventListener("removeItem", removeItem);

    return () => {
      choicesRef.current?.passedElement.element.removeEventListener("addItem", addItem);
      choicesRef.current?.passedElement.element.removeEventListener("removeItem", removeItem);
    };
  }, [disabled, multiple, onChange, options, placeholder, searchEnabled, value]);

  return {
    ref,
    choicesRef
  };
}

import type { IconicNames } from "@clubmed/trident-ui/atoms/Icons";
import Choices from "choices.js";
import { uniq } from "lodash";
import isEqual from "lodash/isEqual";
import { ReactNode, useEffect, useRef } from "react";

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

export type AllSelectProps = SelectSingle | SelectMultiple;

export function useChoice({
  name,
  disabled,
  multiple,
  options,
  placeholder,
  searchEnabled = true,
  value,
  defaultValue,
  onChange
}: AllSelectProps) {
  const ref = useRef<any>();
  const choicesRef = useRef<Choices>();
  const optionsRef = useRef<null | any[]>(null);
  const localValue = useRef<null | any>(null);

  useEffect(() => {
    if (choicesRef.current && !isEqual(optionsRef.current, options)) {
      if (multiple) {
        choicesRef.current.clearStore();
        choicesRef.current.setChoices(options, "value", "label", true);
      } else {
        choicesRef.current.clearStore();
        choicesRef.current.setChoices(options, "value", "label", true);
      }
      optionsRef.current = options;
    }
  }, [multiple, options]);

  useEffect(() => {
    if (!choicesRef.current) {
      choicesRef.current = new Choices(ref.current, {
        silent: true,
        disabled,
        searchEnabled: true,
        searchPlaceholderValue: "Filter options",
        removeItemButton: true,
        items: options,
        placeholder: !!placeholder,
        placeholderValue: placeholder || null,
        itemSelectText: "",
        shouldSort: false,
        classNames: {
          containerOuter: `choices`
        }
        // callbackOnCreateTemplates
      } as any);
    }

    if (!isEqual(optionsRef.current, options)) {
      choicesRef.current.clearStore();
      choicesRef.current.setChoices(options, "value", "label", true);
      optionsRef.current = options;
    }

    if (!(multiple && (value as any) === "")) {
      if (!isEqual(localValue.current, value)) {
        choicesRef.current.setValue(uniq([].concat(value as any)) as []);
        localValue.current = value;
      }
    }

    const addItem = ({ detail: { value: newValue } }: any) => {
      if (onChange) {
        if (multiple) {
          localValue.current = uniq([...((value as string[]) || []), newValue]);
          localValue.current = value;
        } else {
          localValue.current = newValue;
        }

        onChange(name, newValue);
      }
    };

    const removeItem = ({ detail: { value: newValue } }: any) => {
      if (multiple) {
        onChange?.(
          name,
          ((value as string[]) || []).filter((v) => v !== newValue)
        );
      }
    };

    choicesRef.current?.passedElement.element.addEventListener("addItem", addItem);
    choicesRef.current?.passedElement.element.addEventListener("removeItem", removeItem);

    return () => {
      choicesRef.current?.passedElement.element.removeEventListener("addItem", addItem);
      choicesRef.current?.passedElement.element.removeEventListener("removeItem", removeItem);
    };
  }, [multiple, onChange, options, placeholder, searchEnabled, defaultValue]);

  useEffect(() => {
    if (choicesRef.current) {
      if (disabled) {
        choicesRef.current?.disable();
      } else {
        choicesRef.current?.enable();
      }
    }
  }, [choicesRef, disabled]);

  return {
    ref,
    choicesRef
  };
}

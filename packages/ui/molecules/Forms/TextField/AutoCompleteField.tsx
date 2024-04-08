import { TextField, TextFieldProps } from "@clubmed/trident-ui/molecules/Forms/TextField";
import classnames from "classnames";
import omit from "lodash/omit";
import React, { useRef, useState } from "react";

import { useDebounce } from "../../../hooks/useDebounce";
import { SelectOptionProps } from "../Select/index";

export interface AutoCompleteFieldProps<Value = any> extends TextFieldProps<Value> {
  debounceTimeout: number;
  options: SelectOptionProps[];
  onRemoveOption?: (option: SelectOptionProps) => void;
}

function useAutoCompleteField<Value>(props: AutoCompleteFieldProps<Value>) {
  const debouncedRequest = useDebounce(props.onChange, props.debounceTimeout);
  const [value, setValue] = useState<Value>(props.value as Value);
  const [focused, setFocused] = useState<boolean>(false);
  const [currentSelection, setCurrentSelection] = useState<number>(-1);
  const items = props.options.filter((item) => {
    return item.value.includes(value as string);
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function onKeyDown(e: React.KeyboardEvent) {
    if (!items.length) {
      return;
    }

    if (e.key === "ArrowDown") {
      setCurrentSelection((prev) => (prev < items.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setCurrentSelection((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      setValue(items[currentSelection].value as Value);
      debouncedRequest(props.name, items[currentSelection].value as Value);
    }
  }

  function onChange(name: string, value: Value) {
    setValue(value);
    return debouncedRequest(name, value);
  }

  function onFocus(e: React.FocusEvent) {
    setFocused(true);
    props.onFocus?.(e as any);
  }

  function onBlur(e: React.FocusEvent) {
    timerRef.current = setTimeout(() => {
      setFocused(false);
      clearTimerBlur();
    }, 100);

    props.onBlur?.(e as any);
  }

  function clearTimerBlur() {
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  function onRemoveOption(option: SelectOptionProps) {
    containerRef.current?.querySelector("input")?.focus();
    clearTimerBlur();

    props.onRemoveOption?.(option);
  }

  return {
    containerRef,
    debouncedRequest,
    value,
    setValue,
    currentSelection,
    setCurrentSelection,
    focused,
    items,
    onKeyDown,
    onChange,
    onFocus,
    onBlur,
    onRemoveOption,
    canRemoveOption: !!props.onRemoveOption
  };
}

export function AutoCompleteField<Value = string>({ debounceTimeout, ...props }: AutoCompleteFieldProps<Value>) {
  const {
    debouncedRequest,
    containerRef,
    currentSelection,
    setCurrentSelection,
    value,
    setValue,
    focused,
    items,
    onKeyDown,
    onChange,
    onFocus,
    onBlur,
    onRemoveOption,
    canRemoveOption
  } = useAutoCompleteField({
    debounceTimeout,
    ...props
  });

  return (
    <div
      className={classnames(
        "relative dropdown-container",
        {
          "-has-options": props.options?.length
        },
        props.className
      )}
      ref={containerRef}
    >
      <TextField
        {...omit(props, ["onRemoveOption"])}
        autoComplete="off"
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />

      <button
        onClick={() => {
          setValue("" as Value);
          return debouncedRequest(props.name, "");
        }}
        type="button"
        className="dropdown-clear"
        aria-label={`Remove item: '${value}'`}
        aria-hidden={!(value as any)}
      >
        Remove item
      </button>

      <div className="dropdown absolute bg-white p-5" aria-expanded={!!(focused && items.length)}>
        <div role="listbox">
          {items.map((option, index) => {
            const onClick = () => {
              setValue(option.value as Value);
              debouncedRequest(props.name, option.value as Value);
            };

            return (
              <div
                className="cursor-pointer"
                key={option.value}
                role="option"
                tabIndex={index}
                aria-selected={currentSelection === index}
                onMouseOver={() => setCurrentSelection(index)}
                onFocus={() => setCurrentSelection(index)}
                onKeyDown={onClick}
                onClick={onClick}
              >
                {option.label}

                {canRemoveOption ? (
                  <button
                    aria-label={`Remove ${option.value} from list`}
                    title={`Remove ${option.value} from list`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveOption(option);
                    }}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

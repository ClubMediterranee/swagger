import type { IconicNames } from "@clubmed/trident-ui/atoms/Icons";
import { ReactNode } from "react";

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

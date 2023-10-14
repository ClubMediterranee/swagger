import classNames from "classnames";
import type {FunctionComponent} from "react";

import {Icon, Iconics} from "../../atoms/Icon";

export interface TagProps {
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Text color
   */
  color?: string;
  /**
   * Border color
   */
  border?: string;
  /**
   * Should the background/border and main text color be switched?
   * @default false
   */
  shouldInvertColors?: boolean;
  /**
   * Optional icon name
   */
  icon?: Iconics;
  /**
   * Tag label
   */
  label?: string;
  /**
   * Display mode
   */
  displayMode?: "icon" | "label" | "both" | "monogram" | "none";
  /**
   * Icon class name
   */
  iconClassName?: string;
  /**
   * Label class name
   */
  labelClassName?: string;
}

// this for tailwind css purge
const borderColorClassMapping: { [key: string]: string } = {
  sienna: "border-sienna",
  ultramarine: "border-ultramarine",
  saffron: "border-saffron",
  darkGrey: "border-darkGrey",
  lightGrey: "border-lightGrey",
  white: "border-white",
  verdigris: "border-verdigris",
  wave: "border-wave"
};

const bgColorClassMapping: { [key: string]: string } = {
  sienna: "bg-sienna",
  ultramarine: "bg-ultramarine",
  saffron: "bg-saffron",
  darkGrey: "bg-darkGrey",
  lightGrey: "bg-lightGrey",
  white: "bg-white",
  verdigris: "bg-verdigris",
  wave: "bg-wave"
};

export const Tag: FunctionComponent<TagProps> = ({
                                                   className,
                                                   backgroundColor = "saffron",
                                                   color = "black",
                                                   border,
                                                   shouldInvertColors = false,
                                                   icon,
                                                   label = "",
                                                   displayMode = "both",
                                                   iconClassName,
                                                   labelClassName
                                                 }) => {
  if (!label && !icon) {
    return null;
  }

  const layout = displayMode === "label" || displayMode === "both" ? "px-16 py-4" : "p-4";
  const borderColor = shouldInvertColors ? color : border || backgroundColor;
  const bgColor = shouldInvertColors ? color : backgroundColor;
  const textColor = shouldInvertColors ? backgroundColor : color;
  const borderColorClass = borderColorClassMapping[borderColor] ?? `border-${borderColor}`;
  const bgColorClass = bgColorClassMapping[bgColor] ?? `bg-${bgColor}`;
  const appearance = `${bgColorClass} border ${borderColorClass} text-${textColor}`;

  return (
    <span
      data-name="Tag"
      className={classNames(
        "text-b3 rounded-pill inline-block font-sans font-semibold",
        layout,
        appearance,
        className,
      )}
      title={label}
      role="note"
    >
      <span className="flex items-center justify-center gap-x-4">
        {(displayMode === "icon" || displayMode === "both" || displayMode === "none") && icon && (
          <Icon width="24px" name={icon} className={iconClassName}/>
        )}
        <span className={labelClassName}>
          {(displayMode === "label" || displayMode === "both" || displayMode === "none") && label}
        </span>
        {displayMode === "monogram" && (
          <span className="text-center" style={{width: "24px", height: "24px"}}>
            {label}
          </span>
        )}
      </span>
    </span>
  );
};

import classnames from "classnames";
import {FunctionComponent} from "react";

export interface InputLabelProps {
  /**
   * Label text
   */
  label: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Id of the input
   */
  id: string;
  /**
   * Layout of the label
   */
  layout?: "horizontal" | "vertical";
  /**
   * Additional class names
   */
  className?: string;
}

const LAYOUTS = {
  horizontal: "flex flex-wrap items-center gap-x-12 px-20",
  vertical: "flex flex-col items-start"
};

export const InputLabel: FunctionComponent<InputLabelProps> = ({
                                                                 label,
                                                                 description,
                                                                 id,
                                                                 layout = "horizontal",
                                                                 className
                                                               }) => {
  return (
    <label
      htmlFor={id}
      className={classnames("text-b3 font-semibold text-black", LAYOUTS[layout], className)}
      data-name="InputLabel"
    >
      {label}
      {description && (
        <span className="text-b4 text-middleGrey inline-block font-normal">{description}</span>
      )}
    </label>
  );
};

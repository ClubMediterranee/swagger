import classnames from "classnames";
import {AnchorHTMLAttributes, FunctionComponent} from "react";

import {Icon, Iconics} from "../../atoms/Icon";

interface LinkProps<T extends HTMLAnchorElement = HTMLAnchorElement>
  extends AnchorHTMLAttributes<T> {
  /**
   * Label text
   */
  label: string;
  /**
   * Icon name
   */
  icon?: Iconics;
  /**
   * Underlined
   */
  underlined?: boolean;
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Is the link inert (not itself clickable but part of a clickable element)
   */
  inert?: boolean;
}

export const Link: FunctionComponent<LinkProps> = ({
                                                     label,
                                                     icon,
                                                     underlined = true,
                                                     className,
                                                     inert,
                                                     ...anchorAttrs
                                                   }) => {
  const lastSpace = label.lastIndexOf(" ");
  const lastIndex = lastSpace === -1 ? label.length : lastSpace;

  const first = label.at(0);
  const middle = label.substring(1, lastIndex + 1);
  const last = label.substring(lastIndex);
  const TagName = inert ? "span" : "a";

  return (
    <TagName
      className={classnames(
        "text-b3 decoration-none link-container cursor-pointer text-inherit",
        className
      )}
      data-name="Link"
      {...anchorAttrs}
    >
      <span className={classnames({"link-underline": underlined})}>{first}</span>
      <span
        className={classnames("hoverable", {
          "has-icon": icon,
          "link-underline": underlined
        })}
      >
        {middle}
        <span className="inline-block">
          {last}
          {icon && <Icon name={icon} width="24px" style={{marginInlineStart: "8px"}}/>}
        </span>
      </span>
    </TagName>
  );
};

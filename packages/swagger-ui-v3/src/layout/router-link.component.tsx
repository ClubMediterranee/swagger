import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export function RouterLink(props: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <Link to={props.href || ""} {...props}>
      {props.children}
    </Link>
  );
}

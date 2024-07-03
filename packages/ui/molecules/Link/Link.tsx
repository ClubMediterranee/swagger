import { AnchorHTMLAttributes, PropsWithChildren } from "react";

export function Link({ children, ...props }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return <a {...props}>{children}</a>;
}

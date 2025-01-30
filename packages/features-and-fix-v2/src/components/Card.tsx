import { Icon, IconicNames, IconicTypes } from "@clubmed/trident-icons";
import classnames from "classnames";
import { FunctionComponent, PropsWithChildren } from "react";

interface CardProps {
  title: string;
  icon: IconicNames;
  iconType?: IconicTypes;
  theme?: "light" | "dark";
  dataName?: string;
}

export const Card: FunctionComponent<PropsWithChildren<CardProps>> = ({
  title,
  children,
  icon,
  iconType,
  theme = "light",
  dataName = "Card"
}) => {
  return (
    <div className="border-lightGrey rounded-16 flex shrink-0 flex-row gap-12 border bg-white p-12" data-name={dataName}>
      <div>
        <div
          className={classnames("flex p-8 size-48 shrink-0 items-center justify-center rounded-full", {
            "bg-ultramarine text-white": theme === "dark",
            "bg-lightSand text-black": theme === "light"
          })}
        >
          <Icon name={icon} type={iconType} width="24px" height="24px" />
        </div>
      </div>
      <div className="space-y-8 font-sans">
        <div className="text-b4 font-semibold">{title}</div>
        <div className="text-b5 font-normal">{children}</div>
      </div>
    </div>
  );
};

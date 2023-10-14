"use client";

import {animated} from "@react-spring/web";
import {Link} from "react-router-dom";
import classNames from "classnames";
import type {AnchorHTMLAttributes, FunctionComponent} from "react";
import React from "react";

import {type CommonButtonProps} from "./Button";
import {rootClassName, variants} from "./Button.helpers";
import {themes} from "./Button.themes";
import {ButtonContent} from "./ButtonContent";

import {useSafeBoop} from "../../hooks/useSafeBoop";

interface ButtonAnchorProps extends CommonButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
}

const AnimatedLink = animated(Link);

export const ButtonAnchor: FunctionComponent<ButtonAnchorProps> = ({
                                                                     theme = "yellow",
                                                                     backgroundOverride,
                                                                     variant = "text",
                                                                     className,
                                                                     label,
                                                                     children,
                                                                     title,
                                                                     icon,
                                                                     dataTestId,
                                                                     href,
                                                                     groupName = "",
                                                                     onClick,
                                                                     ...anchorAttrs
                                                                   }) => {
  const shouldShowLabel = variant === "text" || variant === "textSmall";
  const layout = variants[variant];
  const style = themes(theme, backgroundOverride, groupName);
  const [boopStyle, boopTrigger] = useSafeBoop({
    scale: 0.98,
    springConfig: {tension: 280, friction: 20}
  });

  const btn = <ButtonContent shouldShowLabel={shouldShowLabel} label={label} icon={icon}>
    {children}
  </ButtonContent>;

  const onClickAnimate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    boopTrigger();
  };

  const classes = classNames(rootClassName, style, layout, variant, className);
  const titleAttr = title || label;

  if (href?.includes("://")) {
    return <animated.a
      href={href}
      data-name="ButtonAnchor"
      data-testid={dataTestId}
      className={classes}
      style={boopStyle}
      onClick={onClickAnimate}
      title={titleAttr}
      target="_blank"
      rel="noopener noreferrer"
      {...anchorAttrs}>
      {btn}
    </animated.a>;
  }

  return (
    <AnimatedLink
      to={href!}
      data-name="ButtonAnchor"
      data-testid={dataTestId}
      className={classes}
      style={boopStyle}
      onClick={onClickAnimate}
      title={titleAttr}
      {...anchorAttrs}
    >
      {btn}
    </AnimatedLink>
  );
};

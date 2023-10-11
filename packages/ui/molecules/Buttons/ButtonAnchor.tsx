'use client';

import { animated } from '@react-spring/web';
import classNames from 'classnames';
import type { AnchorHTMLAttributes, FunctionComponent } from 'react';

import { type CommonButtonProps } from './Button';
import { rootClassName, variants } from './Button.helpers';
import { themes } from './Button.themes';
import { ButtonContent } from './ButtonContent';

import { useSafeBoop } from '../../hooks/useSafeBoop';

interface ButtonAnchorProps extends CommonButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {}

export const ButtonAnchor: FunctionComponent<ButtonAnchorProps> = ({
  theme = 'yellow',
  backgroundOverride,
  variant = 'text',
  className,
  label,
  children,
  title,
  icon,
  dataTestId,
  href,
  groupName = '',
  onClick,
  ...anchorAttrs
}) => {
  const shouldShowLabel = variant === 'text';
  const layout = variants[variant];
  const style = themes(theme, backgroundOverride, groupName);
  const [boopStyle, boopTrigger] = useSafeBoop({
    scale: 0.98,
    springConfig: { tension: 280, friction: 20 },
  });

  return (
    <animated.a
      data-name="ButtonAnchor"
      data-testid={dataTestId}
      className={classNames(rootClassName, style, layout, variant, className)}
      style={boopStyle}
      onClick={(e) => {
        onClick?.(e);
        boopTrigger();
      }}
      title={title || label}
      href={href}
      {...anchorAttrs}
    >
      <ButtonContent shouldShowLabel={shouldShowLabel} label={label} icon={icon}>
        {children}
      </ButtonContent>
    </animated.a>
  );
};

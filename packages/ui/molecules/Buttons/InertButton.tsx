'use client';

import classNames from 'classnames';
import type { FunctionComponent } from 'react';

import { type CommonButtonProps } from './Button';
import { rootClassName, variants } from './Button.helpers';
import { themes } from './Button.themes';
import { ButtonContent } from './ButtonContent';

export const InertButton: FunctionComponent<CommonButtonProps> = ({
  theme = 'yellow',
  backgroundOverride,
  variant = 'text',
  className,
  label,
  children,
  title,
  icon,
  dataTestId,
  groupName = '',
}) => {
  const shouldShowLabel = variant === 'text';
  const layout = variants[variant];
  const style = themes(theme, backgroundOverride, groupName);

  return (
    <span
      data-name="InertButton"
      data-testid={dataTestId}
      className={classNames(rootClassName, style, layout, variant, className)}
      title={title || label}
    >
      <ButtonContent shouldShowLabel={shouldShowLabel} label={label} icon={icon}>
        {children}
      </ButtonContent>
    </span>
  );
};

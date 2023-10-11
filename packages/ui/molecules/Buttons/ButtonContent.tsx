import { FunctionComponent, ReactNode } from 'react';

import { Icon, Iconics } from '../../atoms/Icon';

export const ButtonContent: FunctionComponent<{
  shouldShowLabel: boolean;
  label?: string;
  children?: ReactNode;
  icon?: Iconics;
}> = ({ shouldShowLabel, label, children, icon }) => {
  return (
    <span className="flex items-center justify-center gap-x-8">
      {shouldShowLabel ? label : <span className="sr-only">{label}</span>}
      {children}
      {icon && <Icon width="24px" name={icon} />}
    </span>
  );
};

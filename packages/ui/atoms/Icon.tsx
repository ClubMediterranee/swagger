import { CSS, Interpolation, SpringValue } from '@react-spring/web';
import classnames from 'classnames';
import { FunctionComponent } from 'react';

import { Icons, type Iconics } from '../assets/icons';

export { Iconics };

interface IconProps {
  /**
   * Width of the icon
   */
  width?: string;
  /**
   * Icon name
   */
  name: Iconics;
  /**
   * Rotation
   * Use it to rotate the icon statically, if you need to animate a rotation, use the style prop
   * after wrapping the Icon in an animated component
   */
  rotation?: number;
  /**
   * Color
   */
  color?: string;
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Additional styles
   */
  style?: {
    [key: string]:
      | string
      | number
      | SpringValue<string>
      | SpringValue<number>
      | Interpolation<string, string>
      | CSS.Properties;
  };
}

export const Icon: FunctionComponent<IconProps> = ({
  className,
  rotation = 0,
  width = '16px',
  color = 'inherit',
  name,
  style,
}) => {
  const icon = Icons[name];

  if (!icon) {
    return null;
  }

  const { url, viewBox, aspectRatio, intrinsicRotation = 0, intrinsicClassName } = icon ?? {};
  const iconColor = `text-${color}`;
  const rotate = `${rotation + intrinsicRotation}deg`;

  return (
    <span
      className={classnames(
        'inline-block shrink-0 align-middle',
        intrinsicClassName,
        iconColor,
        className,
      )}
      style={{ width, rotate, aspectRatio, ...style }}
      data-testid={`icon-${name}`}
      data-name="Icon"
    >
      <svg viewBox={viewBox}>
        <use xlinkHref={url} />
      </svg>
    </span>
  );
};

import { useSpring, animated, useResize } from '@react-spring/web';
import classnames from 'classnames';
import { FunctionComponent, MutableRefObject, PropsWithChildren, useEffect, useRef } from 'react';

/**
 * This is not a Collapse component, it's a component that animates *to* the height of its children.
 * It does the *absolute* same but you Bring Your Own Height™ by applying a class to the children.
 * e.g.: <ElasticHeight className={isOpen ? "" : "h-0"}><div>...</div></ElasticHeight>
 * ID is there for accessibility purposes.
 *
 * This is in no way affiliated with Amazon ElasticSearch.
 */

interface ElasticHeightProps {
  /**
   * Id of the element
   */
  id?: string;
  /**
   * Class of the element (please provide something that sets the height)
   */
  className?: string;
  /**
   * Class of the container (to avoid CLS, mainly)
   */
  containerClassName?: string;
  /**
   * Role of the element
   */
  role?: string;
}

const linearInterpolation = (x: number) => x;

export const ElasticHeight: FunctionComponent<PropsWithChildren<ElasticHeightProps>> = ({
  children,
  id,
  className,
  role,
  containerClassName,
}) => {
  const ref = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const { height } = useResize({ container: ref });

  const [styles, api] = useSpring(() => ({
    from: {
      height: height.to(linearInterpolation),
    },
    immediate: true,
  }));

  useEffect(() => {
    api.start({
      to: {
        height: height.to(linearInterpolation),
      },
      config: {
        tension: 170,
        friction: 26,
      },
    });
  }, [api, height]);

  return (
    <animated.div
      role={role}
      className={classnames('overflow-hidden', containerClassName)}
      style={{ ...styles }}
      id={id}
    >
      <div className={className} ref={ref}>
        {children}
      </div>
    </animated.div>
  );
};

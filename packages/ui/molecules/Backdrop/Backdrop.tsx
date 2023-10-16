import {animated, config, useTransition} from "@react-spring/web";
import classnames from "classnames";
import type {FunctionComponent, MouseEvent, PropsWithChildren} from "react";

interface BackdropProps {
  /**
   * On close
   * @param event
   */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Is visible
   */
  isVisible?: boolean;
  /**
   * Sweep Mode™
   * (makes it appear from the sides instead of from everywhere)
   */
  sweep?: boolean;
}

export const Backdrop: FunctionComponent<PropsWithChildren<BackdropProps>> = ({
                                                                                children,
                                                                                onClose,
                                                                                isVisible,
                                                                                sweep
                                                                              }) => {
  const transitions = useTransition(isVisible, {
    from: {
      WebkitBackdropFilter: "blur(0px)",
      backdropFilter: "blur(0px)",
      "--tw-bg-opacity": 0,
      x: sweep ? "-100%" : "0%"
    },
    enter: {
      WebkitBackdropFilter: "blur(10px)",
      backdropFilter: "blur(10px)",
      "--tw-bg-opacity": 0.8,
      x: "0%"
    },
    leave: {
      WebkitBackdropFilter: "blur(0px)",
      backdropFilter: "blur(0px)",
      "--tw-bg-opacity": 0,
      x: sweep ? "100%" : "0%"
    },
    config: sweep ? {tension: 200, friction: 40} : config.gentle
  });

  return transitions(
    (style, item) =>
      item && (
        <div
          role="presentation"
          className="z-5 pointer-events-none bg-white fixed inset-0 flex items-center justify-center"
        >
          <animated.button
            className={classnames("-z-1 absolute inset-0 bg-white", {
              "pointer-events-auto": isVisible
            })}
            style={style}
            onClick={onClose}
          />
          {children}
        </div>
      )
  );
};

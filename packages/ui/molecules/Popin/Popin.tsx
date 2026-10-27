import { Backdrop } from "@clubmed/trident-ui/molecules/Backdrop";
import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { animated, config, useTransition } from "@react-spring/web";
import classnames from "classnames";
import { type FunctionComponent, type PropsWithChildren, type ReactNode, useId } from "react";

export type ClosePopinCallback = () => void;

interface PopinFooterProps {
  closeLabel: string;
  onClose: ClosePopinCallback;
}

const PopinFooter = ({ closeLabel, onClose }: PopinFooterProps) => {
  return (
    <Button
      theme="black"
      variant="icon"
      icon="CrossDefault"
      className="mx-auto"
      label={closeLabel}
      aria-label={closeLabel}
      onClick={onClose}
    />
  );
};

export interface PopinProps {
  title: ReactNode;
  closeLabel: string;
  onClose: ClosePopinCallback;
  isVisible: boolean;
  className?: string;
  showCloseButton?: boolean;
  Footer?: FunctionComponent<PopinFooterProps> | false;
}

export const Popin: FunctionComponent<PropsWithChildren<PopinProps>> = ({
  title,
  children,
  closeLabel,
  onClose,
  isVisible,
  className = "sm:w-360",
  Footer = PopinFooter
}) => {
  const portalId = useId();
  // Backdrop toggles its state when isVisible isn't a boolean (e.g. undefined on first render),
  // which opens an empty white overlay in production builds.
  const visible = !!isVisible;
  const transitions = useTransition(visible, {
    from: { scale: 0.3, opacity: 0.3 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 0, opacity: 0 },
    config: visible ? { tension: 120, friction: 20 } : config.gentle
  });

  return (
    // Keep the portal inside the consumer's CSS scope and stacking context.
    <div id={portalId} className="z-5 absolute top-0 inset-x-0">
      <Backdrop target={portalId} isVisible={visible} onClose={onClose}>
        {transitions(
          (style, item) =>
            item && (
              <animated.div
                className={classnames("border-lightGrey rounded-16 pointer-events-auto md:mx-20 w-full border bg-white", className)}
                style={style}
              >
                <div className="p-20 md:p-40 text-center max-h-[90vh] flex flex-col">
                  {title && <div className="mt-12 text-h5 text-start font-serif">{title}</div>}
                  <div className="mt-12 mb-40 last:mb-0 text-start overflow-auto">{children}</div>
                  {Footer && (
                    <div>
                      <Footer closeLabel={closeLabel} onClose={onClose} />
                    </div>
                  )}
                </div>
              </animated.div>
            )
        )}
      </Backdrop>
    </div>
  );
};

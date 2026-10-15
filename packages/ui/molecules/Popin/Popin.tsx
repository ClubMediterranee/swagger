import "./Popin.css";

import { Backdrop } from "@clubmed/trident-ui/ui/Backdrop";
import { Button } from "@clubmed/trident-ui/ui/buttons/Button";
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
      color="black"
      theme="solid"
      variant="circle"
      icon="CrossDefault"
      className="mx-auto"
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

  return (
    // Keep the portal inside the consumer's CSS scope and stacking context.
    <div id={portalId} className="popin-portal z-5 absolute top-0 inset-x-0">
      <Backdrop target={portalId} isVisible={isVisible} onClose={onClose}>
        <div
          className={classnames("popin-panel border-lightGrey rounded-16 pointer-events-auto md:mx-20 w-full border bg-white", className)}
          data-visible={isVisible}
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
        </div>
      </Backdrop>
    </div>
  );
};

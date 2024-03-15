import { Icon } from "@clubmed/trident-ui/atoms/Icon";
import { ElasticHeight } from "@clubmed/trident-ui/molecules/ElasticHeight";
import { animated, useSpring } from "@react-spring/web";
import classnames from "classnames";
import { Fragment, FunctionComponent, PropsWithChildren, ReactNode, useState } from "react";

interface MobileMenuProps {
  header: ReactNode;
  label?: string;
  className?: string;
}

const AnimatedIcon = animated(Icon);

export const HeaderMobileCollapse: FunctionComponent<PropsWithChildren<MobileMenuProps>> = ({
  header,
  children,
  label = "",
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { rotate } = useSpring({
    rotate: isOpen ? -180 : 0
  });
  return (
    <Fragment>
      <button
        className={classnames("flex w-full items-center justify-between text-start", className)}
        aria-controls={`navigation-section-${label}-links`}
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {header}
        <AnimatedIcon name="ArrowDefaultDown" className="md:hidden" width="30px" style={{ rotate }} />
      </button>
      <ElasticHeight role="presentation" id={`navigation-section-${label}-links`} className={classnames("md:h-auto", { "h-0": !isOpen })}>
        {children}
      </ElasticHeight>
    </Fragment>
  );
};

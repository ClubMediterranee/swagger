import {animated, useSpring} from "@react-spring/web";
import {FunctionComponent} from "react";

interface HamburgerIconProps {
  /**
   * Width of the HamburgerIcon
   */
  width?: string;
  /**
   * Whether the HamburgerIcon is active or not
   */
  isActive?: boolean;
}

export const HamburgerIcon: FunctionComponent<HamburgerIconProps> = ({
                                                                       width: widthProp = "24px",
                                                                       isActive = false
                                                                     }) => {
  const {width} = useSpring({width: widthProp});
  const iconStyle = useSpring({
    transform: isActive ? "translate(3.002700, 6.224356)" : "translate(3,6)",
    path1: isActive
      ? "M4.93259468,0.296729803 L20.476916,15.8410511 C20.8700674,16.2342025 20.8721957,16.8713128 20.4825799,17.2609286 C20.0929641,17.6505444 19.4558538,17.648416 19.0627024,17.2552647 L3.51838112,1.71094337 C3.12522975,1.317792 3.12240132,0.679981679 3.51201716,0.290365842 C3.901633,-0.0992499941 4.53944331,-0.096421567 4.93259468,0.296729803 Z"
      : "M1.009,0 L22.99199,0 C23.54799,0 24,0.449 24,1 C24,1.551 23.54799,2 22.99199,2 L1.009,2 C0.453,2 0,1.551 0,1 C0,0.449 0.453,0 1.009,0 Z",
    path2: isActive
      ? "M5.1242772,17.4441138 L20.665063,1.90332799 C21.0582143,1.51017662 21.0617499,0.873073405 20.6714269,0.482750462 C20.281104,0.092427519 19.6440008,0.0959630529 19.2508494,0.489114423 L3.71006364,16.0299002 C3.31691227,16.4230516 3.31408384,17.0594477 3.70440678,17.4497706 C4.09472972,17.8400935 4.73112583,17.8372651 5.1242772,17.4441138 Z"
      : "M1.0113,18 L22.98929,18 C23.54529,18 23.99829,17.552 23.99829,17 C23.99829,16.448 23.54529,16 22.98929,16 L1.0113,16 C0.4553,16 0.0033,16.448 0.0033,17 C0.0033,17.552 0.4553,18 1.0113,18 Z",
    opacity: isActive ? 0 : 1
  });

  return (
    <animated.svg
      className="shrink-0"
      data-testid={isActive ? "HamburgerIcon-active" : "HamburgerIcon"}
      data-name="HamburgerIcon"
      width={width}
      height={width}
      viewBox="0 0 30 30"
    >
      <animated.g transform={iconStyle.transform} fill="currentColor">
        <animated.path d={iconStyle.path1}/>
        <animated.path
          opacity={iconStyle.opacity}
          d="M22.98969,8 L1.0117,8 C0.4557,8 0.0027,8.448 0.0027,9 C0.0027,9.552 0.4557,10 1.0117,10 L22.98969,10 C23.54569,10 23.99769,9.552 23.99769,9 C23.99769,8.448 23.54569,8 22.98969,8 Z"
        />
        <animated.path d={iconStyle.path2}/>
      </animated.g>
    </animated.svg>
  );
};

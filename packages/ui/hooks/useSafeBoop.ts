import {CSSProperties} from "react";
import useBoop from "use-boop";

type Args = Parameters<typeof useBoop>[0];

export const useSafeBoop = (boopArgs: Args): [CSSProperties, () => void] => {
  const [boopStyle, boopTrigger] = useBoop(boopArgs);

  return [
    {
      "--transform":
        boopStyle?.transform ||
        `translate3D(0px, 0px, 0px)
         rotateX(0deg) rotateY(0deg) rotateZ(0deg)
         scale3D(1, 1, 1)
         skew(0deg, 0deg)`,
      transform: "var(--transform)"
    } as CSSProperties,
    boopTrigger
  ];
};

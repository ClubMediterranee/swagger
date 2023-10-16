import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export function wrapOperation(Base: any) {
  return (props: Record<string, any>) => {
    const {ref, inView, entry} = useInView({});

    useEffect(() => {
      if (entry) {
        const el = entry.target.nextElementSibling;

        if (el) {
          if (!el.classList.contains("loaded")) {
            el.classList.add("opacity-0");
            el.classList.add("loaded");
            el.classList.add("transition-opacity");
            el.classList.add("duration-500");
            el.classList.add("ease-in-out");
          }

          if (inView) {
            el?.classList.remove("opacity-0");
          }
        }
      }
    }, [inView, entry]);

    return <>
      <div ref={ref} className={"operation-intersection-obs"}/>
      <Base {...props} />
    </>;
  };
}

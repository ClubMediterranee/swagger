import { useDevice } from "@clubmed/trident-ui/contexts/Device";
import { useTransition } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

export const HOVER_ENTRY_DURATION = 300;
export const HOVER_EXIT_DURATION = 500;

export function useMenu() {
  const hoverInTimeout = useRef<ReturnType<typeof setTimeout>>();
  const hoverOutTimeout = useRef<ReturnType<typeof setTimeout>>();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const isDesktop = useDevice("desktop");

  useEffect(() => {
    return () => {
      clearTimeout(hoverOutTimeout.current);
      clearTimeout(hoverInTimeout.current);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isMobileMenuOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [isDesktop]);

  const setMenu = (index: number, isFocused?: boolean) => {
    clearTimeout(hoverOutTimeout.current);
    hoverInTimeout.current = setTimeout(
      () => {
        setActiveIndex(index);
      },
      isFocused ? 0 : HOVER_ENTRY_DURATION
    );
  };

  const resetMenu = (isFocused?: boolean) => {
    clearTimeout(hoverInTimeout.current);
    hoverOutTimeout.current = setTimeout(
      () => {
        setActiveIndex(-1);
      },
      isFocused ? 0 : HOVER_EXIT_DURATION
    );
  };

  const transition = useTransition(isMobileMenuOpen, {
    from: { opacity: 0, x: "-100%" },
    enter: { opacity: 1, x: "0" },
    leave: { opacity: 0, x: "100%" }
  });

  return {
    hoverInTimeout,
    hoverOutTimeout,
    activeIndex,
    setActiveIndex,
    setMenu,
    resetMenu,
    isDesktop,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    transition
  };
}

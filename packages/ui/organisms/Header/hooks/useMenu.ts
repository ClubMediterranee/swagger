import { useDevice } from "@clubmed/trident-ui/contexts/Device";
import { useTransition } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

import { HOVER_ENTRY_DURATION, HOVER_EXIT_DURATION } from "../Header";

export function useMenu() {
  const hoverInTimeout = useRef<ReturnType<typeof setTimeout>>();
  const hoverOutTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [activeIndex, setActiveIndex] = useState(-1);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [isDesktop]);

  const transition = useTransition(isMobileMenuOpen, {
    from: { opacity: 0, x: "-100%" },
    enter: { opacity: 1, x: "0" },
    leave: { opacity: 0, x: "100%" }
  });

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

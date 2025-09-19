import { type RefObject, useEffect } from "react";

type EventType = "mousedown" | "mouseup" | "touchstart" | "touchend" | "focusin" | "focusout";

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: EventType = "mousedown"
): void {
  useEffect(() => {
    const handleClickOutsideWrapper = (event: MouseEvent | TouchEvent | FocusEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener(eventType, handleClickOutsideWrapper, { passive: true });
    return () => {
      document.removeEventListener(eventType, handleClickOutsideWrapper);
    };
  }, [handler, eventType, ref]);
}

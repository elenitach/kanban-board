import { useEffect, RefObject } from "react";

export const useClickOutside = (
  ref: RefObject<Element | null>,
  handler: () => void
) => {
  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        handler();
      }
    });
  }, [ref, handler]);
};

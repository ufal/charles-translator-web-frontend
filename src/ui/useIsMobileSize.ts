import { useState, useLayoutEffect } from "react";

export function getIsMobileSize(): boolean {
  // tablet and mobile
  return window.innerWidth < 750;
}

/**
 * Decides whether to use the mobile layout of the app, or the destop one.
 */
export function useIsMobileSize(): boolean {
  const [isMobileSize, setIsMobileSize] = useState<boolean>(
    getIsMobileSize()
  );
  
  useLayoutEffect(() => {
    function handleResize() {
      const isMobileSizeNow = getIsMobileSize();
      if (isMobileSizeNow !== isMobileSize) {
        setIsMobileSize(isMobileSizeNow);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileSize]);

  return isMobileSize;
}
import { useLayoutEffect, useState } from "react";

export function getCurrentHeight(): string {
  const visualHeight = window.visualViewport?.height;

  return (String(visualHeight) + "px") || "100dvh";
}

/**
 * Returns the `height` CSS property that should be set to a component
 * to take up 100% of the viewport height, when taking into account the
 * virtual keyboard.
 * 
 * https://rdavis.io/articles/dealing-with-the-visual-viewport
 */
export function useVisualHeight(): string {
  if (!window.visualViewport) {
    return "100dvh";
  }

  const [visualHeight, setVisualHeight] = useState<string>(
    getCurrentHeight()
  );
  
  useLayoutEffect(() => {
    function handleResize() {
      setVisualHeight(getCurrentHeight());
    }

    window.visualViewport!.addEventListener("resize", handleResize);
    return () => window.visualViewport!.removeEventListener("resize", handleResize);
  }, []);

  return visualHeight;
}
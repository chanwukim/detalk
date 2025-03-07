import { useEffect, useState } from "react";

const Breakpoint = {
  MOBILE: 768,
  TABLET: 1024,
} as const;

type ResponsiveType = "mobile" | "tablet" | "desktop";

export default function useResponsive() {
  const [screenType, setScreenType] = useState<ResponsiveType | undefined>(
    undefined,
  );

  useEffect(() => {
    // media query
    const mobileMql = window.matchMedia(
      `(max-width: ${Breakpoint.MOBILE - 1}px)`,
    );
    const tabletMql = window.matchMedia(
      `(min-width: ${Breakpoint.MOBILE}px) and (max-width: ${Breakpoint.TABLET - 1}px)`,
    );

    function getResponsiveType(): ResponsiveType {
      if (mobileMql.matches) {
        return "mobile";
      }
      if (tabletMql.matches) {
        return "tablet";
      }
      return "desktop";
    }

    function handleChange() {
      setScreenType(getResponsiveType());
    }

    // initial value
    handleChange();

    // event listener
    mobileMql.addEventListener("change", handleChange);
    tabletMql.addEventListener("change", handleChange);

    return () => {
      mobileMql.removeEventListener("change", handleChange);
      tabletMql.removeEventListener("change", handleChange);
    };
  }, []);

  const isMobile = screenType === "mobile";
  const isTablet = screenType === "tablet";
  const isDesktop = screenType === "desktop";

  return {
    screenType: screenType ?? "desktop",
    isMobile,
    isTablet,
    isDesktop,
  } as const;
}

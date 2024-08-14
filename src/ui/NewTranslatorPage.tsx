import { useIsMobileSize } from "./useIsMobileSize";
import { MobileTranslatorPage } from "./mobile/MobileTranslatorPage";
import { DesktopTranslatorPage } from "./desktop/DesktopTranslatorPage";

export function NewTranslatorPage() {
  const isMobileSize = useIsMobileSize();

  return isMobileSize ? (
    <MobileTranslatorPage />
  ) : (
    <DesktopTranslatorPage />
  )
}

import { IsoLanguage } from "../../translation/domain/IsoLanguage";

import britainFlag from "./britainFlag.png";
import czechFlag from "./czechFlag.png";
import defaultFlag from "./defaultFlag.png";
import franceFlag from "./franceFlag.png";
import germanFlag from "./germanFlag.png";
import indiaFlag from "./indiaFlag.png";
import polandFlag from "./polandFlag.png";
import russiaFlag from "./russiaFlag.png";
import ukraineFlag from "./ukraineFlag.png";
// import usaFlag from "./usaFlag.png";

export function getFlag(languageId: IsoLanguage): string {
  switch (languageId) {
      case "cs": return czechFlag;
      case "en": return britainFlag;
      case "fr": return franceFlag;
      case "de": return germanFlag;
      case "hi": return indiaFlag;
      case "pl": return polandFlag;
      case "ru": return russiaFlag;
      case "uk": return ukraineFlag;
      default: return defaultFlag;
  }
}

import { useEffect, useState } from "react";
import { Sheet, Typography, Box, IconButton, Input, Stack } from "@mui/joy";
import { MobileLanguageSwitcher } from "./MobileLanguageSwitcher";
import { SourceField } from "./SourceField";
import { useTranslationController } from "../TranslationController";
import { DEFAULT_SOURCE_INFO, SourceInfo } from "../SourceInfo";
import { DEFAULT_TARGET_INFO, TargetInfo } from "../TargetInfo";
import MicIcon from '@mui/icons-material/Mic';
import { useVisualHeight } from "../useVisualHeight";
import { UiInputMode } from "../UiInputMode";
import { DisplayArea } from "./DisplayArea";
import iconImage from "../../favicon/android-chrome-256x256.png"; // TODO: dedicated svg logo instead

export function MobileTranslatorPage() {
  const [sourceInfo, setSourceInfo] = useState<SourceInfo>(DEFAULT_SOURCE_INFO);
  const [targetInfo, setTargetInfo] = useState<TargetInfo>(DEFAULT_TARGET_INFO);
  
  const translationController = useTranslationController({
    targetInfo,
    setTargetInfo,
  });

  // fill the whole screen with the component
  const visualHeight = useVisualHeight();

  // disable body scroll when in mobile view
  useEffect(() => {
    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.overflow = "auto";
    };
  });

  return (
    <Stack direction="column" sx={{
      height: visualHeight,
      // boxSizing: "border-box",
      // border: "5px solid navy",
    }}>
      {/* Mobile App Bar */}
      <Sheet sx={{ padding: "10px" }}>
        <Stack direction="row" spacing={1}>
          <img
            height={40}
            alt="Charles Translator"
            src={iconImage}
          />
          <div style={{ flexGrow: "1" }}></div>
          <IconButton>
            <MicIcon />
          </IconButton>
          <IconButton>
            <MicIcon />
          </IconButton>
          <IconButton>
            <MicIcon />
          </IconButton>
        </Stack>
      </Sheet>

      {/* {visualHeight} */}

      {/* Display area */}
      <DisplayArea
        sourceInfo={sourceInfo}
        setSourceInfo={setSourceInfo}
        targetInfo={targetInfo}
        translationController={translationController}
      />

      {/* Language switcher */}
      <MobileLanguageSwitcher />

      {/* Input area */}
      {/* <Stack direction="row" justifyContent="center" spacing={1} sx={{
        padding: "30px",
        display: sourceInfo.uiInputMode === UiInputMode.None ? undefined : "none",
      }}>
        <IconButton
          variant="solid"
          color="primary"
          size="lg"
          sx={{ borderRadius: "50%" }}
        >
          <MicIcon />
        </IconButton>
      </Stack> */}
    </Stack>
  );
}
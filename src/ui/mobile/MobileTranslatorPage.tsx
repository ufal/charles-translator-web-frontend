import { useEffect, useRef, useState } from "react";
import { Sheet, Typography, Box, IconButton, Input, Stack } from "@mui/joy";
import { MobileLanguageSwitcher } from "./MobileLanguageSwitcher";
import { useTranslationController } from "../TranslationController";
import { DEFAULT_SOURCE_INFO, SourceInfo } from "../SourceInfo";
import { DEFAULT_TARGET_INFO, TargetInfo } from "../TargetInfo";
import { useVisualHeight } from "../useVisualHeight";
import { UiInputMode } from "./UiInputMode";
import { DisplayArea } from "./DisplayArea";
import { MobileAppBar } from "./MobileAppBar";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { MobileVirtualKeyboard } from "./MobileVirtualKeyboard/MobileVirtualKeyboard";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";
import { useUiInputModeController } from "./UiInputModeController";
import { MobileAsr } from "./MobileAsr/MobileAsr";

export function MobileTranslatorPage() {
  const sourceFieldRef = useRef<HTMLTextAreaElement | null>(null);

  const [sourceInfo, setSourceInfo] = useState<SourceInfo>(DEFAULT_SOURCE_INFO);
  const [targetInfo, setTargetInfo] = useState<TargetInfo>(DEFAULT_TARGET_INFO);

  const uiInputModeController = useUiInputModeController({ sourceFieldRef });
  const { uiInputMode, setUiInputMode } = uiInputModeController;

  const [isSubmittedView, setIsSubmittedView] = useState<boolean>(false);

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
      window.document.body.style.removeProperty("overflow");
    };
  });

  return (
    <Stack
      direction="column"
      sx={{
        height: visualHeight,
        // boxSizing: "border-box",
        // border: "5px solid navy",
      }}
    >
      {/* Mobile App Bar */}
      <MobileAppBar
        sourceInfo={sourceInfo}
        setSourceInfo={setSourceInfo}
        isSourceFieldEmpty={sourceInfo.text === ""}
        isSubmittedView={isSubmittedView}
      />

      {/* Display area */}
      <DisplayArea
        sourceFieldRef={sourceFieldRef}
        uiInputModeController={uiInputModeController}
        sourceInfo={sourceInfo}
        setSourceInfo={setSourceInfo}
        targetInfo={targetInfo}
        translationController={translationController}
        isSubmittedView={isSubmittedView}
        setIsSubmittedView={setIsSubmittedView}
      />

      {/* Language switcher */}
      <MobileLanguageSwitcher
        source={sourceInfo.language}
        target={targetInfo.language}
        onChangeSource={(newSource) =>
          setSourceInfo({
            ...sourceInfo,
            language: newSource,
          })
        }
        onChangeTarget={(newTarget) =>
          setTargetInfo({
            ...targetInfo,
            language: newTarget,
          })
        }
      />

      {/* Input area */}
      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        sx={{
          padding: "30px",
          display: uiInputMode === UiInputMode.None ? undefined : "none",
        }}
      >
        <IconButton
          variant="solid"
          color="primary"
          sx={{ borderRadius: "50%" }}
          onClick={() => setUiInputMode(UiInputMode.VirtualKeyboard)}
        >
          <KeyboardAltIcon />
        </IconButton>
        <IconButton
          variant="solid"
          color="primary"
          size="lg"
          sx={{ borderRadius: "50%" }}
          onClick={() => setUiInputMode(UiInputMode.ASR)}
        >
          <KeyboardVoiceIcon />
        </IconButton>
        <IconButton
          variant="solid"
          color="primary"
          sx={{ borderRadius: "50%" }}
          onClick={() => setUiInputMode(UiInputMode.UserAgentNative)}
        >
          <KeyboardIcon />
        </IconButton>
      </Stack>

      {uiInputMode === UiInputMode.VirtualKeyboard && (
        <MobileVirtualKeyboard
          sourceFieldRef={sourceFieldRef}
          sourceText={sourceInfo.text}
          setSourceText={(t) =>
            setSourceInfo({
              ...sourceInfo,
              text: t,
            })
          }
          sourceLanguage={sourceInfo.language}
        />
      )}

      {uiInputMode === UiInputMode.ASR && (
        <MobileAsr />
      )}
    </Stack>
  );
}

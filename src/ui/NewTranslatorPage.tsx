import { useState } from "react";
import { Box, Input, Button, Stack } from "@mui/joy";
import { SourceField } from "./mobile/SourceField";
import { DEFAULT_SOURCE_INFO, SourceInfo } from "./SourceInfo";
import DvrIcon from "@mui/icons-material/Dvr";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { UiInputMode } from "./UiInputMode";
import { TargetInfo, DEFAULT_TARGET_INFO } from "./TargetInfo";
import { useTranslationController } from "./TranslationController";
import { useIsMobileSize } from "./useIsMobileSize";
import { MobileTranslatorPage } from "./mobile/MobileTranslatorPage";
import { DesktopTranslatorPage } from "./desktop/DesktopTranslatorPage";

export function NewTranslatorPage() {
  const isMobileSize = useIsMobileSize();

  const [sourceInfo, setSourceInfo] = useState<SourceInfo>(DEFAULT_SOURCE_INFO);
  const [targetInfo, setTargetInfo] = useState<TargetInfo>(DEFAULT_TARGET_INFO);

  const translationController = useTranslationController({
    targetInfo,
    setTargetInfo,
  });

  function setInputMode(mode: UiInputMode) {
    setSourceInfo({
      ...sourceInfo,
      uiInputMode: mode,
    });
  }

  function appendRandomAsrWord() {
    setSourceInfo({
      ...sourceInfo,
      text: sourceInfo.text + " lorem",
    });
  }

  return isMobileSize ? (
    <MobileTranslatorPage />
  ) : (
    <DesktopTranslatorPage />
  )

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <h3>Display section</h3>

      <SourceField
        sourceInfo={sourceInfo}
        setSourceInfo={(s) => {
          setSourceInfo(s);
          translationController.requestTranslation(
            s.text, s.language, targetInfo.language, s.messageInputMethod
          );
        }}
      />

      <Input value={targetInfo.text} readOnly />
      <pre>Is Loading: {targetInfo.isLoading ? "true" : "false"}</pre>
      <pre>Error: {targetInfo.loadingError || "null"}</pre>

      <p>TODO: transliteration</p>

      <p>TODO: copy-paste, clearing, settings, starring</p>

      <h3>Language switcher</h3>

      <p>TODO...</p>

      <h3>Input section</h3>

      <div
        style={{
          display:
            sourceInfo.uiInputMode === UiInputMode.None ? "block" : "none",
          padding: "10px",
        }}
      >
        <p>Select input method (or click the input field):</p>
        <Stack direction="row" spacing={1}>
          <Button
            startDecorator={<KeyboardVoiceIcon />}
            onClick={() => setInputMode(UiInputMode.ASR)}
          >
            ASR
          </Button>
          <Button
            startDecorator={<KeyboardIcon />}
            onClick={() => setInputMode(UiInputMode.VirtualKeyboard)}
          >
            Virtual Keyboard
          </Button>
          <Button
            startDecorator={<DvrIcon />}
            onClick={() => setInputMode(UiInputMode.AudioCapture)}
          >
            Capture
          </Button>
        </Stack>
      </div>

      <div
        style={{
          display:
            sourceInfo.uiInputMode === UiInputMode.ASR ? "block" : "none",
          padding: "10px",
        }}
      >
        <p>ASR:</p>
        <Stack direction="row" spacing={1}>
          <Button onClick={() => setInputMode(UiInputMode.None)}>Stop</Button>
          <Button onClick={() => appendRandomAsrWord()}>Generate word</Button>
        </Stack>
      </div>

      <div
        style={{
          display:
            sourceInfo.uiInputMode === UiInputMode.UserAgentNative
              ? "block"
              : "none",
          padding: "10px",
        }}
      >
        <p>OS Keyboard</p>
      </div>
    </Box>
  );
}

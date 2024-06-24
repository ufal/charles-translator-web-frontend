import { Box, IconButton, Typography } from "@mui/joy";
import { SourceField } from "./SourceField";
import { SourceInfo } from "../SourceInfo";
import { TargetInfo } from "../TargetInfo";
import { TranslationController } from "../TranslationController";
import { DisplayAreaSeparator } from "./DisplayAreaSeparator";
import { UiInputMode } from "../UiInputMode";

export interface DisplayAreaProps {
  readonly sourceInfo: SourceInfo;
  readonly setSourceInfo: (s: SourceInfo) => void;
  readonly targetInfo: TargetInfo;
  readonly translationController: TranslationController;
}

export function DisplayArea(props: DisplayAreaProps) {
  const {
    sourceInfo,
    setSourceInfo,
    targetInfo,
    translationController,
  } = props;

  return (
    <Box sx={{
      padding: "10px",
      flexGrow: "1", // pushes elements below to the bottom of the screen
    }}>
      <SourceField
        sourceInfo={sourceInfo}
        setSourceInfo={(s) => {
          setSourceInfo(s);
          translationController.requestTranslation(
            s.text, s.language, targetInfo.language, s.messageInputMethod
          );
        }}
      />

      <DisplayAreaSeparator
        isVisible={sourceInfo.text !== ""}
        isClickable={sourceInfo.uiInputMode === UiInputMode.UserAgentNative}
        isLoading={targetInfo.isLoading}
        onClick={() => {}}
      />
      
      <Typography level="body-lg">{targetInfo.text}</Typography>
      
      <pre>Error: {targetInfo.loadingError || "null"}</pre>
    </Box>
  );
}
import { Box, Button, IconButton, Stack, Typography } from "@mui/joy";
import { SourceField } from "./SourceField";
import { SourceInfo } from "../SourceInfo";
import { TargetInfo } from "../TargetInfo";
import { TranslationController } from "../TranslationController";
import { DisplayAreaSeparator } from "./DisplayAreaSeparator";
import { UiInputMode } from "./UiInputMode";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { MobileTranslationError } from "./MobileTranslationError";
import { MutableRefObject } from "react";
import { UiInputModeController } from "./UiInputModeController";

export interface DisplayAreaProps {
  readonly sourceFieldRef: MutableRefObject<HTMLTextAreaElement | null>;
  readonly uiInputModeController: UiInputModeController;
  readonly sourceInfo: SourceInfo;
  readonly setSourceInfo: (s: SourceInfo) => void;
  readonly targetInfo: TargetInfo;
  readonly translationController: TranslationController;
  readonly isSubmittedView: boolean;
  readonly setIsSubmittedView: (b: boolean) => void;
}

export function DisplayArea(props: DisplayAreaProps) {
  const { sourceInfo, setSourceInfo, targetInfo, translationController } =
    props;

  return (
    <Box
      sx={{
        padding: "10px",
        flexGrow: "1", // pushes elements below to the bottom of the screen
      }}
    >
      <SourceField
        sourceFieldRef={props.sourceFieldRef}
        uiInputModeController={props.uiInputModeController}
        sourceInfo={sourceInfo}
        setSourceInfo={(s) => {
          setSourceInfo(s);
          translationController.requestTranslation(
            s.text,
            s.language,
            targetInfo.language,
            s.messageInputMethod,
          );
        }}
      />

      {/* Dummy transliteration */}
      {props.isSubmittedView && (
        <Typography level="body-sm">{sourceInfo.text.toUpperCase()}</Typography>
      )}

      {sourceInfo.text === "" && (
        <Button
          color="primary"
          variant="soft"
          startDecorator={<ContentPasteIcon />}
        >
          Paste
        </Button>
      )}

      <DisplayAreaSeparator
        isVisible={sourceInfo.text !== ""}
        isClickable={!props.isSubmittedView}
        isLoading={targetInfo.isLoading}
        onClick={() => props.setIsSubmittedView(true)}
      />

      <Typography level="body-lg">{targetInfo.text}</Typography>

      {/* Dummy transliteration */}
      {props.isSubmittedView && (
        <Typography level="body-sm">{targetInfo.text.toUpperCase()}</Typography>
      )}

      {/* Dummy transliteration */}
      {props.isSubmittedView && (
        <Stack direction="row" spacing={1}>
          <IconButton>
            <ContentCopyIcon />
          </IconButton>
        </Stack>
      )}

      <MobileTranslationError error={targetInfo.loadingError} />
    </Box>
  );
}

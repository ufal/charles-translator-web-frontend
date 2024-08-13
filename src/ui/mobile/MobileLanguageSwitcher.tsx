import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Radio,
  Sheet,
  Stack,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/joy";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { IsoLanguage } from "../../translation/domain/IsoLanguage";
import { translationGraph } from "../../translation";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type ModalState = "closed" | "source" | "target";

export interface MobileLanguageSwitcherProps {
  readonly source: IsoLanguage;
  readonly target: IsoLanguage;
  readonly onChangeSource: (s: IsoLanguage) => void;
  readonly onChangeTarget: (s: IsoLanguage) => void;
}

export function MobileLanguageSwitcher(props: MobileLanguageSwitcherProps) {
  const { t } = useTranslation("language");

  // get languages for the two language switchers
  const sourceLanguages = translationGraph.getSourceLanguages();
  const targetLanguages = translationGraph.getReachableLanguagesFrom(
    props.source,
  );

  /**
   * Is true when the current language pair can be swapped
   */
  const canSwapLanguages = translationGraph
    .getReachableLanguagesFrom(props.target)
    .includes(props.source);

  // modal openning logic
  const [modalState, setModalState] = useState<ModalState>("closed");
  const modalLanguages =
    modalState == "source" ? sourceLanguages : targetLanguages;

  // TODO: the swapping and switching logic is a rough placeholder,
  // the true behavior is present in the "form.tsx" file and handles
  // an array of edgecases that need to be handled here as well

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          padding: "0 10px 10px 10px",
        }}
      >
        <Button
          variant="soft"
          fullWidth
          onClick={() => setModalState("source")}
        >
          {t(props.source)}
        </Button>
        <IconButton
          variant="plain"
          disabled={!canSwapLanguages}
          onClick={() => {
            props.onChangeSource(props.target);
            props.onChangeTarget(props.source);
          }}
        >
          <SwapHorizIcon />
        </IconButton>
        <Button
          variant="soft"
          fullWidth
          onClick={() => setModalState("target")}
        >
          {t(props.target)}
        </Button>
      </Stack>

      <Modal
        open={modalState !== "closed"}
        onClose={() => setModalState("closed")}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalOverflow>
          <ModalDialog layout="fullscreen">
            <ModalClose />
            <Typography level="h2">
              Select
              {modalState == "source" ? " source " : " target "}
              language
            </Typography>
            <FormControl>
              <FormLabel>
                {modalState == "source" ? "Source " : "Target "}
                Languages
              </FormLabel>
              <RadioGroup
                name="mobile-language-switcher-dialog-radio-group"
                value={modalState == "source" ? props.source : props.target}
                onChange={(e) => {
                  if (modalState == "source") {
                    props.onChangeSource(e.target.value as IsoLanguage);
                  } else {
                    props.onChangeTarget(e.target.value as IsoLanguage);
                  }
                  setModalState("closed");
                }}
              >
                {modalLanguages.map((l) => (
                  <Radio key={l} label={l} value={l} variant="outlined" />
                ))}
              </RadioGroup>
            </FormControl>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </>
  );
}

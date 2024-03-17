import { useState } from "react";
import { useTranslation } from "react-i18next";
import { privacyPreferencesRepository } from "../persistence/PrivacyPreferencesRepository";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UiLanguageSwitcher from "./UiLanguageSwitcher";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// TODO: add privacy policy link

export function CookiesAndTermsDialog() {
  const { t } = useTranslation("cookiesAndTermsDialog");
  const privacyPreferences = privacyPreferencesRepository.load();

  const [isOpen, setOpen] = useState(
    // open automatically if preferences do not exist yet
    privacyPreferences === null,
  );
  const [isDataChecked, setDataChecked] = useState(
    privacyPreferences?.allowsDataCollection ?? true,
  );
  const [isCookiesChecked, setCookiesChecked] = useState(
    privacyPreferences?.allowsCookies ?? true,
  );

  const rejectAllClicked = () => {
    privacyPreferencesRepository.store({
      allowsDataCollection: false,
      allowsCookies: false,
    });
    setOpen(false);
  };

  const acceptSelectedClicked = () => {
    privacyPreferencesRepository.store({
      allowsDataCollection: isDataChecked,
      allowsCookies: isCookiesChecked,
    });
    setOpen(false);
  };

  // An optimization: when there is no dialog to be shown,
  // it does not need to even exist.
  if (!isOpen) {
    return <></>;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}} // Can be closed ONLY by the two action buttons below
      scroll="paper" // scroll contents, not the page
    >
      <DialogTitle
        sx={{
          // So that the title text does not flow over the language switcher
          pr: 24 + 80 + 16 + "px",
        }}
      >
        {t("title")}
        <UiLanguageSwitcher
          sx={{
            position: "absolute",
            right: "24px",
            top: "16px",
          }}
        />
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" color="text.primary" gutterBottom>
          {t("introduction")}
        </Typography>

        <FormGroup>
          <FormControlLabel
            sx={{ alignItems: "flex-start" }}
            control={
              <Checkbox
                size="small"
                sx={{ marginTop: -1 }}
                checked={isDataChecked}
                onChange={(e) => setDataChecked(!isDataChecked)}
              />
            }
            slotProps={{
              typography: {
                variant: "body2",
                color: "text.primary",
                gutterBottom: true,
              },
            }}
            label={t("allowDataCollection")}
          />
          <FormControlLabel
            sx={{ alignItems: "flex-start" }}
            control={
              <Checkbox
                size="small"
                sx={{ marginTop: -1 }}
                checked={isCookiesChecked}
                onChange={(e) => setCookiesChecked(!isCookiesChecked)}
              />
            }
            slotProps={{
              typography: {
                variant: "body2",
                color: "text.primary",
                gutterBottom: true,
              },
            }}
            label={t("allowCookies")}
          />
        </FormGroup>

        <Typography variant="body1" color="text.primary" gutterBottom>
          {t("decisionCanBeChanged")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {t("nonCommercialUseOnly")}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ pt: 2 }}
        >
          <Link
            href="https://lindat.mff.cuni.cz/en/terms-of-use"
            color="inherit"
            underline="hover"
          >
            {t("termsOfUse")}
          </Link>
          <span style={{ padding: "0 8px" }}>•</span>
          <Link
            href="mailto:lindat-help@ufal.mff.cuni.cz"
            color="inherit"
            underline="hover"
          >
            lindat-help@ufal.mff.cuni.cz
          </Link>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={rejectAllClicked}>
          {t("rejectAll")}
        </Button>
        <Button variant="contained" onClick={acceptSelectedClicked}>
          {t("acceptSelected")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

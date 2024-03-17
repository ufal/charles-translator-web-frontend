import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  TextField,
  Tooltip,
  IconButton,
  FormGroup,
  Typography,
  Link,
  Switch,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Settings as SettingsIcon } from "@mui/icons-material";
import UiLanguageSwitcher from "../ui/UiLanguageSwitcher";
import { privacyPreferencesRepository } from "../persistence/PrivacyPreferencesRepository";
import { userPreferencesRepository } from "../persistence/UserPreferencesRepository";
import DeleteIcon from '@mui/icons-material/Delete';

export function SettingsDialogButton({ onClick }) {
  const { t } = useTranslation("settingsDialog");

  return (
    <Tooltip title={t("iconButtonTooltip")}>
      <IconButton
        size="small"
        edge="start"
        sx={{ mr: 1 }}
        onClick={onClick}
      >
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  )
}

export interface SettingsDialogProps {
  readonly isOpen: boolean;
  readonly onClose?: () => void;
}

export function SettingsDialog(props: SettingsDialogProps) {
  const { t } = useTranslation("settingsDialog");
  
  const [organizationName, setOrganizationName] = useState<string>("");
  const [allowsLocalHistory, setAllowsLocalHistory] = useState<boolean>(false);
  const [isDeveloperMode, setIsDeveloperMode] = useState<boolean>(false);
  const [allowsDataCollection, setAllowsDataCollection] = useState<boolean>(false);
  const [allowsCookies, setAllowsCookies] = useState<boolean>(false);

  function loadValues() {
    const userPreferences = userPreferencesRepository.load();
    const privacyPreferences = privacyPreferencesRepository.load();

    setOrganizationName(userPreferences.organizationName);
    setAllowsLocalHistory(userPreferences.allowsLocalHistory);
    setIsDeveloperMode(userPreferences.isDeveloperMode);
    setAllowsDataCollection(privacyPreferences?.allowsDataCollection ?? true);
    setAllowsCookies(privacyPreferences?.allowsCookies ?? true);
  }

  function storeValues() {
    userPreferencesRepository.store({
      organizationName: organizationName,
      allowsLocalHistory: allowsLocalHistory,
      isDeveloperMode: isDeveloperMode,
    });
    privacyPreferencesRepository.store({
      allowsDataCollection: allowsDataCollection,
      allowsCookies: allowsCookies,
    });
  }

  function handleClose() {
    props.onClose?.();
  }

  function handleSave() {
    storeValues();
    props.onClose?.();
  }

  function eraseAppData() {
    if (!confirm(t("eraseAppDataConfirmation"))) {
      return;
    }

    // erase all data and reload page
    window.localStorage.clear();
    window.location.reload();
  }

  // load on open
  useEffect(() => {
    if (props.isOpen) {
      loadValues();
    }
  }, [props.isOpen]);
  
  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
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

        <Typography variant="h5" color="text.primary" gutterBottom>
          {t("privacySection")}
        </Typography>

        <FormGroup>
          <FormControlLabel
            sx={{ alignItems: "flex-start" }}
            control={
              <Checkbox
                size="small"
                sx={{ marginTop: -1 }}
                checked={allowsDataCollection}
                onChange={() => setAllowsDataCollection(!allowsDataCollection)}
              />
            }
            slotProps={{
              typography: {
                variant: "body2",
                color: "text.primary",
                gutterBottom: true,
              },
            }}
            label={t("allowsDataCollection")}
          />
          <FormControlLabel
            sx={{ alignItems: "flex-start" }}
            control={
              <Checkbox
                size="small"
                sx={{ marginTop: -1 }}
                checked={allowsCookies}
                onChange={() => setAllowsCookies(!allowsCookies)}
              />
            }
            slotProps={{
              typography: {
                variant: "body2",
                color: "text.primary",
                gutterBottom: true,
              },
            }}
            label={t("allowsCookies")}
          />
          <FormControlLabel
            sx={{ alignItems: "flex-start" }}
            control={
              <Checkbox
                size="small"
                sx={{ marginTop: -1 }}
                checked={allowsLocalHistory}
                onChange={() => setAllowsLocalHistory(!allowsLocalHistory)}
              />
            }
            slotProps={{
              typography: {
                variant: "body2",
                color: "text.primary",
                gutterBottom: true,
              },
            }}
            label={t("allowsLocalHistory")}
          />
        </FormGroup>

        {/* TODO: add privacy policy (and cookie) here */}

        <Typography variant="h5" color="text.primary" gutterBottom sx={{ mt: 2 }}>
          {t("commercialUseSection")}
        </Typography>

        <FormGroup sx={{ mb: 1 }}>
          <TextField
            fullWidth
            label={t("organizationName")}
            size="small"
            variant="outlined"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />
        </FormGroup>

        <Typography variant="body1" color="text.primary" gutterBottom>
          {t("nonCommercialUseOnly")}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
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

        <Typography variant="h5" color="text.primary" gutterBottom sx={{ mt: 2 }}>
          {t("advancedSection")}
        </Typography>

        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isDeveloperMode}
                onChange={() => setIsDeveloperMode(!isDeveloperMode)}
              />
            }
            label={t("developerMode")}
          />
        </FormGroup>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {t("developerModeNotice")}
        </Typography>

        <FormGroup sx={{ alignContent: "start", pt: 2, pb: 1 }}>
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => eraseAppData()}
          >
            {t("eraseAppData")}
          </Button>
        </FormGroup>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {t("eraseAppDataNotice")}
        </Typography>

      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          {t("close")}
        </Button>
        <Button variant="contained" onClick={handleSave}>
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

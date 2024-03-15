import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import LanguageIcon from "@mui/icons-material/Language";

const LANGUAGE_LIST = [
  {
    // Czech
    isoCode: "cs",
    name: "Čeština",
  },
  {
    // English
    isoCode: "en",
    name: "English",
  },
  {
    // Ukrainian
    isoCode: "uk",
    name: "‪Українська‬",
  },
];

/**
 * A button that lets you change the language of the i18next library used
 * for the internationalization of the translator's UI
 */
export default function UiLanguageSwitcher({ sx }) {
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <>
      {/* The button that is always visible and opens the popover */}
      <Button
        variant="outlined"
        startIcon={<LanguageIcon />}
        onClick={handleClick}
        sx={sx}
      >
        {i18n.language}
      </Button>

      {/* The popover list that is dispayed over the button when clicked */}
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          {LANGUAGE_LIST.map((language) => (
            <ListItemButton
              key={language.isoCode}
              onClick={() => {
                i18n.changeLanguage(language.isoCode);
                handleClose();
              }}
            >
              <ListItemIcon>
                {language.isoCode === i18n.language && <CheckIcon />}
              </ListItemIcon>
              <ListItemText primary={language.name} />
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
}

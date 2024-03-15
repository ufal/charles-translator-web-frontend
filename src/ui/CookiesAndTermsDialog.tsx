import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UiLanguageSwitcher from "./UiLanguageSwitcher";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// TODO: add privacy policy link

export default function CookiesAndTermsDialog() {
  const { t } = useTranslation("cookiesAndTermsDialog");

  const [isOpen, setOpen] = useState(true);
  const [isDataChecked, setDataChecked] = useState(true);
  const [isCookiesChecked, setCookiesChecked] = useState(true);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const rejectAllClicked = () => {
    setOpen(false);
  };

  const acceptSelectedClicked = () => {
    setOpen(false);
    console.log(isDataChecked, isCookiesChecked)
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);

  return (
    <>
      <Button onClick={handleClickOpen()}>OPEN</Button>
      <Dialog
        open={isOpen}
        onClose={() => {}} // Can be closed ONLY by the two action buttons below
        scroll="paper"
      >
        <DialogTitle
          sx={{
            // So that the title text does not flow over the language switcher
            pr: (24 + 80 + 16) + "px"
          }}
        >
          Než budete pokračovat
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
            Anonymizovaná data o používání nám pomáhají zlepšovat překladač a lépe pochopit jeho využití.
          </Typography>

          <FormGroup>
            <FormControlLabel
              sx={{ alignItems: 'flex-start' }}
              control={
                <Checkbox
                  size="small"
                  sx={{ marginTop: -1 }}
                  checked={isDataChecked}
                  onChange={(e) => setDataChecked(!isDataChecked)}
                />
              }
              slotProps={{ typography: { variant: "body2", color: "text.primary", gutterBottom: true } }}
              label="Souhlasím s tím, aby Ústav formální a aplikované lingvistiky MFF UK ukládal vstupy a výstupy z překladače."
            />
            <FormControlLabel
              sx={{ alignItems: 'flex-start' }}
              control={
                <Checkbox
                  size="small"
                  sx={{ marginTop: -1 }}
                  checked={isCookiesChecked}
                  onChange={(e) => setCookiesChecked(!isCookiesChecked)}
                />
              }
              slotProps={{ typography: { variant: "body2", color: "text.primary", gutterBottom: true } }}
              label="Souhlasím s použitím cookies pro účely měření návštevnosti a zlepšování webové aplikace."
            />
          </FormGroup>

          <Typography variant="body1" color="text.primary" gutterBottom>
            Svoje rozhodnutí můžete kdykoliv změnit v nastavení aplikace.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Služby překladače jsou určené pouze pro nekomerční použití.
            V případě zájmu o komerční využití nebo využití přes API nás
            kontaktujte.
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
            >Podmínky používání</Link>
            <span style={{padding: "0 8px"}}>•</span>
            <Link
              href="mailto:lindat-help@ufal.mff.cuni.cz"
              color="inherit"
              underline="hover"
            >lindat-help@ufal.mff.cuni.cz</Link>
          </Typography>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={rejectAllClicked}>
            Odmítnout vše
          </Button>
          <Button variant="contained" onClick={acceptSelectedClicked}>
            Přijmout vybrané
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

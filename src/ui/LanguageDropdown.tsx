import { IsoLanguage } from "../translation/domain/IsoLanguage";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getFlag } from "../img/flags";

import styles from "./LanguageDropdown.module.scss";

export type OnChangeEvent = (value: IsoLanguage) => void;

export interface LanguageDropdownProps {
  /**
   * The selected language to display
   */
  readonly value: IsoLanguage;

  /**
   * All the languages to let the user choose from
   */
  readonly languages: IsoLanguage[];

  /**
   * Event that fires whenever the selected language is changed
   */
  readonly onChange: OnChangeEvent;
}

/**
 * Dropdown button that lets you select the source or target language
 * for the translation.
 */
export default function LanguageDropdown(props: LanguageDropdownProps) {
  const { t } = useTranslation("language");

  const handleChange = (e: SelectChangeEvent<IsoLanguage>) => {
    const selectedLanguage = e.target.value as IsoLanguage;
    props.onChange(selectedLanguage);
  };

  return (
    <div className={styles.languageContainer}>
      <img
        width={30}
        height={30}
        alt={props.value}
        src={getFlag(props.value)}
      />
      <Select
        className={styles.languageName}
        variant="standard"
        disableUnderline
        value={props.value}
        onChange={handleChange}
      >
        {props.languages.map((language) => (
          <MenuItem key={language} value={language}>
            {t(language)}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

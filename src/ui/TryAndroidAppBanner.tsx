import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton, Tooltip } from '@mui/material'
import {
  Close as CloseIcon,
  PhoneAndroid as PhoneAndroidIcon,
} from '@mui/icons-material'
import styles from './TryAndroidAppBanner.module.scss'

// TODO: This component is ugly. It's the original code and has just been
// isolated into a component. Needs re-thinking, re-design and refactor.
// It's hard to test, hadn't I read the code, would have never known about it.

const androidPhoneSuspected = /(android)/i.test(navigator.userAgent);
// const androidPhoneSuspected = true; // so far the best way how to test

export default function TryAndroidAppBanner() {
  const { t } = useTranslation()

  const [tryAndroidApp, setTryAndroidApp] = useState(androidPhoneSuspected)

  if (!tryAndroidApp) {
    return <></>;
  }

  return (
    <div className={styles.tryAndroidApp}>
      <a href="https://play.google.com/store/apps/details?id=cz.cuni.mff.ufal.translator">
        <PhoneAndroidIcon /> {t("layout:tryOurAndroidApp")}
      </a>
      <Tooltip title={t("common:close")}>
        <IconButton onClick={() => setTryAndroidApp(false)}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

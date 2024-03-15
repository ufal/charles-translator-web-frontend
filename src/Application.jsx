import CssBaseline from '@mui/material/CssBaseline'
import Form from "./components/form";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import CookiesAndTermsDialog from "./ui/CookiesAndTermsDialog";
import TryAndroidAppBanner from "./ui/TryAndroidAppBanner";
import { AppBar, Toolbar } from '@mui/material'
import AboutUsDialog from './components/AboutUsDialog'
import SettingsDialog from './components/SettingsDialog'
import logo from './img/logo.svg'

import styles from "./Application.module.scss";

export function Application() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CookiesAndTermsDialog/>
      
      <div className={styles.container}>

        <AppBar position="static" className={styles.header} elevation={2}>
          <Toolbar className={styles.toolbar}>
            <img width={230} height={70} alt="Charles Translator" src={logo} className={styles.logo} />
            <div style={{ flexGrow: 1 }}></div>
            <AboutUsDialog />
            <SettingsDialog />
          </Toolbar>
        </AppBar>
        <TryAndroidAppBanner/>

        <Form />

        <div className={styles.footer}>
          THE LINDAT/CLARIAH-CZ PROJECT (LM2018101; formerly LM2010013, LM2015071) IS FULLY SUPPORTED BY THE
          MINISTRY OF EDUCATION, SPORTS AND YOUTH OF THE CZECH REPUBLIC UNDER THE PROGRAMME LM OF LARGE
          INFRASTRUCTURES
        </div>

      </div>
    </ThemeProvider>
  );
}

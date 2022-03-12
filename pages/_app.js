// import layout  components form components folder
import Layout from "../src/components/layout";
import { blue } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      primary: blue,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

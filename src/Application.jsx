import Layout from "./components/layout";
import Form from "./components/form";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/*
  THEME COLORS
  ------------

  #f9f9f9 - Appbar Gray
  #d22d40 - Red logo text color (the primary color)
  #d60000 - "This version is not public" bar red color (danger color)
*/

export function Application() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#d22d40",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Form />
      </Layout>
    </ThemeProvider>
  );
}

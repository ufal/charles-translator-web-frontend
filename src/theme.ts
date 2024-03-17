import { createTheme } from "@mui/material/styles";

/*
  THEME COLORS
  ------------

  #f9f9f9 - Appbar Gray
  #d22d40 - Red logo text color (the primary color)
  #d60000 - "This version is not public" bar red color (danger color)
*/

export const theme = createTheme({
  palette: {
    primary: {
      main: "#d22d40",
    },
    error: {
      main: "#9b1b2a",
    },
  },
});

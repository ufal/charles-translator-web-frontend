import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

export function Application() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </ThemeProvider>
  );
}

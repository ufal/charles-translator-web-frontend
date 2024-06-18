import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";

// NOTE: Using both MUI Material and MUI Joy libraries:
// https://mui.com/joy-ui/integrations/material-ui/

const materialTheme = materialExtendTheme(theme);

export function Application() {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />

        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

/**
 * Root for all legal text pages
 */
export function LegalRoot() {
  return (
    <Box sx={{ margin: "50px auto", padding: "0 20px", maxWidth: "800px" }}>
      <Outlet />
    </Box>
  );
}

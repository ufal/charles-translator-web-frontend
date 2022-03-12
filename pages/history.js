import React from "react";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { History as HistoryIcon } from "@mui/icons-material";

function history() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ borderRadius: "50px", border: "1px solid grey" }}>
        <IconButton aria-label="history" size="large">
          <HistoryIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Typography variant="body2" gutterBottom sx={{ color: "gray" }}>
        History
      </Typography>
    </Box>
  );
}

export default history;

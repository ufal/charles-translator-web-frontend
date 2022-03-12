import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { AboutUsConst } from "../constants/about-us-constsant";
import Divider from "@mui/material/Divider";

export default function AboutUs({ handleChange }) {
  return (
    <Box component="span" sx={{ p: 2 }}>
      <h2>About us</h2>
      <p>Something about us...</p>
      <FormControlLabel
        control={<Checkbox onChange={handleChange} />}
        label={AboutUsConst.checkBoxLabel}
      />
      <Divider sx={{ marginTop: 2 }}></Divider>
    </Box>
  );
}

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
      <p><b>Front-end created by:</b></p>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/barborastrihova/" target="_blank">
            Barbora Strihová,
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/ivan-lysianok/" target="_blank">Ivan Lysianok,</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/fogelman/" target="_blank"> Michal Fogelman,</a>
        </li>
        <li>
          <a href="https://github.com/janmarek" target="_blank">Jan Marek,</a>
        </li>
        <li>
          <a href="https://obchodniuspech.cz/" target="_blank">Michal Pešat</a>
        </li>
      </ul>
      <Divider sx={{ marginTop: 2 }}></Divider>
      <p><b>Privacy settings</b></p>
      <FormControlLabel
        control={<Checkbox onChange={handleChange} />}
        label={AboutUsConst.checkBoxLabel}
      />
    </Box>
  );
}

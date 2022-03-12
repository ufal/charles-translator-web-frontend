import { TextField, IconButton } from "@mui/material";
import styled from "styled-components";
import { SwapVert } from "@mui/icons-material";
import React from "react";
import { headerHeight } from "./variables";

const Grid = styled.div`
  display: grid;
  height: calc(100% - ${headerHeight});
  grid-gap: 4px;
  @media (min-width: 1200px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 40px 1fr;
    margin: 12px;
  }
  @media (max-width: 1200px) {
    grid-template-rows: 1fr 40px 1fr;
  }
`;

const SwitchButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  align-self: center;
  justify-self: center;
  @media (min-width: 1200px) {
    transform: rotate(90deg);
  }
`;

const fieldStyleOverride = {
  "& .MuiInputBase-root": {
    height: "100%",
  },
};

function Form() {
  return (
    <Grid>
      <TextField
        id="source"
        label="Outlined"
        variant="filled"
        multiline
        sx={fieldStyleOverride}
      />

      <SwitchButtonWrapper>
        <IconButton aria-label="switch languages">
          <SwapVert />
        </IconButton>
      </SwitchButtonWrapper>

      <TextField
        id="destination"
        label="Outlined"
        variant="filled"
        multiline
        sx={fieldStyleOverride}
      />
    </Grid>
  );
}

export default Form;

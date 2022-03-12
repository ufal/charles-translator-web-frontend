import { TextField, IconButton } from "@mui/material";
import styled from "styled-components";
import { SwapVert } from "@mui/icons-material";
import React from "react";
import { headerHeight } from "./variables";
import { useState } from 'react';
import debounce from "debounce-promise";
import { translate } from "../api";

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

const debouncedTranslate = debounce(translate, 500)

const Form = () => {
  const [source, setSource] = useState("Як тут працює громадський транспорт?");
  const [translation, setTranslation] = useState('');

  function handleChangeSource(text) {
    setSource(text);
    debouncedTranslate({text, fromLanguage: 'uk', toLanguage: 'cs'}).then(response => {
      setTranslation(response.data.join(" "))
    })
  }

  return (
    <Grid>
      <TextField
        value={source}
        onChange={(e) => handleChangeSource(e.target.value)}
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
        value={translation}
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

import { TextField, IconButton, Box } from "@mui/material";
import styled from "styled-components";
import { SwapVert } from "@mui/icons-material";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import debounce from "debounce-promise";
import { translate } from "../../api";
import { getHistory, saveHistory } from "../../history";
import {
  transliterateCyrilToLatin,
  transliterateLatinToCyril,
} from "../transliterate";

const headerHeight = "50px";

const Grid = styled.div`
  display: grid;
  height: calc(100% - ${headerHeight});
  grid-gap: 4px;
  @media (min-width: 768px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 40px 1fr;
    margin: 12px;
  }
  @media (max-width: 768px) {
    grid-template-rows: 1fr 40px 1fr;
  }
`;

const SwitchButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  align-self: center;
  justify-self: center;
  @media (min-width: 768px) {
    transform: rotate(90deg);
  }
`;

const TranslationFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const fieldStyleOverride = {
  "& .MuiInputBase-root": {
    height: "100%",
  },
  "&": {
    flexGrow: 1,
  },
};

const debouncedTranslate = debounce(translate, 500);
const debouncedSave = debounce(saveHistory, 10000);

const languageUk = {
  id: "uk",
  name: "Український",
  transliterate: transliterateCyrilToLatin,
};

const languageCs = {
  id: "cs",
  name: "Česky",
  transliterate: transliterateLatinToCyril,
};

const Form = () => {
  const [source, setSource] = useState("Як тут працює громадський транспорт?");
  const [translation, setTranslation] = useState("");
  const [languages, setLanguages] = useState({
    source: languageUk,
    target: languageCs,
  });

  function handleChangeSource(text) {
    setSource(text);
    debouncedSave(languages.source, text).then(() =>
      console.log(getHistory(languages.source))
    );
    debouncedTranslate({
      text,
      fromLanguage: languages.source.id,
      toLanguage: languages.target.id,
    }).then(setTranslation);
  }

  const flipLanguages = useCallback(() => {
    setLanguages((state) => ({ source: state.target, target: state.source }));
    handleChangeSource(translation);
  }, [source, languages]);

  return (
    <Grid>
      <TranslationFieldContainer>
        <TextField
          value={source}
          onChange={(e) => handleChangeSource(e.target.value)}
          id="source"
          label={languages.source.name}
          variant="filled"
          multiline
          sx={fieldStyleOverride}
        />
        <Box mt={2} color="gray">
          {languages.source.transliterate(source)}
        </Box>
      </TranslationFieldContainer>

      <SwitchButtonWrapper>
        <IconButton aria-label="switch languages" onClick={flipLanguages}>
          <SwapVert />
        </IconButton>
      </SwitchButtonWrapper>

      <TranslationFieldContainer>
        <TextField
          value={translation}
          id="destination"
          label={languages.target.name}
          variant="filled"
          multiline
          sx={fieldStyleOverride}
        />
        <Box mt={2} color="gray">
          {languages.target.transliterate(translation)}
        </Box>
      </TranslationFieldContainer>
    </Grid>
  );
};

export default Form;

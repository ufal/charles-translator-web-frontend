import { TextField, IconButton, Tooltip, Box } from "@mui/material";
import styled from "styled-components";
import { SwapVert } from "@mui/icons-material";
import React, { useCallback, useState } from "react";
import debounce from "debounce-promise";
import { setAuthor, translate } from "../api";
import { getHistory, saveHistory } from "../history";
import {
  transliterateCyrilToLatin,
  transliterateLatinToCyril,
} from "../transliterate";
import { TranslationHistory } from "./TranslationHistory";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/router";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  @media (min-width: 769px) {
    margin: 12px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 8px;
  }
`;

const SwitchButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  align-self: center;
  justify-self: center;
  @media (min-width: 769px) {
    transform: rotate(90deg);
  }
  margin: 4px;
`;

const Transliteration = styled.p`
  color: grey;
  word-break: break-all;
  margin-bottom: 0;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 38px;
  align-items: center;
  flex-shrink: 0;
  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
`;

const TranslationFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 769px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

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
    debouncedSave(languages.source, text);
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

  const { query } = useRouter();

  if (query.author != null) {
    setAuthor(query.author);
  }

  return (
    <>
      <Flex>
        <TranslationFieldContainer>
          <LabelContainer>
            <Label for="destination">{languages.source.name}</Label>
            <TranslationHistory
              getHistory={() => getHistory(languages.source)}
              onSelect={setSource}
            />
          </LabelContainer>
          <TextField
            value={source}
            onChange={(e) => handleChangeSource(e.target.value)}
            id="source"
            variant="filled"
            multiline
            minRows={6}
            sx={{ "& .MuiInputBase-root": { paddingTop: "8px" } }}
          />
        </TranslationFieldContainer>

        <SwitchButtonWrapper>
          <Tooltip title="Swap languages">
            <IconButton
              aria-label="switch languages"
              onClick={flipLanguages}
              sx={{ padding: 0.5 }}
            >
              <SwapVert />
            </IconButton>
          </Tooltip>
        </SwitchButtonWrapper>
        <TranslationFieldContainer>
          <LabelContainer>
            <Label for="destination">{languages.target.name}</Label>
          </LabelContainer>
          <Box
            padding={2}
            sx={{
              backgroundColor: blue[50],
              borderRadius: 1,
              height: "100%",
              minHeight: "150px",
              marginBottom: "20px",
            }}
          >
            <Box>
              <strong>{translation}</strong>
            </Box>
            <Transliteration>
              {languages.target.transliterate(translation)}
            </Transliteration>
          </Box>
        </TranslationFieldContainer>
      </Flex>
    </>
  );
};

export default Form;

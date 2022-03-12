import { TextField, IconButton } from "@mui/material";
import styled from "styled-components";
import { SwapVert } from "@mui/icons-material";
import React, { useCallback, useState } from "react";
import debounce from "debounce-promise";
import { translate } from "../../api";
import { getHistory, saveHistory } from "../../history";
import {
  transliterateCyrilToLatin,
  transliterateLatinToCyril,
} from "../transliterate";
import { TranslationHistory } from "./TranslationHistory";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  @media (min-width: 768px) {
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
  @media (min-width: 768px) {
    transform: rotate(90deg);
  }
`;

const Transliteration = styled.span`
  color: grey;
  max-width: 100%;
  word-break: break-all;
  @media (min-width: 768px) {
    padding: 8px 0;
  }
  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

const Label = styled.label`
  font-size: 0.85rem;
  @media (max-width: 768px) {
    padding-left: 8px;
  }
`;

const TranslationFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
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
    <>
      <Flex>
        <TranslationFieldContainer>
          <Label htmlFor="destination">{languages.source.name}</Label>
          <TextField
            value={source}
            onChange={(e) => handleChangeSource(e.target.value)}
            id="source"
            variant="filled"
            multiline
            minRows={6}
            sx={{ "& .MuiInputBase-root": { paddingTop: "8px" } }}
          />
          <Transliteration>
            {languages.source.transliterate(source)}
          </Transliteration>
        </TranslationFieldContainer>

        <SwitchButtonWrapper>
          <IconButton aria-label="switch languages" onClick={flipLanguages}>
            <SwapVert />
          </IconButton>
        </SwitchButtonWrapper>

        <TranslationFieldContainer>
          <Label for="destination">{languages.target.name}</Label>
          <TextField
            value={translation}
            id="destination"
            variant="filled"
            multiline
            minRows={6}
            sx={{ "& .MuiInputBase-root": { paddingTop: "8px" } }}
          />
          <Transliteration>
            {languages.target.transliterate(translation)}
          </Transliteration>
        </TranslationFieldContainer>
      </Flex>
      <TranslationHistory
        history={[
          "fdsfds j sdkfhj dskjf dks fdskjh fkhjsd dgkdsjhf kjshfk sdghj  xckjvxc kvb xcjkbv hxcb",
          " fgfdsgfg",
          "fsdgfd",
        ]}
        onSelect={setSource}
      />
    </>
  );
};

export default Form;

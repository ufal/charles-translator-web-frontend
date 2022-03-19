import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  Clear as ClearIcon,
  SwapVert,
} from "@mui/icons-material";
import { blue } from "@mui/material/colors";

import styled from "styled-components";
import debounce from "debounce-promise";

import { TranslationHistory } from "./TranslationHistory";
import { translate } from "../api";
import { getHistory, saveHistory } from "../history";
import {
  transliterateCyrilToLatin,
  transliterateLatinToCyril,
} from "../transliterate";


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
  align-self: center;
  justify-self: center;
  @media (min-width: 769px) {
    transform: rotate(90deg);
  }
  margin: 4px;
`;

const Transliteration = styled.div`
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

const debouncedTranslate = debounce((setLoading, data) => {setLoading ; return translate(data) }, 500);
const debouncedSave = debounce(saveHistory, 10000);

const languageUk = {
  id: "uk",
  name: "Українською",
  transliterate: transliterateCyrilToLatin,
};

const languageCs = {
  id: "cs",
  name: "Česky",
  transliterate: transliterateLatinToCyril,
};

let loadingID = 0;

const Form = () => {
  const [source, setSource] = useState("");
  const [translation, setTranslation] = useState("");
  const [languages, setLanguages] = useState({
    source: languageUk,
    target: languageCs,
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const defaultSource = localStorage.getItem("lastTranslationSource") || "";
    if(defaultSource === languageCs.id)
      setLanguages({source: languageCs, target: languageUk });
    else
      setLanguages({source: languageUk, target: languageCs });
  }, [])

  function handleChangeSource(text, fromLanguage = languages.source.id, toLanguage = languages.target.id) {
    setSource(text);
    debouncedSave(languages.source, text);
    debouncedTranslate(setLoading(true), {
      text,
      fromLanguage,
      toLanguage,
      loadingID: ++loadingID,
    })
    .then((data) => {
      if(data.loadingID === loadingID){
        setLoading(false);
      }
      setTranslation(data.data); // TODO maybe add this into if block as well
    })
    .catch(() => {
      setLoading(false);
    })
  }

  const clearSource = () => {
    handleChangeSource("");
  }

  const flipLanguages = useCallback(() => {
    const oldSource = languages.source.id;
    const oldTarget = languages.target.id;
    setSource("");
    setTranslation("");
    setLanguages((state) => ({ source: state.target, target: state.source }));
    //handleChangeSource(source, oldTarget, oldSource);
    if(typeof window !== 'undefined'){
      window.localStorage.setItem(
        "lastTranslationSource",
        oldTarget
      );
    }
  }, [source, languages]);

  const { query } = useRouter();

  return (
    <>
      <Flex>
        <TranslationFieldContainer>
          <LabelContainer>
            <Label htmlFor="destination">{languages.source.name}</Label>
          </LabelContainer>
          <TextField
            value={source}
            onChange={(e) => handleChangeSource(e.target.value)}
            id="source"
            variant="filled"
            multiline
            minRows={6}
            sx={{
              "& .MuiInputBase-root": {
                paddingTop: "8px",
                paddingRight: "40px",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  { source.length !== 0 &&
                    <Tooltip title="Clear source text">
                      <IconButton 
                        onClick={clearSource}
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                      >
                        <ClearIcon/>
                      </IconButton>
                    </Tooltip>
                  }
                </InputAdornment>
              ),
            }}
          />
        </TranslationFieldContainer>

        <SwitchButtonWrapper>
          <Tooltip title="Swap languages">
            <IconButton
              aria-label="switch languages"
              onClick={flipLanguages}
              size="large"
            >
              <SwapVert fontSize="large" color="primary" />
            </IconButton>
          </Tooltip>
        </SwitchButtonWrapper>

        <TranslationFieldContainer>
          <LabelContainer>
            <Label htmlFor="destination">{languages.target.name}</Label>
            <button onClick={() => {navigator.clipboard.writeText(translation)}}>Copy translation</button>
            <TranslationHistory
              getHistory={() => getHistory(languages.source)}
              onSelect={handleChangeSource}
            />
          </LabelContainer>
          {loading && (<LinearProgress sx={{ top: "4px", marginTop: "-4px" }} />)}
          <Box
            padding={2}
            sx={{
              backgroundColor: blue[50],
              borderRadius: 1,
              height: "100%",
              minHeight: "157px",
              marginBottom: "20px",
              overflowWrap: "break-word",
            }}
          >
            <Box>
              <strong>{translation.split('\n').map((item, i) => (<p key={i} style={{margin: 0}}>{(item != "") ? item : <br />}</p>))}</strong>
            </Box>
            <Transliteration>
              {languages.target.transliterate(translation).split('\n').map((item, i) => (<p key={i} style={{margin: 0}}>{(item != "") ? item : <br />}</p>))}
            </Transliteration>
          </Box>
        </TranslationFieldContainer>
      </Flex>
    </>
  );
};

export default Form;

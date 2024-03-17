import { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react'
import debounce from 'debounce-promise'
import {
    Button,
    IconButton,
    InputAdornment,
    LinearProgress,
    TextField,
    Tooltip,
    Paper,
} from '@mui/material'
import {
    Clear as ClearIcon,
    ContentCopy as ContentCopyIcon,
    ErrorOutline as ErrorOutlineIcon,
    SwapVert,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { getHistory, saveHistory } from '../history'
import ASR from './asr'
import { TranslationHistory } from './TranslationHistory'
import { transliterateCyrilToLatin, transliterateLatinToCyril } from '../transliterate'
import LanguageDropdown from "../ui/LanguageDropdown";
import { PrivacyPreferencesRepository } from "../persistence/PrivacyPreferencesRepository";

import { translationGraph } from "../translation";
import { Message } from "../translation/domain/Message";
import { MessageInputMethod } from "../translation/domain/MessageInputMethod";
import { User } from "../translation/domain/User";
import { IsoLanguage } from "../translation/domain/IsoLanguage";
import { TranslationError } from '../translation/domain/TranslationError'

import styles from "./form.module.scss";

const TRANSLATION_DEBOUNCE_MS = 500;
const WRITE_HISTORY_DEBOUNCE_MS = 3_000;

// can be reused as a singleton, no need to be present inside the component
const privacyRepository = new PrivacyPreferencesRepository();

const Form = () => {
    const { t, i18n } = useTranslation();


    /////////////////////
    // Component state //
    /////////////////////

    // text in the input and output fields
    const [sourceText, setSourceText] = useState<string>("");
    const [targetText, setTargetText] = useState<string>("");

    // languages of the input and output text fields
    const [sourceLanguage, setSourceLanguage] = useState<IsoLanguage>("cs");
    const [targetLanguage, setTargetLanguage] = useState<IsoLanguage>("uk");

    // get languages for the two language switchers
    const sourceLanguages = translationGraph.getSourceLanguages();
    const targetLanguages = translationGraph.getReachableLanguagesFrom(
        sourceLanguage
    );

    const [lastInputMethod, setLastInputMethod] = useState<MessageInputMethod>(
        MessageInputMethod.Keyboard
    );
    const [asrIntermediateText, setAsrIntermediateText] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false)
    const [loadingError, setLoadingError] = useState<string | null>(null)


    ////////////////////////////
    // Performing translation //
    ////////////////////////////

    const lastSentRequestNumber = useRef<number>(0);
    const lastReceivedRequestNumber = useRef<number>(0);

    /**
     * Performs the actual translation request
     */
    const performTranslation = useCallback(async (
        text: string,
        from: IsoLanguage,
        to: IsoLanguage,
        inputMethod: MessageInputMethod
    ) => {
        // find the translation path
        const translationPath = translationGraph.getPath(from, to);
        if (translationPath === null) {
            setLoadingError("Cannot translate between these two languages.");
            setLoading(false);
            return;
        }

        // prepare message author metadata
        const author = new User(
            privacyRepository.loadPreferences()?.allowsDataCollection ?? false,
            "" // TODO: repository for organization name
        );
        
        // track the request in the context of other requests
        lastSentRequestNumber.current += 1;
        const requestNumber = lastSentRequestNumber.current;

        // do the API call(s)
        const result = await translationPath.executeOn(new Message({
            language: from,
            text: text,
            author: author,
            isOriginal: true, // i.e. is not a translated message
            originalInputMethod: inputMethod
        }));

        // do nothing if some later request finished faster than us
        // (we are obsolete in such a case)
        if (lastReceivedRequestNumber.current > requestNumber) {
            return;
        }
        lastReceivedRequestNumber.current = requestNumber;

        // hide the loader if we are the last sent out request
        // (i.e. there are no other pending requests)
        if (lastSentRequestNumber.current === requestNumber) {
            setLoading(false);
        }

        // process any errors
        if (result instanceof TranslationError) {
            setTargetText("");
            setLoadingError(result.message);
            console.error(result);
        }

        // process a successful response
        if (result instanceof Message) {
            setTargetText(result.text.trim());
            setLoadingError(null);
        }
    }, []);

    const performTranslationDebounced = useCallback<typeof performTranslation>(
        debounce(performTranslation, TRANSLATION_DEBOUNCE_MS), []
    );

    /**
     * Cancels all running requests and sets the target field to empty
     */
    function clearRequestPipeline() {
        lastSentRequestNumber.current += 1;
        lastReceivedRequestNumber.current = lastSentRequestNumber.current;
        setTargetText("");
        setLoadingError(null);
    }

    /**
     * Writes a message to the translation history storage
     */
    const writeHistory = useCallback((
        text: string,
        from: IsoLanguage,
        to: IsoLanguage
    ) => {
        // just a forward to the external function
        saveHistory(from, to, text);
    }, []);

    const writeHistoryDebounced = useCallback<typeof writeHistory>(
        debounce(writeHistory, WRITE_HISTORY_DEBOUNCE_MS), []
    );

    /**
     * Calling this function will schedule a translation request to be sent.
     * This method handles debouncing. Call it anytime the source text,
     * or the two languages are changed. You can call it multiple times.
     * It is automatically called from the method that change these individual
     * values, except for the raw state-setters by react.
     */
    function requestTranslation(
        text: string,
        from: IsoLanguage,
        to: IsoLanguage,
        inputMethod: MessageInputMethod
    ) {
        // remember the input method so that we have it in case of a re-try
        setLastInputMethod(inputMethod);

        // TODO: persist the translation language pair
        // window.localStorage.setItem('lastTranslationSource', fromLanguage.id)

        // show the loader as soon as someone starts typing
        setLoading(true);

        // trigger debounced actions in parallel
        performTranslationDebounced(text, from, to, inputMethod);
        writeHistoryDebounced(text, from, to);
    }


    //////////////////////
    // Focus management //
    //////////////////////

    const sourceFieldRef = useRef<HTMLElement | null>(null)

    function focusSourceField() {
        if (sourceFieldRef.current !== null)
            sourceFieldRef.current.focus()
    }

    // focus when the app first loads
    useEffect(() => {
        focusSourceField();
    }, [sourceFieldRef])

    ////////////////////////////
    // Handling input methods //
    ////////////////////////////

    /**
     * Handles the change event on the source text field
     */
    function handleSourceTextChange(
        e: ChangeEvent<HTMLInputElement>
    ) {
        let inputMethod = MessageInputMethod.Keyboard;
        const inputType = (e.nativeEvent as InputEvent).inputType;
        if (inputType === "insertFromPaste") {
            inputMethod = MessageInputMethod.Clipboard;
        }
        if (inputType === "insertFromPasteAsQuotation") {
            inputMethod = MessageInputMethod.Clipboard;
        }
        if (inputType === "insertFromDrop") {
            inputMethod = MessageInputMethod.Clipboard;
        }
        if (inputType === "insertFromYank") {
            inputMethod = MessageInputMethod.Clipboard;
        }

        const newSourceText = e.target.value;
        setSourceText(newSourceText);

        requestTranslation(
            newSourceText,
            sourceLanguage,
            targetLanguage,
            inputMethod
        );
    }

    function handleAsrIntermediateInput(text: string) {
        setAsrIntermediateText(text);
    }

    function handleAsrFinalInput(text: string) {
        // turn the ASR input into a sentence (capital + period)
        if (text !== "") {
            text = text.charAt(0).toLocaleUpperCase() + text.slice(1);
            text += '.';
        }

        // join it with the existing text
        if (sourceText !== "") {
            text = '\n' + text;
        }
        text = sourceText + text;

        // translate
        setSourceText(text);
        requestTranslation(
            text,
            sourceLanguage,
            targetLanguage,
            MessageInputMethod.Voice
        );
    }

    /**
     * Sets the source field to become empty
     */
    function clearSourceText() {
        setSourceText("");
        clearRequestPipeline();
        focusSourceField();
    }

    /**
     * Can be called after a network error to retry the translation
     */
    function retryTranslation() {
        requestTranslation(
            sourceText,
            sourceLanguage,
            targetLanguage,
            lastInputMethod
        );
    }

    /**
     * Hydrates the translator with a translation resovled from history
     */
    function restoreTextFromHistory(
        text: string,
        from: IsoLanguage,
        to: IsoLanguage
    ) {
        setSourceText(text);
        setSourceLanguage(from);
        setTargetLanguage(to);
        requestTranslation(
            text,
            from,
            to,
            MessageInputMethod.History
        )
    }


    ///////////////////////////////
    // Handling other UI actions //
    ///////////////////////////////

    /**
     * Changes the source language, possibly updates the target language
     * and triggers translation
     */
    function changeSourceLanguage(newSource: IsoLanguage) {
        setSourceLanguage(newSource);

        const newTargetLanguages = translationGraph.getReachableLanguagesFrom(
            newSource
        );
        
        // change target language to UI language or the first available one,
        // if the current one is not reachable
        let newTarget = targetLanguage;
        if (!newTargetLanguages.includes(targetLanguage)) {
            if (newTargetLanguages.includes(i18n.language as IsoLanguage)) {
                newTarget = i18n.language as IsoLanguage;
            } else {
                newTarget = newTargetLanguages[0];
            }
            setTargetLanguage(newTarget);
        }

        requestTranslation(
            sourceText,
            newSource,
            newTarget,
            MessageInputMethod.LanguageChanged
        );
    }

    /**
     * Changes the target language and triggers translation
     */
    function changeTargetLanguage(newTarget: IsoLanguage) {
        setTargetLanguage(newTarget);
        requestTranslation(
            sourceText,
            sourceLanguage,
            newTarget,
            MessageInputMethod.LanguageChanged
        );
    }

    /**
     * Is true when the current language pair can be flipped
     */
    const canSwapLanguages = translationGraph
        .getReachableLanguagesFrom(targetLanguage)
        .includes(sourceLanguage);

    /**
     * Switches languages and triggers translation
     */
    function swapLanguages() {
        if (!canSwapLanguages) {
            return;
        }

        setSourceText(targetText);
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);

        focusSourceField();

        requestTranslation(
            targetText,
            targetLanguage,
            sourceLanguage,
            MessageInputMethod.LanguageSwap
        );
    }

    /**
     * True when there is a translation result to be copied to clipboard
     */
    const canCopyTargetTextToClipboard =
        targetText !== "" && !!navigator.clipboard;

    /**
     * Copies the result of the translation to clipboard
     */
    function copyTargetTextToClipboard() {
        if (!canCopyTargetTextToClipboard) {
            return;
        }
        
        navigator.clipboard.writeText(targetText)
    }


    //////////////////
    // UI Rendering //
    //////////////////

    const getTransliteration = () => {
        if (targetLanguage === 'uk') {
            return transliterateCyrilToLatin(targetText)
                .split('\n')
                .map((item, i) => (
                    <p key={i} style={{ margin: 0 }}>
                        {item !== '' ? item : <br />}
                    </p>
                ))
        }

        if (sourceLanguage === 'uk') {
            return transliterateLatinToCyril(targetText)
                .split('\n')
                .map((item, i) => (
                    <p key={i} style={{ margin: 0 }}>
                        {item !== '' ? item : <br />}
                    </p>
                ))
        }

        return null
    }

    return (
        <div className={styles.flex}>
            <Paper elevation={2} className={styles.translationFieldContainer}>
                <div className={styles.translationHeaderContainer}>
                    <LanguageDropdown
                        value={sourceLanguage}
                        languages={sourceLanguages}
                        onChange={changeSourceLanguage}
                    />
                    <div className={styles.asrTempOutput}>{asrIntermediateText}</div>
                    <div /*className={styles.asrContainer}*/>
                        <ASR
                            onresult={handleAsrIntermediateInput}
                            onfinal={handleAsrFinalInput}
                            onerror={(data) => {
                                // TODO: add proper ASR error handling
                                console.error('from form onerror ASR:', data)
                            }}
                            language={sourceLanguage}
                        />
                    </div>
                </div>
                <TextField
                    value={sourceText}
                    label=" "
                    onChange={handleSourceTextChange}
                    id="source"
                    variant="filled"
                    color={sourceText.length > 2000 ? 'warning' : 'primary'}
                    error={sourceText.length > 5000}
                    helperText={sourceText.length > 2000 ? 'maximum text size is 5000 chars' : ''}
                    multiline
                    inputRef={sourceFieldRef}
                    minRows={6}
                    className={styles.sourceInput}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {sourceText.length > 0 && (
                                    <Tooltip className={styles.removeButton} title={t("form:clearSourceText")}>
                                        <IconButton onClick={clearSourceText}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            <div className={styles.switchButtonWrapper}>
                <Tooltip title={t("form:swapLanguages")}>
                    <span>
                        <IconButton
                            onClick={swapLanguages}
                            size="large"
                            disabled={!canSwapLanguages}
                        >
                            <SwapVert fontSize="large" />
                        </IconButton>
                    </span>
                </Tooltip>
            </div>

            <Paper elevation={2} className={styles.translationFieldContainer}>
                <div className={styles.translationHeader}>
                    <LanguageDropdown
                        value={targetLanguage}
                        languages={targetLanguages}
                        onChange={changeTargetLanguage}
                    />
                    {canCopyTargetTextToClipboard && (
                        <Tooltip title={t("form:copyToClipboard")}>
                            <Button
                                onClick={copyTargetTextToClipboard}
                                variant="text"
                                size="small"
                                startIcon={<ContentCopyIcon />}
                            >
                                {t("common:copy")}
                            </Button>
                        </Tooltip>
                    )}
                    <TranslationHistory
                        getHistory={() => getHistory()}
                        onSelect={restoreTextFromHistory}
                    />
                </div>
                {loading && <LinearProgress className={styles.loadingBar} />}
                <div className={styles.translationOutput}>
                    {loadingError !== null ? (
                        <div className={styles.networkError}>
                            <ErrorOutlineIcon />
                            <span>{loadingError !== '' ? loadingError : 'Translation error'}</span>
                            <Button
                                onClick={retryTranslation}
                            >
                                Try again
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <div className={styles.translationText}>
                                {targetText.split('\n').map((item, i) => (
                                    <p key={i} style={{ margin: 0 }}>
                                        {item !== '' ? item : <br />}
                                    </p>
                                ))}
                            </div>

                            <div className={styles.transliteration}>
                                {getTransliteration()}
                            </div>
                        </div>
                    )}
                </div>
            </Paper>
        </div>
    )
}

export default Form

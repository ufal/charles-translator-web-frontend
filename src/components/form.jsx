import React, { useState, useRef } from 'react'
import debounce from 'debounce-promise'
import {
    Button,
    IconButton,
    InputAdornment,
    LinearProgress,
    TextField,
    Tooltip,
    Paper,
    Select,
    MenuItem,
} from '@mui/material'
import {
    Clear as ClearIcon,
    ContentCopy as ContentCopyIcon,
    ErrorOutline as ErrorOutlineIcon,
    SwapVert,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { getHistory, saveHistory } from '../history'
import { translate } from '../api'
import ASR from './asr'
import { TranslationHistory } from './TranslationHistory'
import { transliterateCyrilToLatin, transliterateLatinToCyril } from '../transliterate'

import britainFlag from '../../public/static/img/britainFlag.png'
import czechFlag from '../../public/static/img/czechFlag.png'
import defaultFlag from '../../public/static/img/defaultFlag.png'
import franceFlag from '../../public/static/img/franceFlag.png'
import germanFlag from '../../public/static/img/germanFlag.png'
import indiaFlag from '../../public/static/img/indiaFlag.png'
import polandFlag from '../../public/static/img/polandFlag.png'
import russiaFlag from '../../public/static/img/russiaFlag.png'
import ukraineFlag from '../../public/static/img/ukraineFlag.png'
import usaFlag from '../../public/static/img/usaFlag.png'

import * as styles from './form.module.scss'

const debouncedTranslate = debounce(translate, 500)
const debouncedSave = debounce(saveHistory, 3000)

const defaultlanguages = [
    {
        id: 'uk',
        name: 'Ukrainian',
        targets: [
            {
                id: 'cs',
                name: 'Czech',
            },
        ],
    },
    {
        id: 'cs',
        name: 'Czech',
        targets: [
            {
                id: 'uk',
                name: 'Ukrainian',
            },
        ],
    },
]
let loadingID = 0 // id of most recent sent request
let loadedID = 0 // id o most recent received request

const Form = () => {
    const [state, setState] = useState({
        source: '',
        asrTempOutput: '',
        translation: '',
        languages: defaultlanguages,
        sourceLanguage: defaultlanguages[1],
        targetLanguage: defaultlanguages[0],
        loading: false,
        loadingError: null,
    })
    const [loading, setLoading] = useState(false)
    const [loadingError, setLoadingError] = useState(null)

    const { t } = useTranslation();

    let inputTypeStatistics = 'keyboard'

    React.useEffect(() => {
        getSourceLanguages()
    }, [])

    const focusInput = useRef(null)

    React.useEffect(() => {
        if (focusInput.current) focusInput.current.focus()
    }, [focusInput])

    function handleChangeSource(
        text,
        additive = false,
        fromLanguage = state.sourceLanguage,
        toLanguage = state.targetLanguage
    ) {
        setState((prevState) => {
            if (additive) {
                if (text.length > 0) text = text.charAt(0).toLocaleUpperCase() + text.slice(1)
                if (text !== '') text += '.'
                if (text !== '' && prevState.source !== '') text = '\n' + text
                text = prevState.source + text
            }

            return { ...prevState, source: text }
        })

        setLoading(true)

        setState((prevState) => ({
            ...prevState,
            sourceLanguage: fromLanguage,
            targetLanguage: toLanguage,
        }))

        if (typeof window !== 'undefined') window.localStorage.setItem('lastTranslationSource', fromLanguage.id)

        debouncedSave(fromLanguage.id, toLanguage.id, text)
        debouncedTranslate({
            text,
            fromLanguage: fromLanguage.id,
            toLanguage: toLanguage.id,
            loadingID: ++loadingID,
            inputType: inputTypeStatistics,
        })
            .then((data) => {
                // this request is last that was sent
                if (data.loadingID === loadingID) setLoading(false)

                // this request has some new information
                if (loadedID < data.loadingID) {
                    loadedID = data.loadingID
                    setState((prevState) => {
                        return { ...prevState, translation: data.data.trim() }
                    })
                    setLoadingError(null)
                }
            })
            .catch((error) => {
                setLoading(false)
                setLoadingError(error.data || '')
                console.error('Error when loading translation')
                console.error(error)
            })
    }

    const getFlag = (languageId) => {
        switch (languageId) {
            case 'cs':
                return czechFlag
            case 'en':
                return britainFlag
            case 'fr':
                return franceFlag
            case 'de':
                return germanFlag
            case 'hi':
                return indiaFlag
            case 'pl':
                return polandFlag
            case 'ru':
                return russiaFlag
            case 'uk':
                return ukraineFlag
            default:
                return defaultFlag
        }
    }

    const flipLanguages = () => {
        const oldSource = state.sourceLanguage
        const oldTarget = state.targetLanguage
        setState((prevState) => {
            return { ...prevState, translation: '' }
        })

        inputTypeStatistics = 'swap-languages'
        /**/ // switch - keep source text as source
        handleChangeSource(state.source, false, oldTarget, oldSource)
        /*/ - insert translation as new source
    handleChangeSource(state.translation, false, oldTarget, oldSource);
    /**/
    }

    const getSourceLanguages = () => {
        const headersList = {
            Accept: '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
        }
        const url = 'https://translator.cuni.cz/languages'

        fetch(url, {
            method: 'GET',
            headers: headersList,
        })
            .then((response) => response.json())
            .then((data) => {
                setState((prevState) => {
                    const languages = data._embedded.item.map((item) => ({
                        id: item.name,
                        name: item.title,
                        targets: item._links.targets.map((target) => ({
                            id: target.name,
                            name: target.title,
                        })),
                    }))
                    return {
                        ...prevState,
                        languages,
                        sourceLanguage: languages.find((item) => item.id === prevState.sourceLanguage.id),
                        targetLanguage: languages.find((item) => item.id === prevState.targetLanguage.id),
                    }
                })
            })
            .catch((err) => console.error(err))
    }

    const getTransliteration = (sourceLanguage, targetLanguage, translation) => {
        if (targetLanguage.id === 'uk') {
            return transliterateCyrilToLatin(translation)
                .split('\n')
                .map((item, i) => (
                    <p key={i} style={{ margin: 0 }}>
                        {item !== '' ? item : <br />}
                    </p>
                ))
        }
        if (sourceLanguage.id === 'uk') {
            return transliterateLatinToCyril(translation)
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
                    <div className={styles.languageContainer}>
                        <img
                            width={30}
                            height={30}
                            alt={state.targetLanguage.id}
                            src={getFlag(state.sourceLanguage.id)}
                            // className={styles.flagIcon}
                        />
                        <Select
                            className={styles.languageName}
                            variant="standard"
                            disableUnderline
                            value={state.sourceLanguage.id}
                            onChange={(event) => {
                                const sourceLanguage = state.languages.find((item) => item.id === event.target.value)
                                let targetLanguage = state.targetLanguage
                                if (sourceLanguage.targets.find((item) => item.id === targetLanguage.id) == null) {
                                    const tryFindCzech = sourceLanguage.targets.find((item) => item.id === 'cs')
                                    if (tryFindCzech == null) targetLanguage = sourceLanguage.targets[0]
                                    else targetLanguage = tryFindCzech
                                }
                                handleChangeSource(state.source, false, sourceLanguage, targetLanguage)
                            }}
                        >
                            {state.languages
                                .filter((item) => item.targets.length > 0)
                                .map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </div>
                    <div className={styles.asrTempOutput}>{state.asrTempOutput}</div>
                    <div /*className={styles.asrContainer}*/>
                        <ASR
                            onresult={(data) => {
                                setState((prevState) => {
                                    return { ...prevState, asrTempOutput: data }
                                })
                            }}
                            onfinal={(data) => {
                                inputTypeStatistics = 'voice'
                                handleChangeSource(data, true)
                                setState((prevState) => {
                                    return { ...prevState, asrTempOutput: '' }
                                })
                            }}
                            onerror={(data) => {
                                console.error('from form onerror ASR:', data)
                            }} // todo remove or show to user
                            language={state.sourceLanguage.id}
                        />
                    </div>
                </div>
                <TextField
                    value={state.source}
                    label=" "
                    onChange={(e) => {
                        switch (e.nativeEvent.inputType) {
                            case 'insertFromPaste':
                                inputTypeStatistics = 'clipboard'
                                break
                            case 'deleteContentBackward':
                            case 'insertText':
                            default:
                                inputTypeStatistics = 'keyboard'
                        }
                        return handleChangeSource(e.target.value)
                    }}
                    id="source"
                    variant="filled"
                    color={state.source.length > 2000 ? 'warning' : 'primary'}
                    error={state.source.length > 5000}
                    helperText={state.source.length > 2000 ? 'maximum text size is 5000 chars' : ''}
                    multiline
                    inputRef={focusInput}
                    minRows={6}
                    className={styles.sourceInput}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {state.source.length !== 0 && (
                                    <Tooltip className={styles.removeButton} title={t("form:clearSourceText")}>
                                        <IconButton
                                            onClick={() => {
                                                handleChangeSource('')
                                                focusInput.current.focus()
                                            }}
                                        >
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
                            aria-label="switch languages"
                            onClick={() => {
                                flipLanguages()
                                focusInput.current.focus()
                            }}
                            size="large"
                            disabled={
                                !(
                                    state.targetLanguage.targets?.find((item) => item.id === state.sourceLanguage.id) !=
                                    null
                                )
                            }
                        >
                            <SwapVert fontSize="large" color="#000" />
                        </IconButton>
                    </span>
                </Tooltip>
            </div>

            <Paper elevation={2} className={styles.translationFieldContainer}>
                <div className={styles.translationHeader}>
                    <div className={styles.languageContainer}>
                        <img
                            width={30}
                            height={30}
                            alt={state.targetLanguage.id}
                            src={getFlag(state.targetLanguage.id)}
                            // className={styles.flagIcon}
                        />
                        <Select
                            className={styles.languageName}
                            variant="standard"
                            disableUnderline
                            value={state.targetLanguage.id}
                            onChange={(event) => {
                                const targetLanguageId = state.languages.find((item) => item.id === event.target.value)
                                handleChangeSource(state.source, false, state.sourceLanguage, targetLanguageId)
                            }}
                        >
                            {state.languages
                                .find((item) => item.id === state.sourceLanguage.id)
                                ?.targets.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                )) ?? null}
                        </Select>
                    </div>

                    {state.translation.length !== 0 && navigator.clipboard !== undefined && (
                        <Tooltip title={t("form:copyToClipboard")}>
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(state.translation)
                                }}
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
                        onSelect={(text, fromLanguageId, toLanguageId) => {
                            inputTypeStatistics = 'history'
                            const fromLanguage = state.languages.find((item) => item.id === fromLanguageId)
                            const toLanguage = state.languages.find((item) => item.id === toLanguageId)
                            return handleChangeSource(text, false, fromLanguage, toLanguage)
                        }}
                    />
                </div>
                {loading && <LinearProgress className={styles.loadingBar} />}
                <div className={styles.translationOutput}>
                    {loadingError !== null ? (
                        <div className={styles.networkError}>
                            <ErrorOutlineIcon />
                            <span>{loadingError !== '' ? loadingError : 'Translation error'}</span>
                            <Button
                                onClick={() => {
                                    handleChangeSource(state.source)
                                }}
                            >
                                Try again
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <div className={styles.translationText}>
                                {state.translation.split('\n').map((item, i) => (
                                    <p key={i} style={{ margin: 0 }}>
                                        {item !== '' ? item : <br />}
                                    </p>
                                ))}
                            </div>

                            <div className={styles.transliteration}>
                                {getTransliteration(state.sourceLanguage, state.targetLanguage, state.translation)}
                            </div>
                        </div>
                    )}
                </div>
            </Paper>
        </div>
    )
}

export default Form

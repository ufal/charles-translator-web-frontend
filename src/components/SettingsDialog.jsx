import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
} from '@mui/material'
import { Check as CheckIcon, Close as CloseIcon, Settings as SettingsIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import UiLanguageSwitcher from "../ui/UiLanguageSwitcher";

import { AboutUsConst } from '../constants/texts'

import * as styles from './SettingsDialog.module.scss'

export default function SettingsDialog() {
    const [state, setState] = useState({
        author: '',
        authorSaved: false,
        privacyTabValue: '0',
        collectDataConsent: false,
        openSettings: false,
        allowLocalHistory: true,
    })

    const { t, i18n } = useTranslation()

    useEffect(() => setDefaults(), [])



    const setDefaults = () => {
        setState((prevState) => ({
            ...prevState,
            author: localStorage.getItem('organizationName') || '',
            collectDataConsent: localStorage.getItem('collectDataConsentValue') === 'true',
            allowLocalHistory: localStorage.getItem('allowLocalHistory') !== 'false',
        }))
    }

    const changeAuthor = (event) => {
        setState((prevState) => ({
            ...prevState,
            author: event.target.value,
            authorSaved: true,
        }))

        if (typeof window !== 'undefined') window.localStorage.setItem('organizationName', event.target.value)
    }

    const changeConsent = (event) => {
        setState((prevState) => ({
            ...prevState,
            collectDataConsent: event.target.checked,
        }))

        if (typeof window !== 'undefined')
            window.localStorage.setItem('collectDataConsentValue', JSON.stringify(event.target.checked))
    }

    const changeLocalHistory = (event) => {
        setState((prevState) => ({
            ...prevState,
            allowLocalHistory: event.target.checked,
        }))

        if (typeof window !== 'undefined')
            window.localStorage.setItem('allowLocalHistory', JSON.stringify(event.target.checked))
    }

    return (
        <>
            <Tooltip title={t("common:settings")}>
                <IconButton
                    size="small"
                    edge="start"
                    aria-label="menu"
                    sx={{ mr: 1, 
					/*	color: 'black' */
					}}
                    onClick={() => {
                        setState((prevState) => ({ ...prevState, openSettings: true }))
                        setDefaults()
                    }}
                >
                    <SettingsIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                PaperProps={{
                    sx: { maxWidth: '800px' },
                }}
                open={state.openSettings}
                onClose={() => setState((prevState) => ({ ...prevState, openSettings: false }))}
            >
                <DialogTitle>
                    {t("common:settings")}
                    <UiLanguageSwitcher
                        sx={{
                            position: "absolute",
                            right: (24 + 50) + "px",
                            top: "16px",
                        }}
                    />
                    <IconButton
                        // className={styles.closeFAQButton}
                        onClick={() => setState((prevState) => ({ ...prevState, openSettings: false }))}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Box component="span" sx={{ padding: 2 }}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label={t("common:companyName")}
                        variant="outlined"
                        onChange={changeAuthor}
                        value={state.author}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {state.authorSaved && (
                                        <div>
                                            {t("common:saved")} <CheckIcon color="success" />
                                        </div>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        sx={{ marginBlock: '16px' }}
                        control={<Checkbox onChange={changeConsent} checked={state.collectDataConsent} />}
                        label={AboutUsConst.checkBoxLabel[i18n.language]}
                    />
                    <FormControlLabel
                        sx={{ marginBlock: '16px' }}
                        control={<Checkbox onChange={changeLocalHistory} checked={state.allowLocalHistory} />}
                        label={AboutUsConst.allowLocalHistory[i18n.language]}
                    />
                </Box>
                <DialogActions>
                    <Button onClick={() => setState({ ...state, openSettings: false })}>{t("common:close")}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

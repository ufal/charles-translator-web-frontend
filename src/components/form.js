import React, { useState } from "react";
import debounce from "debounce-promise";
import {
	Button,
	IconButton,
	InputAdornment,
	LinearProgress,
	TextField,
	Tooltip,
} from "@mui/material";
import {
	Clear as ClearIcon,
	ContentCopy as ContentCopyIcon,
	ErrorOutline as ErrorOutlineIcon,
	SwapVert,
} from "@mui/icons-material";

import { getHistory, saveHistory } from "../history";
import { translate } from "../api";
import { TranslationHistory } from "./TranslationHistory";
import { transliterateCyrilToLatin, transliterateLatinToCyril } from "../transliterate";

import styles from "./form.module.scss"


const debouncedTranslate = debounce(translate, 500);
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

let loadingID = 0; // id of most recent sent request
let loadedID = 0;  // id o most recent received request

const Form = () => {
	const [source, setSource] = useState("");
	const [translation, setTranslation] = useState("");
	const [languages, setLanguages] = useState({ source: languageUk, target: languageCs });
	const [loading, setLoading] = useState(false);
	const [loadingError, setLoadingError] = useState(false);

	React.useEffect(() => {
		const defaultSource = localStorage.getItem("lastTranslationSource") || "";

		if(defaultSource === languageCs.id)
			setLanguages({source: languageCs, target: languageUk });
		else
			setLanguages({source: languageUk, target: languageCs });
	}, [])

	function handleChangeSource(text, fromLanguage = languages.source.id, toLanguage = languages.target.id) {
		setSource(text);
		setLoading(true);

		debouncedSave(languages.source, text);
		debouncedTranslate({
			text,
			fromLanguage,
			toLanguage,
			loadingID: ++loadingID,
		})
		.then((data) => {
			// this request is last that was sent
			if(data.loadingID === loadingID)
				setLoading(false);
			
			// this request has some new information
			if(loadedID < data.loadingID){
				loadedID = data.loadingID;
				setTranslation(data.data.trim());
				setLoadingError(false);
			}

		})
		.catch((error) => {
			setLoading(false);
			setLoadingError(true);
			console.log("Error when loading translation");
			console.log(error);
		})
	}

	const flipLanguages = () => {
		const oldSource = languages.source;
		const oldTarget = languages.target;
		setTranslation("");
		setLanguages((state) => ({ source: state.target, target: state.source }));

		/**/// switch - keep source text as source
		handleChangeSource(source, oldTarget.id, oldSource.id);
		/*/                     - insert translation as new source
		handleChangeSource(translation, oldTarget.id, oldSource.id);
		/**/
		
		if(typeof window !== 'undefined')
			window.localStorage.setItem("lastTranslationSource", oldTarget.id);
	}

	return (
		<div className={styles.flex}>
			<div className={styles.translationFieldContainer}>
				<div className={styles.labelContainer}>
					<label className={styles.label} htmlFor="destination">{languages.source.name}</label>
				</div>
				<TextField
					value={source}
					onChange={(e) => handleChangeSource(e.target.value)}
					id="source"
					variant="filled"
					multiline
					minRows={6}
					className={styles.sourceInput}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								{ source.length !== 0 &&
									<Tooltip title="Clear source text">
										<IconButton 
											onClick={() => {handleChangeSource("")}}
											className={styles.removeButton}
										>
											<ClearIcon/>
										</IconButton>
									</Tooltip>
								}
							</InputAdornment>
						),
					}}
				/>
			</div>

			<div className={styles.switchButtonWrapper}>
				<Tooltip title="Swap languages">
					<IconButton
						aria-label="switch languages"
						onClick={flipLanguages}
						size="large"
					>
						<SwapVert fontSize="large" color="primary" />
					</IconButton>
				</Tooltip>
			</div>

			<div className={styles.translationFieldContainer}>
				<div className={styles.translationHeader}>
					<label className={styles.label} htmlFor="destination">{languages.target.name}</label>
					{translation.length !== 0 && navigator.clipboard !== 'undefined' &&
						<Tooltip title="Copy translation to cliboard">
						<Button 
							onClick={() => {navigator.clipboard.writeText(translation)}}
							variant="text"
							size="small"
							startIcon={<ContentCopyIcon/>}
						>
							COPY
						</Button>
					</Tooltip>}
					<TranslationHistory
						getHistory={() => getHistory(languages.source)}
						onSelect={handleChangeSource}
					/>
				</div>
				{loading && (<LinearProgress className={styles.loadingBar}/>)}
				<div className={styles.translationOutput}>
					{loadingError ? 
						<div className={styles.networkError}>
							<ErrorOutlineIcon/>
							<span>Translation error</span>
							<Button
								onClick={()=>{location.reload();}}
							>
								Try again
							</Button>
						</div>
						:
						<div>
							<div className={styles.translationText}>
								{translation.split('\n').map((item, i) => (<p key={i} style={{margin: 0}}>{(item !== "") ? item : <br />}</p>))}
							</div>
						
							<div className={styles.transliteration}>
								{languages.target.transliterate(translation).split('\n').map((item, i) => (<p key={i} style={{margin: 0}}>{(item !== "") ? item : <br />}</p>))}
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default Form;

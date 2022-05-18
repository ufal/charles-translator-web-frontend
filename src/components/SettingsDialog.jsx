import * as React from "react";
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogTitle,
	FormControl,
	FormControlLabel,
	IconButton,
	InputAdornment,
	MenuItem,
	Grid,
	Paper,
	Select,
	TextField,
	Tooltip,
	FormGroup,
	InputLabel,
	Switch,
} from "@mui/material";
import {
	Check as CheckIcon,
	Close as CloseIcon,
	Settings as SettingsIcon,
} from "@mui/icons-material";
import {
	TabContext,
	TabList,
	TabPanel,
} from '@mui/lab';

import { AboutUsConst } from "../constants/about-us-constsant";

import styles from "./SettingsDialog.module.scss"
import { margin } from "@mui/system";


export default function SettingsDialog() {
	const [state, setState] = React.useState({
		author: "",
		authorSaved: false,
		privacyTabValue: "0",
		checked: false,
		openSettings: false,
		language: "cs",
	});

	React.useEffect(() => setDefaults(), [])

	const setDefaults = () => {
		setState((prevState) => ({
			...prevState,
			language: localStorage.getItem("language") || "cs",
			author: localStorage.getItem("organizationName") || "",
			checked: localStorage.getItem("collectDataConsentValue") === "true",
		}))
	}

	const changeAuthor = (event) => {
		setState((prevState) => ({
			...prevState,
			author: event.target.value,
			authorSaved: true
		}))

		if (typeof window !== "undefined")
			window.localStorage.setItem("organizationName", event.target.value);
	}

	const changeLanguage = (event) => {
		setState((prevState) => ({
			...prevState,
			language: event.target.value,
		}))

		if (typeof window !== "undefined")
			window.localStorage.setItem("language", event.target.value);
	}

	const handleChange = (event) => {
		setState((prevState) => ({
			...prevState,
			checked: event.target.checked,
		}))

		if (typeof window !== "undefined")
			window.localStorage.setItem("collectDataConsentValue", JSON.stringify(event.target.checked));
	}

	return (
		<>
			<Tooltip title="Settings">
				<IconButton
					size="small"
					edge="start"
					aria-label="menu"
					sx={{ mr: 1, color: "white" }}
					onClick={() => { setState((prevState) => ({ ...prevState, openSettings: true })); setDefaults(); }}
				>
					<SettingsIcon />
				</IconButton>
			</Tooltip>

			<Dialog
				PaperProps={{
					sx: { maxWidth: "800px" }
				}}
				open={state.openSettings}
				onClose={() => setState((prevState) => ({ ...prevState, openSettings: false }))}
			>
				<DialogTitle>
					Settings
					<IconButton
						className={styles.closeFAQButton}
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

					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<FormControl fullWidth>
								<InputLabel id="languageLabel">Language</InputLabel>
								<Select
									labelId="languageLabel"
									variant="outlined"
									label="Language"
									value={state.language}
									onChange={changeLanguage}
								>
									<MenuItem value={"cs"}>Čeština</MenuItem>
									<MenuItem value={"en"}>English</MenuItem>
									<MenuItem value={"uk"}>українська</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={8}>
							<TextField
								fullWidth
								id="outlined-basic"
								label="Organization name (optional)"
								variant="outlined"
								onChange={changeAuthor}
								value={state.author}
								InputProps={{
									endAdornment:
										<InputAdornment position="end">
											{state.authorSaved && <div>Saved <CheckIcon color="success" /></div>}
										</InputAdornment>
								}}
							/>

						</Grid>
					</Grid>

					<FormControlLabel
						sx={{ marginBlock: "16px" }}
						control={<Checkbox onChange={handleChange} checked={state.checked} />}
						label={AboutUsConst.checkBoxLabel[state.language]}
					/>

					<FormGroup>
						<FormControlLabel control={<Switch defaultChecked />} label="Allow local history (stored on your device)" />
						<FormControlLabel control={<Switch defaultChecked />} label="Allow saving text translation for translation improvement" />
						<FormControlLabel control={<Switch defaultChecked />} label="Allow saving voice for ASR improvement" />
					</FormGroup>
				</Box>
				<DialogActions>
					<Button onClick={() => setState({ ...state, openSettings: false })}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

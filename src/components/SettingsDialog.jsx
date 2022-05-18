import * as React from "react";
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
	Tab,
	TextField,
	Tooltip,
	FormGroup,
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


export default function SettingsDialog() { 
	const [state, setState] = React.useState({ 
		author: "",
		authorSaved: false,
		privacyTabValue: "0",
		checked: false,
		openSettings: false,
	 });

	React.useEffect(() => setDefaults(), [])

	const setDefaults = () => { 
		setState((prevState) => ({ 
			...prevState,
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
		
		if(typeof window !== "undefined")
			window.localStorage.setItem("organizationName", event.target.value);
	 }

	const handleChange = (event) => { 
		setState((prevState) => ({ 
			...prevState,
			checked: event.target.checked,
		 }))

		if(typeof window !== "undefined")
			window.localStorage.setItem("collectDataConsentValue", JSON.stringify(event.target.checked));
	}

	return (
		<>
		<Tooltip title = "Settings">
			<IconButton
				size = "small"
				edge = "start"
				aria-label = "menu"
				sx = { { mr: 1, color: "white" } }
				onClick = { () => { setState((prevState) => ({ ...prevState, openSettings: true })); setDefaults(); } }
			>
				<SettingsIcon />
			</IconButton>
		</Tooltip>

		<Dialog
			PaperProps = { { 
				sx:{ maxWidth: "800px" }
			 } }
			open = { state.openSettings }
			onClose = { () => setState((prevState) => ({ ...prevState, openSettings: false })) }
		>
			<DialogTitle>
				Privacy settings
				<IconButton
					className={styles.closeFAQButton}
					onClick = { () => setState((prevState) => ({ ...prevState, openSettings: false })) }
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
					  }}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Box component = "span" sx = { { padding: 2 } }>
				<TextField
					fullWidth
					id = "outlined-basic"
					label = "Organization name (optional)"
					variant = "outlined"
					onChange = { changeAuthor }
					value = { state.author }
					InputProps = { { 
						endAdornment: 
							<InputAdornment position = "end">
								{ state.authorSaved && <div>Saved <CheckIcon color = "success"/></div> }
							</InputAdornment>
					} }
				/>
				<FormControlLabel
					control = { <Checkbox onChange = { handleChange } checked = { state.checked } /> }
					label = { (
						<TabContext value = { state.privacyTabValue }>
							<Box sx = { { borderBottom: 1, borderColor: 'divider' } }>
								<TabList onChange = { (event, newValue) => { setState((prevState) => ({ ...prevState, privacyTabValue: newValue })) } }>
									<Tab label = "EN" value = "0" />
									<Tab label = "CS" value = "1" />
									<Tab label = "UK" value = "2" />
								</TabList>
							</Box>
							<TabPanel value = "0"> { AboutUsConst.checkBoxLabel[0] } </TabPanel>
							<TabPanel value = "1"> { AboutUsConst.checkBoxLabel[1] } </TabPanel>
							<TabPanel value = "2"> { AboutUsConst.checkBoxLabel[2] } </TabPanel>
						</TabContext>
					) }
				/>

			</Box>
			<DialogActions>
				<Button onClick = { () => setState({ ...state, openSettings: false }) }>Close</Button>
			</DialogActions>
		</Dialog>
		</>
	);
 }

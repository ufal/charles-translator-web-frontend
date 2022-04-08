import React, { useState, useEffect } from "react";
import Image from 'next/image';
import CssBaseline from "@mui/material/CssBaseline";
import {
	AppBar,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	Snackbar,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	Check as CheckIcon,
	Close as CloseIcon,
	Info as InfoIcon,
} from "@mui/icons-material";

import AboutUs from "./about-us";

import styles from "./layout.module.scss"


function Layout({ children }) {
	const [collectionSnackbar, setCollectionSnackbar] = useState(true);
	const [openAboutUs, setOpenAboutUs] = useState(false);
	const [forOrganizations, setForOrganizations] = useState(false);
	const [notOfficialDeplo, setNotOfficialDeplo] = useState(false);
	
	useEffect(() => setCollectionSnackbar(localStorage.getItem("collectDataConsentValue") !== "true"),[])
	useEffect(() => setNotOfficialDeplo(window.location.href.indexOf("lindat.cz/translation") === -1),[])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setForOrganizations((localStorage.getItem("organizationName") || "").length !== 0))

	const allowCollection = () => { 
		setCollectionSnackbar(false);
		if(typeof window !== 'undefined')
			window.localStorage.setItem("collectDataConsentValue", "true");
	}

	return (
		<div>
			<CssBaseline />
			<div className={styles.container}>
				<AppBar
					position="static"
					className={styles.header}
					elevation={0}
				>
					<Toolbar className={styles.toolbar}>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, ml: 1 }}
							color="white"
						>
							<div className={styles.flagsContainer}>

								<div>ÚFAL Translator {forOrganizations && "for organizations"}</div>
							</div>
						</Typography>
						<Tooltip title="About us">
							<IconButton
								size="small"
								edge="start"
								aria-label="menu"
								sx={{ mr: 1, color: "white" }}
								onClick={() => setOpenAboutUs(true)}
							>
								<InfoIcon />
							</IconButton>
						</Tooltip>
					</Toolbar>
					{notOfficialDeplo && <div className={styles.notOfficialDeplo}>
						<a href="https://lindat.cz/translation">
							🚧🚧This version is not for public, please click here.🚧🚧 
						</a>
						<IconButton
							onClick={()=>setNotOfficialDeplo(false)}
						>
							<CloseIcon />
						</IconButton>
					</div>}
				</AppBar>

				{children}

				<Dialog
					PaperProps = {{
						sx:{maxWidth: "800px"}
					}}
					open={openAboutUs}
					onClose={()=>setOpenAboutUs(false)}
				>
					<DialogTitle>
						<IconButton
							className={styles.closeAboutUsButton}
							onClick={()=>setOpenAboutUs(false)}
						>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<AboutUs/>
					<DialogActions>
						<Button onClick={()=>setOpenAboutUs(false)}>Close</Button>
					</DialogActions>
				</Dialog>

				<Snackbar
					open={collectionSnackbar}
					message={`Souhlasím s tím, aby Ústav formální a aplikované lingvistiky
						MFF UK ukládal vstupy a výstupy z překladače. V případě souhlasu,
						mohou být anonymizované texty využity pro další vývoj systému.`}
					anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
					action={(
						<React.Fragment>
							<Button size="large" onClick={allowCollection}>
								<CheckIcon fontSize="small" />
								SOUHLASÍM
							</Button>
							<Button size="large" onClick={() => setCollectionSnackbar(false)}>
								<CloseIcon fontSize="small" />
								NESOUHLASÍM
							</Button>
						</React.Fragment>
					)}
				/>

				<div className={styles.footer}>
					THE LINDAT/CLARIAH-CZ PROJECT (LM2018101; formerly
					LM2010013, LM2015071) IS FULLY SUPPORTED BY THE MINISTRY OF
					EDUCATION, SPORTS AND YOUTH OF THE CZECH REPUBLIC UNDER THE
					PROGRAMME LM OF LARGE INFRASTRUCTURES
				</div>
			</div>
		</div>
	);
}

export default Layout;

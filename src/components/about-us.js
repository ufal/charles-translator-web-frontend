import * as React from "react";
import Image from 'next/image';
import {
	Box,
	Checkbox,
	FormControlLabel,
	InputAdornment,
	Tab,
	TextField,
} from "@mui/material";
import { AboutUsConst } from "../constants/about-us-constsant";
import {
	TabContext,
	TabList,
	TabPanel,
} from '@mui/lab';
import CheckIcon from '@mui/icons-material/Check';

import atChar from '../../public/static/img/at.svg';
import lindatLogo from '../../public/static/img/lindat-logo-violet.svg';
import ufalLogo from '../../public/static/img/ufal-logo.svg';

import styles from "./about-us.module.scss"


export default function AboutUs() {
	const [author, setAuthor] = React.useState(localStorage.getItem("organizationName") || "");
	const [authorSaved, setauthorSaved] = React.useState(false);
	const [privacyTabValue, setPrivacyTabValue] = React.useState("0");
	const [checked, setChecked] = React.useState(false);

	React.useEffect(() => setChecked(localStorage.getItem("collectDataConsentValue") === "true"), [])

	const changeAuthor = (event) => {
		setAuthor(event.target.value);
		setauthorSaved(true);
		
		if(typeof window !== 'undefined')
			window.localStorage.setItem("organizationName", event.target.value);
	}

	const handleChange = (event) => {
		setChecked(event.target.checked);

		if(typeof window !== 'undefined'){
			window.localStorage.setItem("collectDataConsentValue", JSON.stringify(event.target.checked));
		}
	}

	return (
		<Box component="span" sx={{ padding: 2 }}>
			<h2>Privacy settings</h2>
			<FormControlLabel
				control={<Checkbox onChange={handleChange} checked={checked} />}
				label={(
					<TabContext value={privacyTabValue}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<TabList onChange={(event, newValue) => {setPrivacyTabValue(newValue)}}>
								<Tab label="EN" value="0" />
								<Tab label="CS" value="1" />
								<Tab label="UK" value="2" />
							</TabList>
						</Box>
						<TabPanel value="0"> {AboutUsConst.checkBoxLabel[0]} </TabPanel>
						<TabPanel value="1"> {AboutUsConst.checkBoxLabel[1]} </TabPanel>
						<TabPanel value="2"> {AboutUsConst.checkBoxLabel[2]} </TabPanel>
					</TabContext>
				)}
			/>

			<TextField
				fullWidth
				id="outlined-basic"
				label="Organization name (optional)"
				variant="outlined"
				onChange={changeAuthor}
				value={author}
				InputProps={{
					endAdornment: 
						<InputAdornment position="end">
							{authorSaved && <div>Saved <CheckIcon color="success"/></div>}
						</InputAdornment>
				}}
			/>


			<h2>About us</h2>

			<Image height={80} width={100} alt="ufal logo" src={ufalLogo.src} className={styles.logo} />
			<Image height={80} width={139} alt="lindat logo" src={lindatLogo.src} className={styles.logo} />

			<p>The Translator was developed at the <b><a href="https://ufal.mff.cuni.cz" rel="noreferrer" target="_blank">Institute of Formal and Applied Linguistics</a></b>, Faculty of Mathematics and Physics, Charles University and was supported by the <a href="https://lindat.mff.cuni.cz" rel="noreferrer" target="_blank">LINDAT/CLARIAH-CZ</a> project.</p>

			<p>
				<b>Development of the translation system: </b>
				<a href="https://ufal.mff.cuni.cz/martin-popel" rel="noreferrer" target="_blank">Martin Popel</a>,&nbsp;
				<a href="https://ufal.mff.cuni.cz/jindrich-libovicky" rel="noreferrer" target="_blank">Jindřich Libovický</a>,&nbsp;
				<a href="https://ufal.mff.cuni.cz/jindrich-helcl" rel="noreferrer" target="_blank">Jindřich Helcl</a>,&nbsp;
				<a href="https://ufal.mff.cuni.cz/michal-novak" rel="noreferrer" target="_blank">Michal Novák</a>,&nbsp;
				<a href="https://ufal.mff.cuni.cz/rudolf-rosa" rel="noreferrer" target="_blank">Rudolf Rosa</a>,&nbsp;
				<a href="https://ufal.mff.cuni.cz/zdenek-kasner" rel="noreferrer" target="_blank">Zdeněk Kasner</a>
			</p>

			<p>
				<b> Data preparation: </b>
				<a href="https://ufal.mff.cuni.cz/lucie-polakova" rel="noreferrer" target="_blank">Lucie Poláková</a>,&nbsp;
				<a href="https://martin.majlis.cz" rel="noreferrer" target="_blank">Martin Majliš</a>,&nbsp;
				Denys Bojko, Tomáš Musil, Tereza Chlaňová, Oxana Čmelíková, Martin Popel<br />
				Many thanks to <a href="https://wiki.korpus.cz/doku.php/en:cnk:intercorp" rel="noreferrer" target="_blank">korpus.cz</a> for providing us with <b>InterCorp v14</b>, a part of the project Czech National Corpus.<br />
				We thank <a href="https://www.ceskepreklady.cz" rel="noreferrer" target="_blank">České překlady</a> for cooperating on the project.
			</p>
			
			<p>
				<b> Back-end development: </b>
				<a href="https://ufal.mff.cuni.cz/ondrej-kosarko" rel="noreferrer" target="_blank">Ondřej Košarko</a>&nbsp;
				and the Lindat team
			</p>

			<p>
				<b> Front-end created by: </b>
				<a href="https://www.nogare.cz/" rel="noreferrer" target="_blank">David Nápravník</a>,&nbsp;
				<a href="https://www.linkedin.com/in/barborastrihova" rel="noreferrer" target="_blank">Barbora Strihová</a>,&nbsp;
				<a href="https://www.linkedin.com/in/ivan-lysianok" rel="noreferrer" target="_blank">Ivan Lysianok</a>,&nbsp;
				<a href="https://www.linkedin.com/in/fogelman" rel="noreferrer" target="_blank"> Michal Fogelman</a>,&nbsp;
				<a href="https://github.com/janmarek" rel="noreferrer" target="_blank">Jan Marek</a>,&nbsp;
				<a href="https://obchodniuspech.cz" rel="noreferrer" target="_blank">Michal Pešat</a>
			</p>

			<p>
				For any questions about this Translator, please contact <strong>u4u<Image src={atChar.src} alt="@" width={13} height={13} style={{ height: ".8em" }}/>ufal.mff.cuni.cz</strong> .
			</p>
		</Box>
	);
}

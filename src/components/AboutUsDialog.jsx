import * as React from "react";
import Image from 'next/image';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	Tooltip,
	Divider,
	Chip,
} from "@mui/material";
import {
	Close as CloseIcon,
	Info as InfoIcon,
} from "@mui/icons-material";

import atChar from '../../public/static/img/at.svg';
import lindatLogo from '../../public/static/img/lindat-logo-violet.svg';
import ufalLogo from '../../public/static/img/ufal-logo.svg';

import styles from "./AboutUsDialog.module.scss"


export default function AboutUsDialog() {
	const [openAboutUs, setOpenAboutUs] = React.useState(false);

	return (
		<>
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
		
		<Dialog
			PaperProps = {{
				sx:{maxWidth: "800px"}
			}}
			open={openAboutUs}
			onClose={()=>setOpenAboutUs(false)}
		>
			<DialogTitle>
				About us
				<IconButton
					className={styles.closeFAQButton}
					onClick={()=>setOpenAboutUs(false)}
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

				<Image height={80} width={100} alt="ufal logo" src={ufalLogo.src} className={styles.logo} />
				<Image height={80} width={139} alt="lindat logo" src={lindatLogo.src} className={styles.logo} />
				<p>The Translator was developed at the <b><a href="https://ufal.mff.cuni.cz" rel="noreferrer" target="_blank">Institute of Formal and Applied Linguistics</a></b>, Faculty of Mathematics and Physics, Charles University and was supported by the <a href="https://lindat.mff.cuni.cz" rel="noreferrer" target="_blank">LINDAT/CLARIAH-CZ</a> project.</p>

				<p>
					<b>Development of the translation system: </b><br/>
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/martin-popel" label="Martin Popel" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/jindrich-libovicky" label="Jindřich Libovický" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/jindrich-helcl" label="Jindřich Helcl" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/michal-novak" label="Michal Novák" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/rudolf-rosa" label="Rudolf Rosa" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/zdenek-kasner" label="Zdeněk Kasner" />
				</p>

				<p>
					<b> Data preparation: </b> <br/>
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/lucie-polakova" label="Lucie Poláková" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://martin.majlis.cz" label="Martin Majliš" />
					<Chip className={styles.chip} component="span" variant="outlined" label="Denys Bojko" />
					<Chip className={styles.chip} component="span" variant="outlined" label="Tomáš Musil" />
					<Chip className={styles.chip} component="span" variant="outlined" label="Tereza Chlaňová" />
					<Chip className={styles.chip} component="span" variant="outlined" label="Oxana Čmelíková" />
					<Chip className={styles.chip} component="span" variant="outlined" label="Martin Popel" />
					<br/>
					Many thanks to <a href="https://wiki.korpus.cz/doku.php/en:cnk:intercorp" rel="noreferrer" target="_blank">korpus.cz</a> for providing us with <b>InterCorp v14</b>, a part of the project Czech National Corpus.<br />
					We thank <a href="https://www.ceskepreklady.cz" rel="noreferrer" target="_blank">České překlady</a> for cooperating on the project.
				</p>
				
				<p>
					<b> Back-end development: </b><br/>
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/ondrej-kosarko" label="Ondřej Košarko" />
					and the Lindat team
				</p>

				<p>
					<b> Front-end created by: </b><br/>
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://www.nogare.cz/" label="David Nápravník" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://www.linkedin.com/in/barborastrihova" label="Barbora Strihová" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://www.linkedin.com/in/ivan-lysianok" label="Ivan Lysianok" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://www.linkedin.com/in/fogelman" label=" Michal Fogelman" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://github.com/janmarek" label="Jan Marek" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://obchodniuspech.cz" label="Michal Pešat" />
				</p>

				<p>
					<b> FAQ: </b>
					<a href="https://ufal.mff.cuni.cz/ufal-ukraine#faq" rel="noreferrer" target="_blank">Frequently Asked Questions (in Czech)</a><br/>
					For any questions about this Translator, please contact <strong>u4u<Image src={atChar.src} alt="@" width={13} height={13} className={ styles.atChar }/>ufal.mff.cuni.cz</strong> .
				</p>
			</Box>
			<DialogActions>
				<Button onClick={()=>setOpenAboutUs(false)}>Close</Button>
			</DialogActions>
		</Dialog>
		</>
	);
}

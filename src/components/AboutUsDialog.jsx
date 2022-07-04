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
import { useTranslation } from 'next-i18next';

import atChar from '../../public/static/img/at.svg';
import lindatLogo from '../../public/static/img/lindat-logo-violet.svg';
import ufalLogo from '../../public/static/img/ufal-logo.svg';

import styles from "./AboutUsDialog.module.scss"


export default function AboutUsDialog() {
	const [openAboutUs, setOpenAboutUs] = React.useState(false);

	const { t } = useTranslation("aboutUs");
	const tc = useTranslation("common").t;

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
				<p>{t("developedBy")} <b><a href="https://ufal.mff.cuni.cz" rel="noreferrer" target="_blank">{t("UFAL")}</a></b>, {t("MFF")}, {t("UK")} {t("supportedBy")} <a href="https://lindat.mff.cuni.cz" rel="noreferrer" target="_blank">LINDAT/CLARIAH-CZ</a>.</p>

				<p>
					<b>{t("developersTranslation")}: </b><br/>
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/martin-popel" label="Martin Popel" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/jindrich-libovicky" label="Jindřich Libovický" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/jindrich-helcl" label="Jindřich Helcl" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/michal-novak" label="Michal Novák" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/rudolf-rosa" label="Rudolf Rosa" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/zdenek-kasner" label="Zdeněk Kasner" />
				</p>

				<p>
					<b> {t("dataPreparation")}: </b> <br/>
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/lucie-polakova" label="Lucie Poláková" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/jaroslava-hlavacova" label="Jaroslava Hlaváčová" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://martin.majlis.cz" label="Martin Majliš" />
					<Chip className={styles.chip} component="span" variant="outlined" label="Denys Bojko" />
					<Chip className={styles.chip} component="span" variant="outlined" label="Tomáš Musil" />
					<Chip className={styles.chip} component="span" variant="outlined" label="Tereza Chlaňová" />
					<Chip className={styles.chip} component="span" variant="outlined" label="Oxana Čmelíková" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/michal-novak" label="Michal Novák" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/martin-popel" label="Martin Popel" />
					<br/>
					{t("thanksTo")} <a href="https://wiki.korpus.cz/doku.php/en:cnk:intercorp" rel="noreferrer" target="_blank">korpus.cz</a> {t("providingInterCorp")}.<br />
					{t("weThank")} <a href="https://www.ceskepreklady.cz" rel="noreferrer" target="_blank">České překlady</a> {t("forCooperation")}.
				</p>
				
				<p>
					<b> {t("developersBackEnd")}: </b><br/>
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://ufal.mff.cuni.cz/ondrej-kosarko" label="Ondřej Košarko" />
					{t("andTheLindatTeam")}
				</p>

				<p>
					<b> {t("developersFrontEnd")}: </b><br/>
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://www.nogare.cz/" label="David Nápravník" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://www.linkedin.com/in/barborastrihova" label="Barbora Strihová" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://www.linkedin.com/in/ivan-lysianok" label="Ivan Lysianok" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://www.linkedin.com/in/fogelman" label=" Michal Fogelman" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://github.com/janmarek" label="Jan Marek" />
					<Chip className={styles.chip} clickable component="a" variant="outlined" href="https://obchodniuspech.cz" label="Michal Pešat" />
				</p>

				<p>
					<b> {t("FAQ")}: </b>
					<a href="https://ufal.mff.cuni.cz/ufal-ukraine#faq" rel="noreferrer" target="_blank">{t("FAQLong")}</a><br/>
					{t("forQuestionsContactUs")} <strong>u4u<Image src={atChar.src} alt="@" width={13} height={13} className={ styles.atChar }/>ufal.mff.cuni.cz</strong> .
				</p>
			</Box>
			<DialogActions>
				<Button onClick={()=>setOpenAboutUs(false)}>{tc("close")}</Button>
			</DialogActions>
		</Dialog>
		</>
	);
}

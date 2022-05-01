import * as React from "react";
import {
	Tooltip,
	IconButton,
} from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';

import {
	init as initASR,
} from "./asrScripts";

import styles from "./asr.module.scss"


export default function ASR() {
	const [state, setState] = React.useState({
		visible: false,
		active: false,
		error: false,
	});

	React.useEffect(() => { setState({ ...state, visible: navigator !== undefined })}, [])
	
	let ASR

	return (
		<div>
			{state.visible && <Tooltip 
				className={styles.removeButton}
				title="Speach to text"
			>
				<IconButton 
					className={ state.active ? styles.activeAnimation : null }
					size="large"
					color={state.active ? "success" : state.error ? "error" : undefined}
					onClick={() => {
						let newState = !state.active;
						setState({ ...state, active: newState });
						if(ASR == undefined)
							ASR = initASR();

						if(newState === true)
							ASR.start()
						else
							ASR.stop()

						console.log("pressed ASR");
					}}
					sx={{ padding: 0 }}
				>
			<MicIcon fontSize="inherit"/>

				</IconButton>
			</Tooltip>}
		</div>
	);
}

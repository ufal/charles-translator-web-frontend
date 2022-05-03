import * as React from "react";
import {
	Tooltip,
	IconButton,
} from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';

import {
	SpeechRecognition,
} from "./asrScripts";

import styles from "./asr.module.scss"


export default function ASR(props) {
	const [state, setState] = React.useState({
		visible: false,
		active: false,
		error: false,
	});

	React.useEffect(() => { setState({ ...state, visible: navigator !== undefined })}, [])
	
	let ASR = React.useRef(null);

	const initASR = () => {
		let speechRecognition = new SpeechRecognition();
	
		speechRecognition.onresult = function(result) {
			let transcript = result.result.hypotheses[0].transcript;
			if(transcript == '') {
				return;
			}

			if(props.onresult !== undefined)
				props.onresult(transcript)
	
			if(result.final) {
				if(props.onfinal !== undefined)
					props.onfinal(transcript)	
			}
		}
	
		speechRecognition.onstart = function(e) {}
	
		speechRecognition.onend = function(e) {}
	
		speechRecognition.onerror = function(e) {
			console.error("server error: ", e);
			if(props.onerror !== undefined)
				props.onerror(e)	
		}
		
		ASR.current = speechRecognition;
	}

	return (
		<div>
			{state.visible && <Tooltip 
				className = {styles.removeButton}
				title = "Speach to text"
			>
				<IconButton 
					className={ state.active ? styles.activeAnimation : null }
					size = "large"
					color = {state.active ? "success" : state.error ? "error" : undefined}
					onClick = {() => {
						let newState = !state.active;
						setState({ ...state, active: newState });

						if(ASR.current === null)
							initASR();

						if(newState === true)
							ASR.current.start("cs")
						else
							ASR.current.stop()
					}}
					sx = {{ padding: 0 }}
				>
			<MicIcon fontSize = "inherit"/>

				</IconButton>
			</Tooltip>}
		</div>
	);
}

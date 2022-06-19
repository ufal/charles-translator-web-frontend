import * as React from "react";
import {
	Tooltip,
	IconButton,
} from "@mui/material";
import {
	Mic as MicIcon,
	Stop as StopIcon,
} from '@mui/icons-material';

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

	let ASR = React.useRef(null);

	React.useEffect(() => { setState({ ...state, visible: navigator !== undefined })}, []);
	
	React.useEffect(() => {
		if(state.active === false)
			return;

		setState(prevState => { return { ...prevState, active: false } })

		if(ASR && ASR.current)
			ASR.current.stop()

		ASR.current.onresult = (result) => { props.onresult("") }
		initASR();

	}, [props.language]);


	const initASR = () => {
		let speechRecognition = new SpeechRecognition();
	
		speechRecognition.onresult = function(result) {
			let transcript = result.result.hypotheses[0].transcript;
			if(transcript == '')
				return;

			if(props.onresult !== undefined)
				props.onresult(transcript)
	
			if(result.final && props.onfinal !== undefined)
				props.onfinal(transcript)  
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
			{ state.visible && <Tooltip 
				className = { styles.removeButton }
				title = { state.active ? "Stop recording" : "Translate by voice" }
			>
				<IconButton 
					className = { state.active ? styles.activeAnimation : null }
					size = "large"
					color = { state.error ? "error" : undefined }
					onClick = { () => {
						setState(oldState => {
							if(ASR.current === null)
								initASR();
							
							if(oldState.active)
								ASR.current.stop()
							else {
								ASR.current.start(props.language || "cs")
							}
		
							return { ...oldState, active: !oldState.active }
						});
					} }
					sx = {{ padding: 0 }}
				>
					{ !state.active && <MicIcon fontSize = "inherit"/> }
					{ state.active && <StopIcon fontSize = "inherit"/> }
				</IconButton>
			</Tooltip> }
		</div>
	);
}

import React, { useState } from "react";
import {
	Drawer,
	IconButton,
	Button,
	List,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Tooltip,
} from "@mui/material";
import {
	History as HistoryIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from "@mui/icons-material";

import {
	changeStarInHistory,
	removeItemFromHistory,
} from "../history";

import styles from "./TranslationHistory.module.scss"


export function TranslationHistory({ getHistory, onSelect }) {
	const [history, setHistory] = useState([]);
	const [historyOpen, setHistoryOpen] = useState(false);

	React.useEffect(() => {
		if(history.length === 0)
			setHistory(getHistory());
	}, [])

	function open() {
		setHistoryOpen(true);
		setHistory(getHistory());
	}

	function selectItem(item) {
		onSelect(item.text, item.fromLanguageId, item.toLanguageId);
		setHistoryOpen(false);
	}

	return (
		<div>
			<Tooltip title="History">
				<IconButton
					aria-label="history"
					size="large"
					onClick={open}
					sx={{ padding: 0 }}
				>
					<HistoryIcon fontSize="inherit" />
				</IconButton>
			</Tooltip>
			
			<Drawer
				open={historyOpen}
				anchor="bottom"
				PaperProps = {{
					sx:{maxHeight: "60%"}
				}}
				onClose={() => setHistoryOpen(false)}
			>
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader component="div" id="nested-list-subheader" className={styles.header}>
							History
						</ListSubheader>
					}
				>
					{history.sort((a,b) => a.star ? -1 : b.star ? 1 : 0).map((value, index) => (
						<div key={index} className={styles.historyItem}>
							{ value.star ? 
								<Button onClick={()=>{changeStarInHistory(value, false); setHistory(getHistory());}}>
									<StarIcon/>
								</Button>
							:
								<Button onClick={()=>{changeStarInHistory(value, true); setHistory(getHistory());}}>
									<StarBorderIcon/>
								</Button>
							}
							<ListItemButton onClick={() => selectItem(value)}>
								<ListItemText primary={`${value.fromLanguageId} => ${value.toLanguageId} : ${value.text}`} />
							</ListItemButton>
						</div>
					))}
				</List>
			</Drawer>
		</div>
	);
}

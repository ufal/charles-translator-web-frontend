import * as React from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import {
	Close as CloseIcon,
	Help as HelpIcon,
} from "@mui/icons-material";

import styles from "./FAQDialog.module.scss"


export default function FAQDialog() {
	const [openFAQ, setOpenFAQ] = React.useState(false);

	return (
		<>
		<Tooltip title="FAQ">
			<IconButton
				size="small"
				edge="start"
				aria-label="menu"
				sx={{ mr: 1, color: "white" }}
				onClick={() => setOpenFAQ(true)}
			>
				<HelpIcon />
			</IconButton>
		</Tooltip>
		<Dialog
			PaperProps = {{
				sx:{maxWidth: "800px"}
			}}
			open={openFAQ}
			onClose={()=>setOpenFAQ(false)}
		>
			<DialogTitle>
				<IconButton
					className={styles.closeFAQButton}
					onClick={()=>setOpenFAQ(false)}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Box component="span" sx={{ padding: 2 }}>
				<h2>FAQ (Často kladené dotazy)</h2>
				<p>
					nothing here yet, send us mail and be first
				</p>
				
			</Box>
			<DialogActions>
				<Button onClick={()=>setOpenFAQ(false)}>Close</Button>
			</DialogActions>
		</Dialog>
		</>
	);
}

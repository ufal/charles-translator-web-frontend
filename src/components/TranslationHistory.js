import {
  IconButton,
  Drawer,
  Box,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { History as HistoryIcon } from "@mui/icons-material";
import { getHistory } from "../history";

export function TranslationHistory({ getHistory, onSelect }) {
  const [history, setHistory] = useState(getHistory());
  const [historyOpen, setHistoryOpen] = useState(false);

  if (history.length === 0) {
    return null;
  }

  function open() {
    setHistoryOpen(true);
    setHistory(getHistory());
  }

  function selectItem(text) {
    onSelect(text);
    setHistoryOpen(false);
  }

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <IconButton aria-label="history" size="large" onClick={open}>
          <HistoryIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Drawer
        open={historyOpen}
        anchor="bottom"
        onClose={() => setHistoryOpen(false)}
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              History
            </ListSubheader>
          }
        >
          {history.map((text, i) => (
            <ListItemButton key={i} onClick={() => selectItem(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

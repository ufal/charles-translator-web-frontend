import {
  IconButton,
  Drawer,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { History as HistoryIcon } from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  margin-left: auto;
`;

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
      <Container>
        <IconButton
          aria-label="history"
          size="large"
          onClick={open}
          sx={{ padding: 0 }}
        >
          <HistoryIcon fontSize="inherit" />
        </IconButton>
      </Container>
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

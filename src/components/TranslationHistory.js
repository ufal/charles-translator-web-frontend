import {
  IconButton,
  Drawer,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { History as HistoryIcon } from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  margin-left: auto;
`;

export function TranslationHistory({ getHistory, onSelect }) {
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  React.useEffect(() => {
    if(history.length === 0)
      setHistory(getHistory())
  }, [])

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
      </Container>
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

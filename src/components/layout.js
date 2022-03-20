import React, { useState } from "react";
import styled from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Tooltip,
  Dialog,
  Snackbar,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { blue } from "@mui/material/colors";

import AboutUs from "./about-us";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  position: absolute;
`;

const FlagsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const HomeLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
  cursor: pointer;
`;

const Footer = styled.footer`
  margin: auto 0 0;
  padding: 8px;
  font-size: 0.7rem;
  text-align: center;
  background-color: ${blue[100]};
  color: ${blue[900]};
  @media (max-width: 768px) {
    font-size: 0.55rem;
  }
`;

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionSnackbar, setCollectionSnackbar] = useState(true);
  const [openAboutUs, setOpenAboutUs] = React.useState(false);
  const [forOrganizations, setForOrganizations] = React.useState(false);

  React.useEffect(() => setCollectionSnackbar(localStorage.getItem("collectDataConsentValue") !== "true"),[])
  React.useEffect(() => setForOrganizations((localStorage.getItem("organizationName") || "").length !== 0))
  React.useEffect(() => { document.title = "ÚFAL Translator" }, [])

  const allowCollection = () => { 
    setCollectionSnackbar(false);
    if(typeof window !== 'undefined'){
      window.localStorage.setItem(
        "collectDataConsentValue",
        "true"
      );
    }
  }

  return (
    <>
      <CssBaseline />
      <Container>
        <AppBar
          position="static"
          sx={{
            bgcolor: blue,
            "& .MuiToolbar-root": { padding: "4px 0 4px 12px" },
          }}
          elevation={0}
        >
          <Toolbar sx={{ padding: 2 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, ml: 1 }}
              color="white"
            >
              <FlagsContainer>
                <img
                  src="/static/img/ukraine.png"
                  style={{ width: "30px", marginRight: "10px" }}
                />
                <img
                  src="/static/img/czech-republic.png"
                  style={{ width: "30px", marginRight: "10px" }}
                />
                <p>ÚFAL Translator {forOrganizations && "for organizations"}</p>
              </FlagsContainer>
            </Typography>
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
          </Toolbar>
        </AppBar>

        {children}

        <Dialog
          PaperProps = {{
            sx:{maxWidth: "800px"}
          }}
          open={openAboutUs}
          onClose={()=>setOpenAboutUs(false)}
        >
          <DialogTitle>
            <IconButton
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              onClick={()=>setOpenAboutUs(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <AboutUs/>
          <DialogActions>
            <Button onClick={()=>setOpenAboutUs(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={collectionSnackbar}
          message={`Souhlasím s tím, aby Ústav formální a aplikované lingvistiky
            MFF UK ukládal vstupy a výstupy z překladače. V případě souhlasu,
            mohou být anonymizované texty využity pro další vývoj systému.`}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          action={(
            <React.Fragment>
              <Button size="large" onClick={allowCollection}>
                <CheckIcon fontSize="small" />
                SOUHLASÍM
              </Button>
              <Button size="large" onClick={() => setCollectionSnackbar(false)}>
                <CloseIcon fontSize="small" />
                NESOUHLASÍM
              </Button>
            </React.Fragment>
          )}
        />

        <Footer>
          THE LINDAT/CLARIAH-CZ PROJECT (LM2018101; formerly LM2010013,
          LM2015071) IS FULLY SUPPORTED BY THE MINISTRY OF EDUCATION, SPORTS AND
          YOUTH OF THE CZECH REPUBLIC UNDER THE PROGRAMME LM OF LARGE
          INFRASTRUCTURES
        </Footer>
      </Container>
    </>
  );
}

export default Layout;

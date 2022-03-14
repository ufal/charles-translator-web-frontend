import React, { useState } from "react";
import styled from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import Link from "next/link";

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
            <Link href="/">
              <HomeLink>
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
                    <p>ÚFAL Translator</p>
                  </FlagsContainer>
                </Typography>
              </HomeLink>
            </Link>
            <Link href="/settings">
              <a>
                <Tooltip title="About us">
                  <IconButton
                    size="small"
                    edge="start"
                    aria-label="menu"
                    sx={{ mr: 1, color: "white" }}
                    onClick={() => toggleMenu()}
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </a>
            </Link>
          </Toolbar>
        </AppBar>
        {children}
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

import React, { useState } from "react";
import styled from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  position: absolute;
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
            bgcolor: "#0057b7",
            "& .MuiToolbar-root": { padding: "4px 12px" },
          }}
          elevation={0}
        >
          <Toolbar sx={{ padding: 2 }}>
            <img src="/static/img/lindat-logo.svg" style={{ width: "88px" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, ml: 1 }}
              color="white"
            >
              🇺🇦🇨🇿 translator
            </Typography>
            <a href="/settings">
              <IconButton
                size="small"
                edge="start"
                aria-label="menu"
                sx={{ mr: 1, color: "white" }}
                onClick={() => toggleMenu()}
              >
                <InfoIcon />
              </IconButton>
            </a>
          </Toolbar>
        </AppBar>
        {children}
        <Footer>
          THE LINDAT/CLARIAH-CZ PROJECT (LM2018101; formerly LM2010013,
          LM2015071) IS FULLY SUPPORTED BY THE MINISTRY OF EDUCATION, SPORTS AND
          YOUTH OF THE CZECH REPUBLIC UNDER THE PROGRAMME LM OF "LARGE
          INFRASTRUCTURES
        </Footer>
      </Container>
    </>
  );
}

export default Layout;

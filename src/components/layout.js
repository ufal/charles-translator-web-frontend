import React, { useState } from "react";
import styled from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, AppBar, Toolbar, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
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
        <AppBar position="static" sx={{ bgcolor: "#0057b7" }} elevation={0}>
          <Toolbar sx={{ padding: 1 }}>
            <img src="/static/img/lindat-logo.svg" style={{ width: "88px" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, ml: 1 }}
              color="white"
            >
              🇺🇦🇨🇿 translator
            </Typography>
            <IconButton
              size="small"
              edge="start"
              aria-label="menu"
              sx={{ mr: 1, color: "white" }}
              onClick={() => toggleMenu()}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          open={menuOpen}
          anchor="right"
          onClose={() => setMenuOpen(false)}
        >
          banlfbfdalsf
        </Drawer>
        {children}
        <Box
          padding={2}
          sx={{
            backgroundColor: blue[100],
            color: blue[900],
            fontSize: "smaller",
          }}
        >
          THE LINDAT/CLARIAH-CZ PROJECT (LM2018101; formerly LM2010013,
          LM2015071) IS FULLY SUPPORTED BY THE MINISTRY OF EDUCATION, SPORTS AND
          YOUTH OF THE CZECH REPUBLIC UNDER THE PROGRAMME LM OF "LARGE
          INFRASTRUCTURES
        </Box>
      </Container>
    </>
  );
}

export default Layout;

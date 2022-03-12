import styled from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import React, { Fragment } from "react";
import { Typography, AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
`;

function Layout({ children }) {
  return (
    <Fragment>
      <CssBaseline />
      <Container>
        <AppBar position="static" sx={{ bgcolor: "#0057b7" }} elevation={0}>
          <Toolbar sx={{ padding: 1 }}>
            <img src="/static/img/lepsi-logo.svg" style={{ width: "88px" }} />
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
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {children}
        <footer>
          <Typography
            variant="body2"
            gutterBottom
            color="gray"
            sx={{ margin: 2 }}
          >
            THE LINDAT/CLARIAH-CZ PROJECT (LM2018101; formerly LM2010013,
            LM2015071) IS FULLY SUPPORTED BY THE MINISTRY OF EDUCATION, SPORTS
            AND YOUTH OF THE CZECH REPUBLIC UNDER THE PROGRAMME LM OF "LARGE
            INFRASTRUCTURES
          </Typography>
        </footer>
      </Container>
    </Fragment>
  );
}

export default Layout;

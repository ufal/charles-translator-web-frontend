import { TextField } from "@mui/material";
import styled from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";

const Grid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  position: absolute;
  grid-gap: 12px;
  @media (min-width: 1200px) {
    grid-template-rows: 40px 1fr;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 1200px) {
    grid-template-rows: 40px 1fr 1fr;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 100%;
  background: cornflowerblue;
  @media (min-width: 1200px) {
    grid-column: span 2;
  }
`;

const Index = () => (
  <Grid>
    <CssBaseline />
    <Header />
    <TextField
      id="source"
      className="field"
      label="Outlined"
      variant="outlined"
      multiline
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "100%",
        },
      }}
    />
    <TextField
      id="destination"
      className="field"
      label="Outlined"
      variant="outlined"
      multiline
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "100%",
        },
      }}
    />
  </Grid>
);

export default Index;

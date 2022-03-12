import {TextField} from "@mui/material";
import styled from 'styled-components'




const Grid = styled.div`
    display: grid;
  width: 100%;
  height: 100%;
  position: absolute;
  grid-template-rows: 40px 1fr 1fr;
`;

const Header = styled.div`
width: 100%;
  height: 100%;
  background: cornflowerblue;
`;

const Index = () => (
  <Grid>
    <Header/>
      <TextField id="source" label="Outlined" variant="outlined" multiline />
      <TextField id="destination" label="Outlined" variant="outlined" multiline />
  </Grid>
);

export default Index;

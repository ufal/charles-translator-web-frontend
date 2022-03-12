import styled from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import Form from "./form";
import { headerHeight } from "./variables";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Header = styled.div`
  width: 100%;
  height: ${headerHeight};
  background: cornflowerblue;
  @media (min-width: 1200px) {
    grid-column: span 3;
  }
`;

function Index() {

  return (
    <Container>
      <CssBaseline />
      <Header />
      <Form />
    </Container>
  );
}

export default Index;

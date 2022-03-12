import { TextField, IconButton } from "@mui/material";
import styled from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from 'react';
import {translate} from "../api"
import { SwapVert } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Grid = styled.div`
  display: grid;
  height: calc(100% - 52px);
  @media (min-width: 1200px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 40px 1fr;
  }
  @media (max-width: 1200px) {
    grid-template-rows: 1fr 40px 1fr;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 40px;
  background: cornflowerblue;
  @media (min-width: 1200px) {
    grid-column: span 3;
  }
`;

const SwitchButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  align-self: center;
  justify-self: center;
  @media (min-width: 1200px) {
    transform: rotate(90deg);
  }
`;

const fieldStyleOverride = {
  "& .MuiOutlinedInput-root": {
    height: "100%",
  },
};

const Index = () => {
    useEffect(() => {
        translate({
            text: "Як тут працює громадський транспорт?",
            fromLanguage: 'uk',
            toLanguage: 'cs'
        }).then(response => console.log(response.data))
    })
    return
    (<Container>
            <CssBaseline/>
            <Header/>
            <Grid>
                <TextField
                    id="source"
                    label="Outlined"
                    variant="outlined"
                    multiline
                    sx={fieldStyleOverride}
                />
                <SwitchButtonWrapper>
                    <IconButton aria-label="switch languages">
                        <SwapVert/>
                    </IconButton>
                </SwitchButtonWrapper>

                <TextField
                    id="destination"
                    label="Outlined"
                    variant="outlined"
                    multiline
                    sx={fieldStyleOverride}
                />
            </Grid>
        </Container>
    );

}
export default Index;

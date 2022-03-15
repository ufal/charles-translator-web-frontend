import * as React from "react";
import {
  FormControlLabel,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { AboutUsConst } from "../constants/about-us-constsant";
import Divider from "@mui/material/Divider";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

export default function AboutUs() {
  const [state, setState] = React.useState({
    author: localStorage.getItem("organizationName") || "",
  });

  const [privacyTabValue, setPrivacyTabValue] = React.useState("0");


  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => setChecked(localStorage.getItem("collectDataConsentValue") === "true"), [])

  const changeAuthor = (event) => {
    setState({author: event.target.value})
    if(typeof window !== 'undefined'){
      window.localStorage.setItem(
        "organizationName",
        event.target.value
      );
    }
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);

    if(typeof window !== 'undefined'){
      window.localStorage.setItem(
        "collectDataConsentValue",
        JSON.stringify(event.target.checked)
      );
    }
  };

  return (
    <Box component="span" sx={{ p: 2 }}>
      <p><b>Privacy settings</b></p>
      <FormControlLabel
        control={<Checkbox onChange={handleChange} checked={checked} />}
        label={(
          <TabContext value={privacyTabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={(event, newValue) => {setPrivacyTabValue(newValue)}}>
                <Tab label="EN" value="0" />
                <Tab label="CS" value="1" />
                <Tab label="UK" value="2" />
              </TabList>
            </Box>
            <TabPanel value="0"> {AboutUsConst.checkBoxLabel[0]} </TabPanel>
            <TabPanel value="1"> {AboutUsConst.checkBoxLabel[1]} </TabPanel>
            <TabPanel value="2"> {AboutUsConst.checkBoxLabel[2]} </TabPanel>
          </TabContext>
        )}
      />

      <TextField fullWidth id="outlined-basic" label="Organization name (optional)" variant="outlined" onChange={changeAuthor} value={state.author}/>

      <h2>About us</h2>

      <img src="/static/img/ufal-logo.svg"  style={{ width: "100px", marginRight: "10px" }} />
      <img src="/static/img/lindat-logo-violet.svg"  style={{ width: "130px", marginRight: "10px" }} />

      <p>The Translator was developed at the <b><a href="https://ufal.mff.cuni.cz" target="_blank">Institute of Formal and Applied Linguistics</a></b>, Faculty of Mathematics and Physics, Charles University and was supported by the the <a href="https://lindat.mff.cuni.cz" target="_blank">LINDAT/CLARIAH-CZ</a> project.</p>

      <p><b>Development of the traslation system:</b> <a href="https://ufal.mff.cuni.cz/martin-popel" target="_blank">Martin Popel</a>, <a href="https://ufal.mff.cuni.cz/jindrich-libovicky" target="_blank">Jindřich Libovický</a>, <a href="https://ufal.mff.cuni.cz/jindrich-helcl" target="_blank">Jindřich Helcl</a>, <a href="https://ufal.mff.cuni.cz/michal-novak" target="_blank">Michal Novák</a>, <a href="https://ufal.mff.cuni.cz/rudolf-rosa" target="_blank">Rudolf Rosa</a>, <a href="https://ufal.mff.cuni.cz/zdenek-kasner" target="_blank">Zdeněk Kasner</a></p>

      <p><b>Data preparation:</b> Lucie Poláková, <a href="https://martin.majlis.cz">Martin Majliš</a>, Denys Bojko, Tomáš Musil, Tereza Chlaňová, Oxana Čmelíková, Martin Popel<br /> Many thanks to <a href="https://intercorp.korpus.cz/" target="_blank">korpus.cz</a> for providing us with <b>InterCorp v14</b>, a part of the project Czech National Corpus.</p>

      <p>
        <b> Back-end development: </b>
        <a href="https://ufal.mff.cuni.cz/ondrej-kosarko" target="_blank">Ondřej Košarko</a>,&nbsp;
        <a href="https://www.nogare.cz/" target="_blank">David Nápravník</a>&nbsp;
        and the Lindat team
      </p>

      <p>
        <b> Front-end created by: </b>
        <a href="https://www.linkedin.com/in/barborastrihova" target="_blank">Barbora Strihová</a>,&nbsp;
        <a href="https://www.linkedin.com/in/ivan-lysianok" target="_blank">Ivan Lysianok</a>,&nbsp;
        <a href="https://www.linkedin.com/in/fogelman" target="_blank"> Michal Fogelman</a>,&nbsp;
        <a href="https://github.com/janmarek" target="_blank">Jan Marek</a>,&nbsp;
        <a href="https://obchodniuspech.cz" target="_blank">Michal Pešat</a>
      </p>

    </Box>
  );
}

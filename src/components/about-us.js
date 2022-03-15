import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { AboutUsConst } from "../constants/about-us-constsant";
import Divider from "@mui/material/Divider";

export default function AboutUs() {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => setChecked(localStorage.getItem("collectDataConsentValue") === "true"))

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
        label={AboutUsConst.checkBoxLabel}
      />

      <Divider sx={{ marginTop: 2 }}></Divider>

      <h2>About us</h2>

      <img src="/static/img/ufal-logo.svg"  style={{ width: "100px", marginRight: "10px" }} />
      <img src="/static/img/lindat-logo-violet.svg"  style={{ width: "130px", marginRight: "10px" }} />

      <p>The Translator was developed at the <b><a href="https://ufal.mff.cuni.cz">Institute of Formal and Applied Linguistics</a></b>, Faculty of Mathematics and Physics, Charles University and was supported by the the <a href="https://lindat.mff.cuni.cz" target="_blank">LINDAT/CLARIAH-CZ</a> project.</p>

      <p><b>Development of the traslation system:</b> <a href="https://ufal.mff.cuni.cz/martin-popel" target="_blank">Martin Popel</a>, <a href="https://ufal.mff.cuni.cz/jindrich-libovicky" target="_blank">Jindřich Libovický</a>, <a href="https://ufal.mff.cuni.cz/jindrich-helcl" target="_blank">Jindřich Helcl</a>, <a href="https://ufal.mff.cuni.cz/michal-novak" target="_blank">Michal Novák</a>, <a href="https://ufal.mff.cuni.cz/rudolf-rosa" target="_blank">Rudolf Rosa</a>, <a href="https://ufal.mff.cuni.cz/zdenek-kasner" target="_blank">Zdeněk Kasner</a></p>

      <p><b>Data preparation:</b> Lucie Poláková, <a href="https://martin.majlis.cz">Martin Majliš</a>, Denys Bojko, Tomáš Musil, Tereza Chlaňová, Oxana Čmelíková, Martin Popel<br /> Many thanks to <a href="https://intercorp.korpus.cz/" target="_blank">korpus.cz</a> for providing us with <b>InterCorp v14</b>, a part of the project Czech National Corpus.</p>

      <p><b>Back-end development:</b> <a href="https://ufal.mff.cuni.cz/ondrej-kosarko">Ondřej Košarko</a> and the Lindat team</p>

      <p><b>Front-end created by:</b> <a href="https://www.linkedin.com/in/barborastrihova" target="_blank">Barbora Strihová</a>, <a href="https://www.linkedin.com/in/ivan-lysianok" target="_blank">Ivan Lysianok</a>, <a href="https://www.linkedin.com/in/fogelman" target="_blank"> Michal Fogelman</a>, <a href="https://github.com/janmarek" target="_blank">Jan Marek</a>, <a href="https://obchodniuspech.cz" target="_blank">Michal Pešat</a></p>

    </Box>
  );
}

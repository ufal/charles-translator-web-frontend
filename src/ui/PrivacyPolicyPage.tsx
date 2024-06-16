import { Typography, List, ListItem, Link } from "@mui/material";

export function PrivacyPolicyPage() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Zásady ochrany soukromí
      </Typography>
      <Typography variant="body1" gutterBottom>
        Matematicko-fyzikální fakulta Univerzity Karlovy (Správce) ve vztahu k
        ochraně soukromí ctí následující zásady:
      </Typography>
      <List sx={{ marginLeft: "2em", listStyleType: "disc" }}>
        <ListItem sx={{ display: "list-item" }}>
          <Typography variant="body1" gutterBottom>
            respektujeme soukromí našich uživatelů, této oblasti věnujeme
            odpovídající pozornost a podnikáme všechny příslušné kroky k tomu,
            abychom údaje o našich uživatelích řádně zabezpečili a ochránili je
            před zneužitím;
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <Typography variant="body1" gutterBottom>
            dodržujeme platné právní předpisy týkající se ochrany osobních
            údajů.
          </Typography>
        </ListItem>
      </List>
      <Typography variant="body1" gutterBottom>
        Při používání aplikace Charles Translator for Ukraine shromažďujeme
        statistické údaje včetně IP adres uživatelů, prostřednictvím nichž
        získáváme představu o tom, jakým způsobem je aplikace využívána. Díky
        těmto údajům můžeme pracovat na neustálém zlepšování aplikace. Takto
        shromážděné údaje následně používáme pro interní analytické účely. Pro
        shromažďování analytických dat používáme službu{" "}
        <Link href="https://analytics.google.com/">Google Analytics</Link>.
        Analytiky jsou sbírány také za pomocí cookies.
      </Typography>
      <Typography variant="body1" gutterBottom>
        V případě vašeho dobrovolného souhlasu uchováváme veškerý obsah vámi
        zadaný do aplikace za účelem překladu společně s překladem vygenerovaným
        aplikací (dále jen souhlas s uchováváním obsahu). Tento obsah pak
        využíváme k výzkumu a ke zlepšování aplikace a za tímto účelem může být
        v pseudonymizované podobě (kdy jsou informace osobního charakteru
        zaměněny za jiný obsah) zveřejněn. Pokud dobrovolně vyplníte
        identifikátor (název organizace), uchováváme také tento identifikátor.
        Souhlas s uchováváním obsahu můžete kdykoli odvolat v nastavení aplikace
        a následně zadaný obsah již nebudeme ukládat do databáze. Již uložený
        obsah je možné vymazat z naší databáze, pokud o to písemně požádáte a
        dostatečně jednoznačně identifikujete obsah, který má být vymazán (např.
        pomocí identifikátoru - názvu organizace).
      </Typography>
      <Typography variant="body1" gutterBottom>
        V případě jakýchkoli dotazů týkajících se našich zásad ochrany soukromí
        nás neváhejte kontaktovat na e-mailu{" "}
        <Link href="mailto:u4u@ufal.mff.cuni.cz">u4u@ufal.mff.cuni.cz</Link>.
      </Typography>
    </>
  );
}

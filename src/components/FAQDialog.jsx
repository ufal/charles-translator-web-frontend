import * as React from 'react'
import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton, Tooltip } from '@mui/material'
import { Close as CloseIcon, Help as HelpIcon } from '@mui/icons-material'

import * as styles from './FAQDialog.module.scss'

export default function FAQDialog() {
    const [openFAQ, setOpenFAQ] = React.useState(false)

    return (
        <>
            <Tooltip title="FAQ">
                <IconButton
                    size="small"
                    edge="start"
                    aria-label="menu"
                    sx={{ mr: 1, color: 'white' }}
                    onClick={() => setOpenFAQ(true)}
                >
                    <HelpIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                PaperProps={{
                    sx: { maxWidth: '800px' },
                }}
                open={openFAQ}
                onClose={() => setOpenFAQ(false)}
            >
                <DialogTitle>
                    Frequently Asked Questions (in Czech)
                    <IconButton
                        className={styles.closeFAQButton}
                        onClick={() => setOpenFAQ(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Box component="span" sx={{ padding: 2 }}>
                    <p>
                        <strong>Jsou překlady vždy správně?</strong>
                        <br />
                        Ne. Viz <a href="https://github.com/ufal/uk-cs-translator/issues/34">známé chyby</a>.
                    </p>
                    <p>
                        <strong>Co mám dělat, když narazím na chybu v překladu?</strong>
                        <br />
                        <a href="https://github.com/ufal/uk-cs-translator/issues/34">Podívejte se</a>, zda o této chybě
                        už víme. Chyby v málo častých slovech či významech je těžké opravit. Pokud ale narazíte na
                        nějakou častou či vážnou chybu, napište nám <a href="mailto:u4u@ufal.mff.cuni.cz">e-mail</a>{' '}
                        nebo ji nahlašte jako issue na{' '}
                        <a href="https://github.com/ufal/uk-cs-translator/issues">GitHubu</a>.
                    </p>
                    <p>
                        <strong>Je překladač dostupný jako aplikace pro mobilní telefon?</strong>
                        <br />
                        Ano, aplikace pro Android je ke stažení na{' '}
                        <a href="https://play.google.com/store/apps/details?id=cz.cuni.mff.ufal.translator">
                            Google Play
                        </a>
                        . Pro iOS bohužel nemáme vývojáře.
                    </p>
                    <p>
                        <strong>Jaké výhody má aplikace pro Android oproti webu?</strong>
                        <br />
                        Kvalita překladu je stejná. Web i aplikace pro Android potřebují k překladu připojení k
                        internetu (offline překlad zatím neplánujeme). Aplikace umožňuje překládat mluvenou řeč (ikona
                        mikrofonu) a přečíst přeložený text.
                    </p>
                    <p>
                        <strong>Umíte překládat i ruštinu?</strong>
                        <br />
                        Zatím ne, ale plánujeme ji přidat. Když se nyní místo ukrajinštiny vloží texty v ruštině,
                        překlady do češtiny budou nepoužitelné.
                    </p>
                    <p>
                        <strong>Umíte překládat webové stránky, dokumenty ve Wordu atd.?</strong>
                        <br />
                        Zatím ne. Překladač je uzpůsoben pro překládání prostého textu, tj. bez formátovacích značek
                        (HTML, MarkDown apod.). Přítomnost formátovacích značek může snížit kvalitu překladu.
                    </p>
                    <p>
                        <strong>Jak mohu psát ukrajinskou azbuku na české klávesnici?</strong>
                        <br />
                        Zatím je tedy jedinou možností nainstalovat si ukrajinskou klávesnici v operačním systému a
                        nastavit její zobrazení na obrazovce (tzv. on-screen virtual keyboard), viz např. tento&nbsp;
                        <a href="https://support.microsoft.com/en-us/windows/use-the-on-screen-keyboard-osk-to-type-ecbb5e08-5b4e-d8c8-f794-81dbf896267a">
                            návod pro Windows
                        </a>
                        .<br />
                        Viz též{' '}
                        <a href="https://github.com/ufal/uk-cs-translator/issues/33">
                            https://github.com/ufal/uk-cs-translator/issues/33
                        </a>
                    </p>
                    <p>
                        <strong>Co se slovy, která váš překladač překládá špatně?</strong>
                        <br />
                        Pro vyhledání významu jednotlivých slov se lépe hodí klasické tištěné slovníky či jejich
                        elektronické verze, např.{' '}
                        <a href="https://slovniky.lingea.cz/ukrajinsko-cesky/">
                            https://slovniky.lingea.cz/ukrajinsko-cesky/
                        </a>
                    </p>
                    <p>
                        <strong>Mohu překladač použít komerčně?</strong>
                        <br />
                        Zatím ne. Licenční podmínky části trénovacích dat nám to neumožňují. Můžete nám ale{' '}
                        <a href="mailto:u4u@ufal.mff.cuni.cz">napsat</a> a dáme Vám vědět, až budeme mít verzi
                        použitelnou i komerčně.
                    </p>
                    <p>
                        <strong>Je překladač dostupný přes API?</strong>
                        <br />
                        Ano, ale pouze pro registrované uživatele. <a href="mailto:u4u@ufal.mff.cuni.cz">
                            Napište
                        </a>{' '}
                        nám, k čemu chcete překladač využít.
                    </p>
                </Box>
                <DialogActions>
                    <Button onClick={() => setOpenFAQ(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

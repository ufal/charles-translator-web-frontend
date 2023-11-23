import Layout from './components/layout';
import Form from './components/form';
import { createTheme, ThemeProvider } from '@mui/material/styles'

/*
    THEME COLORS
    ------------

    #f1f2f2 - Appbar Gray
    #ff1c3f - Red logo text color (the primary color)
    #d60000 - "This version is not public" bar red color (danger color)
*/

export function Application() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#ff1c3f'
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Form />
            </Layout>
        </ThemeProvider>
    );
}
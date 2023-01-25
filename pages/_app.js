import Head from 'next/head'
import { blue } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Layout from '../src/components/layout'

import favicon from '../public/static/img/favicon.ico'

export default function MyApp({ Component, pageProps }) {
    const theme = createTheme({
        palette: {
            primary: 
			{ 
				main: '#F1F2F2',
				light: '#fff',
				dark: '#D22D40',  
			},
			secondary: {main: '#000'},
        },
    })
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="theme-color" content="#F1F2F2" />
                <meta name="description" content="Charles Translator" />
                <title>Charles Translator</title>
                <link rel="shortcut icon" href={favicon.src} />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    )
}

import Head from 'next/head';
import { blue } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import '../i18n';
import Layout from "../src/components/layout";

import favicon from '../public/static/img/favicon.ico';


export default function MyApp({ Component, pageProps }) {
	const theme = createTheme({
		palette: {
			primary: blue,
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="theme-color" content="#2196F3" />
				<meta name="description" content="Charles Translator for Ukraine"/>
	            <title>Charles Translator for Ukraine</title>
	            <link rel="shortcut icon" href={favicon.src} />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

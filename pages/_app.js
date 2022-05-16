import Head from 'next/head';
import { blue } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
				<title>Charles Translator for Ukraine</title>
				<meta name="theme-color" content="#2196F3" />
				<link rel="shortcut icon" href={favicon.src} />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

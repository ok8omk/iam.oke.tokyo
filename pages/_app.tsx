import { FC } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { cyan } from "@material-ui/core/colors";
import Header from "../components/Header";
import "highlight.js/styles/github.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fafafa",
    },
    secondary: cyan,
  },
  typography: {
    fontSize: 12,
  },
});

const useStyles = makeStyles({
  container: {
    paddingTop: 64,
  },
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Header />
        <div className={classes.container}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;

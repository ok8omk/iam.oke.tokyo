import { FC, useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Header, Footer } from "../components/pages/_app";
import { pageview } from "../lib/gtag";
import Router from "next/router";
import "prismjs/themes/prism-okaidia.css";
import "../style.css";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

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
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default App;

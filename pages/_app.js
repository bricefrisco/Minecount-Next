import { UserProvider } from "@auth0/nextjs-auth0";
import Head from "next/head";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
};

export default MyApp;

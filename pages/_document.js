import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          href="https://fonts.cdnfonts.com/css/minecraftia"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <body className="bg-neutral-900 text-slate-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

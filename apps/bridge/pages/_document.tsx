import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/document/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/document/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/document/favicon-16x16.png" />
        <link rel="manifest" href="/document/site.webmanifest" />
        <link rel="mask-icon" href="/document/safari-pinned-tab.svg" color="#0052ff" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Base | Superchain Bridges" />
        <meta
          property="og:description"
          content="Superchain Bridges help you bridge to and from Base."
        />
        <meta property="og:image" content="https://bridge.base.org/images/base-open-graph.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="base.org" />
        <meta name="twitter:title" content="Base | Superchain Bridges" />
        <meta
          name="twitter:description"
          content="Superchain Bridges help you bridge to and from Base."
        />
        <meta name="twitter:image" content="https://bridge.base.org/images/base-open-graph.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-site-verification"
          content="lqwNRCxYlFLIcX9EiKAvE4k4ZT8JGpdWgehEIPA7y1Y"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

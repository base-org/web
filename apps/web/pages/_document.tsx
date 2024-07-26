import { Head, Html, Main, NextScript } from 'next/document';

type CustomDocumentProps = {
  ogData: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
};

export default function Document({}: CustomDocumentProps) {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/document/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/document/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/document/favicon-16x16.png" />
        <link rel="manifest" href="/document/site.webmanifest" />
        <link rel="mask-icon" href="/document/safari-pinned-tab.svg" color="#0052ff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-site-verification"
          content="lqwNRCxYlFLIcX9EiKAvE4k4ZT8JGpdWgehEIPA7y1Y"
        />
      </Head>
      <body className="flex min-h-screen flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

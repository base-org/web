import { Head, Html, Main, NextScript, DocumentProps, DocumentContext } from 'next/document';

interface CustomDocumentProps {
  metadata: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
}

export default function Document({ metadata }: CustomDocumentProps) {
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
        <meta property="og:url" content={metadata.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="base.org" />
        <meta property="twitter:url" content={metadata.url} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
      </Head>
      <body className="flex min-h-screen flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (
  ctx: DocumentContext,
): Promise<CustomDocumentProps & DocumentProps> => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  const { pathname } = ctx;

  // Define default metadata
  let title = 'Base';
  let description =
    'Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.';
  let image = 'https://base.org/images/base-open-graph.png';
  let url = 'https://base.org';

  // Customize metadata based on the current page
  switch (pathname) {
    case '/about':
      title = 'Base | About';
      description =
        'From the beginning, our secret master plan has been clear and consistent: create an open financial system that increases economic freedom globally by moving deliberately through four phases.';
      image = 'https://base.org/images/base-open-graph.png';
      url = 'https://base.org/about';
      break;
    case '/bootcamp':
      title = 'Base | Bootcamp';
      description =
        'Base Bootcamp is an async, cohort-based training program designed to turn web developers into Smart Contract developers.';
      image = 'https://base.org/images/base-open-graph.png';
      url = 'https://base.org/bootcamp';
      break;
    case '/cookie-policy':
      title = 'Base | Cookie Policy';
      description = 'This Cookie Policy explains how Base uses cookies and similar technologies';
      image = 'https://base.org/images/base-open-graph.png';
      url = 'https://base.org/cookie-policy';
      break;
    case '/ecosystem':
      title = 'Base | Ecosystem';
      description = 'An overview of apps and integrations in the Base ecosystem.';
      image = 'https://base.org/images/base-open-graph.png';
      url = 'https://base.org/base-ecosystem';
      break;
    case '/jobs':
      title = 'Base | Jobs';
      description = 'Learn about new opportunities to apply to join the Base team.';
      image = 'https://base.org/images/base-open-graph.png';
      url = 'https://base.org/jobs';
      break;
    case '/third-party-cookies':
      title = 'Base | Third Party Cookies';
      description = 'This page lists the companies that use cookies and other technologies.';
      image = 'https://base.org/images/base-open-graph.png';
      url = 'https://base.org/third-party-cookies';
      break;
    // Add more cases for other pages
    default:
      break;
  }

  return {
    ...initialProps,
    metadata: {
      title,
      description,
      image,
      url,
    },
  };
};

import '@coinbase/onchainkit/styles.css';
import './global.css';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

import AppProviders from 'apps/web/app/AppProviders';
import { Layout } from 'apps/web/src/components/Layout/Layout';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function StaticApp({ Component, pageProps }: AppPropsWithLayout) {
  const ogData = {
    title: 'Base',
    description:
      'Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.',
    image: 'https://base.org/images/base-open-graph.png',
    url: 'https://base.org',
  };

  return (
    <>
      <Head>
        {/* Open-graph */}
        <meta key="og:url" property="og:url" content={ogData.url} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={ogData.title} />
        <meta key="og:description" property="og:description" content={ogData.description} />
        <meta key="og:image" property="og:image" content={ogData.image} />

        {/* Twitter */}
        <meta key="twitter:site" name="twitter:site" content="@base" />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />

        {/* Default */}
        <title key="title">{ogData.title}</title>
        <meta key="description" content={ogData.description} name="description" />
      </Head>
      <AppProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProviders>
    </>
  );
}

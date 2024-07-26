import AnalyticsProvider from 'apps/web/contexts/Analytics';
import RegistrationProvider from 'apps/web/src/components/Basenames/RegistrationContext';
import RegistrationFlow from 'apps/web/src/components/Basenames/RegistrationFlow';
import { Layout, NavigationType } from 'apps/web/src/components/Layout/Layout';
import Head from 'next/head';
import { ReactElement } from 'react';

// Do not change this unless you know what you're doing (it'll break analytics)
const usernameRegistrationAnalyticContext = 'username_registration';

export function Usernames() {
  const ogData = {
    title: 'Basenames',
    description:
      'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.',
    image: 'https://base.org/images/base-open-graph.png', // todo: replace with shelley's cover
    url: 'https://base.org/names',
  };
  return (
    <>
      <Head>
        {/* Open-graph */}
        <meta key="og:url" property="og:url" content={ogData.url} />
        <meta key="og:title" property="og:title" content={ogData.title} />
        <meta key="og:description" property="og:description" content={ogData.description} />
        <meta key="og:image" property="og:image" content={ogData.image} />

        {/* Default */}
        <title key="title">{ogData.title}</title>
        <meta key="description" content={ogData.description} name="description" />
      </Head>
      <AnalyticsProvider context={usernameRegistrationAnalyticContext}>
        <RegistrationProvider>
          <RegistrationFlow />
        </RegistrationProvider>
      </AnalyticsProvider>
    </>
  );
}

Usernames.getLayout = function getLayout(page: ReactElement) {
  return <Layout navigationType={NavigationType.Username}>{page}</Layout>;
};

export default Usernames;

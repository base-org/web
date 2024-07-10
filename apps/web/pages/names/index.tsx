import RegistrationProvider from 'apps/web/src/components/Basenames/RegistrationContext';
import RegistrationFlow from 'apps/web/src/components/Basenames/RegistrationFlow';
import { Layout, NavigationType } from 'apps/web/src/components/Layout/Layout';
import Head from 'next/head';
import { ReactElement } from 'react';

export function Usernames() {
  return (
    <>
      <Head>
        <title>Base | names</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <RegistrationProvider>
        <RegistrationFlow />
      </RegistrationProvider>
    </>
  );
}

Usernames.getLayout = function getLayout(page: ReactElement) {
  return <Layout navigationType={NavigationType.Username}>{page}</Layout>;
};

export default Usernames;

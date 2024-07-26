import AnalyticsProvider from 'apps/web/contexts/Analytics';
import RegistrationProvider from 'apps/web/src/components/Basenames/RegistrationContext';
import RegistrationFlow from 'apps/web/src/components/Basenames/RegistrationFlow';
import { Layout, NavigationType } from 'apps/web/src/components/Layout/Layout';
import { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';
import Head from 'next/head';
import { ReactElement, useCallback } from 'react';
import { base } from 'viem/chains';
import { useSwitchChain, useChainId } from 'wagmi';
// Do not change this unless you know what you're doing (it'll break analytics)
const usernameRegistrationAnalyticContext = 'username_registration';

export function Usernames() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  useCallback(() => {
    if (!chainId || !switchChain) {
      return;
    }
    if (!supportedChainIds.includes(chainId)) {
      switchChain({ chainId: base.id });
    }
  }, [chainId, switchChain]);
  return (
    <>
      <Head>
        <title>Basenames</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
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

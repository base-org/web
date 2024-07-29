import RegistrationProviders from 'apps/web/app/(basenames)/names/RegistrationProviders';
import RegistrationFlow from 'apps/web/src/components/Basenames/RegistrationFlow';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Basenames`,
  description:
    'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.',
  openGraph: {
    title: `Basenames`,
    url: `/`,
  },
};

export default function Page() {
  return (
    <RegistrationProviders>
      <RegistrationFlow />
    </RegistrationProviders>
  );
}

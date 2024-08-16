import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import RegistrationProviders from 'apps/web/app/(basenames)/names/RegistrationProviders';
import ErrorsProvider from 'apps/web/contexts/Errors';
import RegistrationFlow from 'apps/web/src/components/Basenames/RegistrationFlow';
import basenameCover from './basename_cover.png';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Claim a basename today!',
    },
  ],
  image: {
    src: `http://localhost:3000/images/basenames/contract-uri/feature-image.png`,
  },
  postUrl: `http://localhost:3000/api/basenames/frame/mint`,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Basenames`,
  description:
    'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.',
  openGraph: {
    title: `Basenames`,
    url: `/names`,
    images: [basenameCover.src],
  },
  twitter: {
    site: '@base',
    card: 'summary_large_image',
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
  return (
    <ErrorsProvider context="registration">
      <RegistrationProviders>
        <Suspense>
          <RegistrationFlow />
        </Suspense>
      </RegistrationProviders>
    </ErrorsProvider>
  );
}

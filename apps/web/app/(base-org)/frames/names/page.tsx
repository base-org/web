import type { Metadata } from 'next';
import basenameCover from 'apps/web/app/(basenames)/names/basename_cover.png';
import { initialFrame } from 'apps/web/pages/api/basenames/frame/frameResponses';

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
    ...initialFrame,
  },
};

export default async function NameFrame() {
  return <div>Hello Neo</div>;
}

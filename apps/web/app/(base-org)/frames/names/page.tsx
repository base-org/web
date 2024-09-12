import type { Metadata } from 'next';
import Image from 'apps/web/node_modules/next/image';
import Link from 'apps/web/node_modules/next/link';
import initialFrameImage from 'apps/web/pages/api/basenames/frame/assets/initial-image.png';
import { initialFrame } from 'apps/web/pages/api/basenames/frame/frameResponses';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Basenames | Frame`,
  description:
    'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.',
  openGraph: {
    title: `Basenames | Frame`,
    url: `/frames/names`,
    images: [initialFrameImage.src],
  },
  twitter: {
    site: '@base',
    card: 'summary_large_image',
  },
  other: {
    ...(initialFrame as Record<string, string>),
  },
};

export default async function NameFrame() {
  return (
    <div className="flex w-full flex-col items-center bg-black pb-[96px]">
      <div className="flex h-screen w-full max-w-[1440px] flex-col items-center justify-center gap-12 px-8 py-8 pt-28">
        <div className="relative flex aspect-[993/516] h-auto w-full max-w-[1024px] flex-col items-center">
          <Link href="/names">
            <Image src={initialFrameImage.src} alt="Claim a basename today" fill />
          </Link>
        </div>
      </div>
    </div>
  );
}

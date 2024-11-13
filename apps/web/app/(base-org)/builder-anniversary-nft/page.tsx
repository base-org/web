import CryptoProviders from 'apps/web/app/CryptoProviders';
import { BuilderNftHero } from 'apps/web/src/components/BuilderNft/BuilderNftHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Builder NFT`,
  openGraph: {
    title: `Base | Builder NFT`,
    url: `/builder-anniversary-nft`,
  },
};

export default async function About() {
  return (
    <main className="flex w-full flex-col items-center bg-black">
      <CryptoProviders>
        <BuilderNftHero />
      </CryptoProviders>
    </main>
  );
}

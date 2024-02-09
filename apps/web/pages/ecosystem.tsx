import EcosystemHeroLogos from 'apps/web/public/images/ecosystem-hero-logos-new.png';
import { Divider } from 'apps/web/src/components/Divider/Divider';
import { List } from 'apps/web/src/components/Ecosystem/List';
import { Button } from 'apps/web/src/components/Button/Button';
import Head from 'next/head';
import Image from 'next/image';

function EcosystemHero() {
  return (
    <div className="mt-[-96px] flex w-full flex-col items-center bg-black pb-[96px]">
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-12 px-8 py-8 pt-28 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <h1 className="font-display text-3xl text-white md:text-5xl lg:text-6xl">
            Base ecosystem
          </h1>
          <p className="font-display text-xl text-white md:text-2xl lg:text-3xl">
            An overview of apps and integrations in the Base ecosystem.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScKCOjB4wFmb7u-1VpgMZOGLYq4GUBGt3AwQKqUAlTgjnucGQ/viewform"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button variant="primary" className="w-full md:w-64">
              Apply
            </Button>
          </a>
        </div>
        <div className="flex w-full md:w-1/2 md:justify-end">
          <Image className="-mr-16" src={EcosystemHeroLogos} alt="ecosystem dapp logos" />
        </div>
      </div>
    </div>
  );
}

export default function Ecosystem() {
  return (
    <div>
      <Head>
        <title>Base | Ecosystem</title>
        <meta
          content="Base is a secure, low-cost, developer-friendly Ethereum L2 built to bring the next billion users to web3."
          name="description"
        />
        <meta property="og:site_name" content="Base" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Base | Ecosystem" />
        <meta
          property="og:description"
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
        />
        <meta property="og:url" content="https://base.org/ecosystem" />
        <meta property="og:image" content="https://base.org/images/base-open-graph.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Base | Ecosystem" />
        <meta
          name="twitter:description"
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
        />
        <meta name="twitter:url" content="https://base.org/ecosystem" />
        <meta name="twitter:image" content="https://base.org/images/base-open-graph.png" />
        <meta name="twitter:site" content="Base | Ecosystem" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <main className="flex w-full flex-col items-center bg-black">
        <EcosystemHero />
        <Divider />
        <List />
      </main>
    </div>
  );
}

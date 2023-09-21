import Head from 'next/head';
import { Divider } from '../src/components/Divider/Divider';
import { HowItWorks } from '../src/components/Bootcamp/HowItWorks';
import { WhatsIncluded } from '../src/components/Bootcamp/WhatsIncluded';
import { Dates } from '../src/components/Bootcamp/Dates';
import { Cost } from '../src/components/Bootcamp/Cost';
import { Hero } from '../src/components/Bootcamp/Hero';
import { FaqSidebar } from '../src/components/Bootcamp/Faq/FaqSidebar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Base</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
        <meta property="og:site_name" content="Base" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Base" />
        <meta
          property="og:description"
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
        />
        <meta property="og:url" content="https://base.org" />
        <meta property="og:image" content="https://base.org/images/base-open-graph.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Base" />
        <meta
          name="twitter:description"
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
        />
        <meta name="twitter:url" content="https://base.org" />
        <meta name="twitter:image" content="https://base.org/images/base-open-graph.png" />
        <meta name="twitter:site" content="Base" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Hero />
      <main className="flex w-full flex-col items-center bg-black">
        <HowItWorks />
        <Divider />
        <Dates />
        <Divider />
        <WhatsIncluded />
        <Divider />
        <Cost />
        <Divider />
        <FaqSidebar />
      </main>
    </>
  );
}

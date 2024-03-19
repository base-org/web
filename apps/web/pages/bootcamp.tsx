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
          content="Base Bootcamp is a cohort-based training program hosted by Coinbase engineers, designed to turn senior-level developers into Smart Contract developers."
          name="description"
        />
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

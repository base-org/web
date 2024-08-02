import { Hero } from 'apps/web/src/components/Bootcamp/Hero';
import { Cost } from 'apps/web/src/components/Bootcamp/Cost';
import { Dates } from 'apps/web/src/components/Bootcamp/Dates';
import { FaqSidebar } from 'apps/web/src/components/Bootcamp/Faq/FaqSidebar';
import { HowItWorks } from 'apps/web/src/components/Bootcamp/HowItWorks';
import { WhatsIncluded } from 'apps/web/src/components/Bootcamp/WhatsIncluded';
import { Divider } from 'apps/web/src/components/Divider/Divider';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Bootcamp`,
  openGraph: {
    title: `Base | Bootcamp`,
    url: `/bootcamp`,
  },
};

export default async function Bootcamp() {
  return (
    <>
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

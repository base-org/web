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

// import Head from 'next/head';
// import { Divider } from '../src/components/Divider/Divider';
// import { HowItWorks } from '../src/components/Bootcamp/HowItWorks';
// import { WhatsIncluded } from '../src/components/Bootcamp/WhatsIncluded';
// import { Dates } from '../src/components/Bootcamp/Dates';
// import { Cost } from '../src/components/Bootcamp/Cost';
// import { Hero } from '../src/components/Bootcamp/Hero';
// import { FaqSidebar } from '../src/components/Bootcamp/Faq/FaqSidebar';

// export default function Home() {
//   const ogData = {
//     title: 'Base | Bootcamp',
//     description:
//       'Base Bootcamp is an async, cohort-based training program designed to turn web developers into Smart Contract developers.',

//     url: 'https://base.org/bootcamp',
//   };

//   return (
//     <>
//       <Head>
//         {/* Open-graph */}
//         <meta key="og:url" property="og:url" content={ogData.url} />
//         <meta key="og:title" property="og:title" content={ogData.title} />
//         <meta key="og:description" property="og:description" content={ogData.description} />

//         {/* Default */}
//         <title key="title">{ogData.title}</title>
//         <meta key="description" content={ogData.description} name="description" />
//       </Head>
//       <Hero />
//   <main className="flex w-full flex-col items-center bg-black">
//     <HowItWorks />
//     <Divider />
//     <Dates />
//     <Divider />
//     <WhatsIncluded />
//     <Divider />
//     <Cost />
//     <Divider />
//     <FaqSidebar />
//   </main>
//     </>
//   );
// }

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const JobsList = dynamic(async () => import('apps/web/src/components/Jobs/JobsList'));

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Jobs`,
  openGraph: {
    title: `Base | Jobs`,
    url: `/jobs`,
  },
};

export default async function Jobs() {
  return (
    <main className="mt-[-96px] flex w-full grow flex-col items-center bg-black">
      <section className="mb-[140px] mt-[100px] flex w-full max-w-[1440px] flex-col px-8 pb-10 sm:mt-[150px]">
        <h1 className="font-display text-3xl text-white md:text-4xl lg:basis-1/2 lg:text-5xl">
          Join our team
        </h1>
        <div className="flex flex-col font-display text-sm text-white lg:text-xl">
          <JobsList />
        </div>
      </section>
    </main>
  );
}

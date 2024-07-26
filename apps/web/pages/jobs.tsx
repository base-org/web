import dynamic from 'next/dynamic';
import Head from 'next/head';

// load JobsList dynamically to avoid SSR
const JobsList = dynamic(async () => import('apps/web/src/components/Jobs/JobsList'));

export default function Jobs() {
  const ogData = {
    title: 'Base | Jobs',
    description: 'Learn about new opportunities to apply to join the Base team.',
    url: 'https://base.org/jobs',
  };
  return (
    <>
      <Head>
        {/* Open-graph */}
        <meta key="og:url" property="og:url" content={ogData.url} />
        <meta key="og:title" property="og:title" content={ogData.title} />
        <meta key="og:description" property="og:description" content={ogData.description} />

        {/* Default */}
        <title key="title">{ogData.title}</title>
        <meta key="description" content={ogData.description} name="description" />
      </Head>
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
    </>
  );
}

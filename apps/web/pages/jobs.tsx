import { JobsList, JobType } from 'apps/web/src/components/Jobs/JobsList';
import getConfig from 'next/config';
import Head from 'next/head';

const { publicRuntimeConfig } = getConfig();

export async function getServerSideProps() {
  const res = await fetch(
    `${publicRuntimeConfig.greenhouseApiUrl}/boards/basejobs/jobs?content=true`,
  );
  const { jobs } = (await res.json()) as { jobs: JobType[] };
  return {
    props: {
      jobs,
    },
  };
}

type JobsProps = {
  jobs: JobType[];
};

export default function Jobs({ jobs }: JobsProps) {
  return (
    <>
      <Head>
        <title>Base | Jobs</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <main className="mt-[-96px] flex w-full grow flex-col items-center bg-black">
        <section className="mt-[100px] mb-[140px] flex w-full max-w-[1440px] flex-col px-8 pb-10 sm:mt-[150px]">
          <h1 className="font-display text-3xl text-white md:text-4xl lg:basis-1/2 lg:text-5xl">
            Join our team
          </h1>
          <div className="flex flex-col font-display text-sm text-white lg:text-xl">
            <JobsList jobs={jobs} />
          </div>
        </section>
      </main>
    </>
  );
}

import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
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
    <main className="flex w-full grow flex-col items-center">
      <Container>
        <section className="mb-[140px] flex w-full flex-col pb-10 pt-20 ">
          <Title level={TitleLevel.Display3}>Join our team</Title>
          <div className="flex w-full flex-col font-display text-sm text-white lg:text-xl">
            <JobsList />
          </div>
        </section>
      </Container>
    </main>
  );
}

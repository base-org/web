import { Hero } from 'apps/web/src/components/About/Hero';
import { BuildingBase } from 'apps/web/src/components/BuildingBase/BuildingBase';
import ContributorList from 'apps/web/src/components/CoreContributors/CoreContributors.json';
import { EnsAvatarMapping } from 'apps/web/src/components/CoreContributors/EnsAvatarMapping';
import { Divider } from 'apps/web/src/components/Divider/Divider';
import { GetConnected } from 'apps/web/src/components/GetConnected/GetConnected';
import { StartBuildingOnBase } from 'apps/web/src/components/StartBuildingOnBase/StartBuildingOnBase';
import Head from 'next/head';

export async function getStaticProps() {
  return {
    props: {
      owners: ContributorList,
    },
  };
}

type AboutProps = {
  owners: EnsAvatarMapping[];
};

export default function About({ owners }: AboutProps) {
  const ogData = {
    title: 'Base | About',
    description:
      'From the beginning, our secret master plan has been clear and consistent: create an open financial system that increases economic freedom globally by moving deliberately through four phases.',
    url: 'https://base.org/about',
  };
  return (
    <div>
      <Head>
        {/* Open-graph */}
        <meta key="og:url" property="og:url" content={ogData.url} />
        <meta key="og:title" property="og:title" content={ogData.title} />
        <meta key="og:description" property="og:description" content={ogData.description} />

        {/* Default */}
        <title key="title">{ogData.title}</title>
        <meta key="description" content={ogData.description} name="description" />
      </Head>
      <main className="flex w-full flex-col items-center bg-black">
        <Hero />
        <BuildingBase owners={owners} />
        <Divider />
        <StartBuildingOnBase />
        <Divider />
        <GetConnected />
      </main>
    </div>
  );
}

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
  return (
    <div>
      <Head>
        <title>Base | About</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <main className="flex w-full max-w-[1440px] flex-col items-center bg-black">
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

import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { BlackCircle } from 'apps/web/src/components/OnchainSummer/Circles';

function ResourcesCard({
  title,
  description,
  link,
  linkText,
}: {
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="flex min-w-[200px] flex-col justify-between gap-2 rounded-[5px] border-[1.5px] border-solid border-blue-600 p-4 hover:bg-ocsblue hover:text-white">
      <div className="flex flex-col">
        <span className="mb-8 text-2xl font-light md:text-4xl">{title}</span>
      </div>
      <div className="flex flex-col">
        <div className="text-lg">{description}</div>
        <div className="text my-4 uppercase">[→] {linkText}</div>
      </div>
    </div>
  );
}

export default function ResourcesBlock() {
  return (
    <div className="my-12 flex w-full max-w-[1200px] flex-col px-8">
      <div className="text-l flex flex-row items-center gap-2 font-mono uppercase">
        <BlackCircle /> Resources
      </div>
      <div className="my-6 flex flex-col gap-6">
        <span className="text-5xl font-extrabold leading-9 md:text-7xl">
          <Brit axis={147}>g</Brit>ET STARTE<Brit axis={147}>d</Brit>
        </span>
        <p className="mt-4 text-2xl">Everything you need to get started.</p>
      </div>

      <section className="mt-6 flex flex-col gap-4 md:flex-row">
        <ResourcesCard
          title="Base Docs"
          description="Everything from network information to tutorials"
          linkText="Learn more"
        />
        <ResourcesCard
          title="Base Camp"
          description="Learn smart contract development"
          linkText="Learn more"
        />
        <ResourcesCard
          title="Build Onchain Apps"
          description="Save time when building onchain experiences"
          linkText="Learn more"
        />
        <ResourcesCard
          title="Onchain Kit"
          description="React components and TypeScript utilities to build top-tier onchain apps"
          linkText="Learn more"
        />
        <ResourcesCard
          title="Smart Wallet"
          description="Integrate the SDK today and learn about Base credits"
          linkText="Learn more"
        />
      </section>
    </div>
  );
}

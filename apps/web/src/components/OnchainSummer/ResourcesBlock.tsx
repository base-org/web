import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { BlackCircle } from 'apps/web/src/components/OnchainSummer/Circles';
import { FadeInSection } from 'apps/web/src/components/OnchainSummer/FadeIns';

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
    <a
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className="flex min-w-[200px] flex-col justify-between gap-2 rounded-[5px] border-[1.5px] border-solid border-blue-600 p-4 hover:bg-ocsblue hover:text-white"
    >
      <div className="flex flex-col">
        <span className="mb-8 text-2xl font-light md:text-4xl">{title}</span>
      </div>
      <div className="flex flex-col">
        <div className="text-lg">{description}</div>
        <div className="text my-4 uppercase">[→] {linkText}</div>
      </div>
    </a>
  );
}

export default function ResourcesBlock() {
  return (
    <div className="my-12 flex w-full max-w-[1200px] flex-col px-8">
      <div className="text-l flex flex-row items-center gap-2 font-mono uppercase">
        <BlackCircle /> Resources
      </div>
      <FadeInSection>
        <div className="my-6 flex flex-col gap-6">
          <span className="text-5xl font-extrabold leading-9 md:text-7xl">
            <Brit axis={147}>g</Brit>ET STARTE<Brit axis={147}>d</Brit>
          </span>
          <p className="mt-4 text-2xl">Everything you need to get started.</p>
        </div>
      </FadeInSection>

      <FadeInSection delay={0.5}>
        <section className="mt-6 flex flex-col gap-4 md:flex-row">
          <ResourcesCard
            title="Base Docs"
            description="Everything from network information to tutorials"
            linkText="Learn more"
            link="https://docs.base.org/?utm_source=base&utm_medium=web&utm_campaign=onchainsummer"
          />
          <ResourcesCard
            title="Base Camp"
            description="Learn smart contract development"
            linkText="Learn more"
            link="https://docs.base.org/base-camp/docs/welcome?utm_source=base&utm_medium=web&utm_campaign=onchainsummer"
          />
          <ResourcesCard
            title="Build Onchain Apps"
            description="Save time when building onchain experiences"
            linkText="Learn more"
            link="https://buildonchainapps.xyz/?utm_source=base&utm_medium=web&utm_campaign=onchainsummer"
          />
          <ResourcesCard
            title="Onchain Kit"
            description="React components and TypeScript utilities to build top-tier onchain apps"
            linkText="Learn more"
            link="https://onchainkit.xyz/?utm_source=base&utm_medium=web&utm_campaign=onchainsummer"
          />
          <ResourcesCard
            title="Smart Wallet"
            description="Integrate the SDK today and learn about Base credits"
            linkText="Learn more"
            link="https://www.smartwallet.dev/why?utm_source=base&utm_medium=web&utm_campaign=onchainsummer"
          />
        </section>
      </FadeInSection>
    </div>
  );
}

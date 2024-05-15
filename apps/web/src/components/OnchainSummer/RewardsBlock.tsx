import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import {
  BlackCircle,
  EmptyBlackCircleFillToWhite,
} from 'apps/web/src/components/OnchainSummer/Circles';
import { FadeInSection } from 'apps/web/src/components/OnchainSummer/FadeIns';

function RewardCard({
  num,
  title,
  description,
  link = '',
  linkText = 'Learn more',
}: {
  num: string;
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
      className="group flex min-w-[350px] flex-col justify-between gap-12 rounded-[5px] border-[1.5px] border-solid border-blue-600 p-4 hover:bg-blue-600 hover:text-white md:w-[400px]"
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <EmptyBlackCircleFillToWhite />
          <span className="text-l font-mono font-light">{num}</span>
        </div>
        <span className="mb-8 font-display text-2xl font-light uppercase md:text-4xl">{title}</span>
      </div>
      <div className="flex flex-col">
        <div className="text-lg">{description}</div>
        <div className="text my-4 font-mono uppercase">[→] {linkText}</div>
      </div>
    </a>
  );
}

export default function RewardsBlock() {
  return (
    <div className="my-12 flex w-full max-w-[1200px] flex-col">
      <FadeInSection>
        <div className="text-l flex flex-row items-center gap-2 px-8 font-mono uppercase">
          <BlackCircle /> Rewards
        </div>
        <div className="my-6 flex flex-col md:flex-row md:items-end">
          <span className="px-8 text-5xl font-extrabold leading-9 md:text-7xl">
            <Brit axis={147}>b</Brit>
            UILD
            <br />
            <Brit>a</Brit>ND GET
            <br />
            REWAR<Brit axis={133}>d</Brit>ED
          </span>

          <span className="mt-6 px-8 text-2xl font-light md:text-4xl">
            200+ ETH in bounty rewards, plus gas credits and grants.
          </span>
        </div>
      </FadeInSection>
      <FadeInSection delay={0.5}>
        <div
          className="mt-6 flex w-full max-w-[1200px] flex-row gap-2 overflow-x-auto px-8 pb-6"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#000',
          }}
        >
          <RewardCard
            num="01"
            title="Onchain Summer Buildathon"
            description="A month-long virtual buildathon through the month of June, with 200 ETH in rewards."
            link="https://onchain-summer.devfolio.co/"
          />
          <RewardCard
            num="02"
            title="Gas Credits"
            description="Sponsor transactions and offer gasless experiences. Available through the Coinbase Developer Platform and other builders."
            linkText="Claim today"
            link="https://www.coinbase.com/developer-platform?utm_source=bases&utm_medium=web&utm_campaign=onchainsummer&utm_content=gascredits"
          />
          <RewardCard
            num="03"
            title="Builder Grants"
            description="Small retroactive grants (1-5 ETH) for early projects. Build and tag us in /base on Warpcast."
            link="https://paragraph.xyz/@grants.base.eth/calling-based-builders"
          />
          <RewardCard
            num="04"
            title="Rounds Grants"
            description="No project is too big or too small. Share what you’re building every Friday on /base-builds for a grant opportunity."
            link="https://warpcast.com/~/channel/base-builds"
            linkText="Check it out"
          />
          <RewardCard
            num="05"
            title="Optimism RPGF"
            description="Projects built on Base are eligible for Optimism PGF."
            link="https://community.optimism.io/docs/governance/retropgf-3/"
          />
        </div>
        <span className="px-8">SCROLL &gt;</span>
        <div className="ml-8 h-[3px] w-[90px] bg-black px-8" />
        <div className="mx-8 h-[1px] w-[300px] bg-black px-8" />
      </FadeInSection>
    </div>
  );
}

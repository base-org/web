import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { BlackCircle, EmptyBlackCircle } from 'apps/web/src/components/OnchainSummer/Circles';

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
    <div className="flex min-w-[200px] flex-col justify-between gap-2 rounded-[5px] border-[1.5px] border-solid border-blue-600 p-4 hover:bg-blue-600 hover:text-white">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <EmptyBlackCircle />
          <span className="text-l font-mono font-light">{num}</span>
        </div>
        <span className="mb-8 text-2xl font-light md:text-4xl">{title}</span>
      </div>
      <div className="flex flex-col">
        <div className="text-lg">{description}</div>
        <div className="text my-4 uppercase">[→] {linkText}</div>
      </div>
    </div>
  );
}

export default function RewardsBlock() {
  return (
    <div className="my-12 flex w-full max-w-[1200px] flex-col">
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
      <div
        className="flex w-full max-w-[1200px] flex-row gap-2 overflow-x-auto px-8 pb-6"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#000',
        }}
      >
        <RewardCard
          num="01"
          title="Onchain Summer Buildathon"
          description="A month-long virtual buildathon through the month of June, with 200 ETH in rewards."
        />
        <RewardCard
          num="02"
          title="Gas Credits"
          description="Sponsor transactions and offer gasless experiences. Available through the Coinbase Developer Platform and other builders."
        />
        <RewardCard
          num="03"
          title="Builder Grants"
          description="Small retroactive grants (1-5 ETH) for early projects. Build and tag us in /base on Warpcast."
        />
        <RewardCard
          num="04"
          title="Rounds Grants"
          description="No project is too big or too small. Share what you’re building every Friday on /base-builds for a grant opportunity."
        />
        <RewardCard
          num="05"
          title="Optimism RPGF"
          description="Projects built on Base are eligible for Optimism PGF."
        />
      </div>
      <span className="px-8 md:hidden">SCROLL &gt;</span>
    </div>
  );
}

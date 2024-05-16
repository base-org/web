import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { BlackCircle, EmptyBlackCircle } from 'apps/web/src/components/OnchainSummer/Circles';
import { OCSButton } from 'apps/web/src/components/OnchainSummer/OCSButton';
import Image from 'next/image';
import giantB from 'apps/web/public/images/ocs/giantB.svg';
import { FadeInSection } from 'apps/web/src/components/OnchainSummer/FadeIns';

function EventCard({
  num,
  title,
  description,
}: {
  num: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col justify-between gap-2 rounded-[5px] border-[1.5px] border-solid border-black p-4 duration-200 hover:bg-[#E9E8E8] md:min-h-[360px] lg:w-[400px] lg:min-w-[200px]">
      <div className="flex flex-col md:gap-16">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <EmptyBlackCircle />
            <span className="text-l font-mono font-light">{num}</span>
          </div>
          <span className="mb-8 text-2xl font-light md:text-4xl">{title}</span>
        </div>
      </div>
      <div className="text-lg">{description}</div>
    </div>
  );
}

function HackathonSlab() {
  return (
    <div className="flex max-w-[1200px] flex-col pb-12 pt-8 md:px-8">
      <FadeInSection>
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2 text-sm font-light">
              <EmptyBlackCircle /> JUNE
            </div>
            <h1 className="text-5xl font-light md:text-7xl">Buildathon_</h1>
            <p className="mt-4 max-w-[400px] text-lg">
              Kick off Onchain Summer by participating in a global virtual hackathon hosted by Base
              and track sponsors including Stripe, Shopify, Farcaster, Zora, Fleek, thirdweb, Nouns,
              Aerodrome, and Synthetix.
            </p>
            <div className="mb-6 w-fit">
              <a
                href="https://onchain-summer.devfolio.co/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <OCSButton variant="primaryDark">Learn More</OCSButton>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-end md:w-1/2">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <Image src={giantB} alt="Giant B" />
          </div>
        </div>
      </FadeInSection>

      <FadeInSection delay={0.5}>
        <section className="flex flex-col gap-4 md:flex-row">
          <EventCard
            num="01"
            title="200 ETH IN REWARDS"
            description="Split across tracks and teams; every winning team is eligible for 2-10 ETH"
          />
          <EventCard
            num="02"
            title="COMMUNITY TRACK HOSTED BY BOUNTYCASTER"
            description="Challenge the community with your ideas or pick up challenges that spark your interest"
          />
          <EventCard
            num="03"
            title="BONUS REWARD POOL"
            description="Make your app even easier to use with Coinbase integrations, and unlock additional rewards. Plus, a chance to get featured on the Onchain Summer homepage."
          />
        </section>
      </FadeInSection>
    </div>
  );
}

export default function EventsBlock() {
  return (
    <>
      <div className="mb- mt-12 flex w-full max-w-[1200px] flex-col">
        <div className="text-l flex flex-row items-center gap-2 px-8 font-mono uppercase">
          <BlackCircle /> Events
        </div>
        <div className="my-6 flex flex-col md:flex-row md:items-end">
          <span className="px-8 text-5xl font-extrabold leading-9 md:text-7xl">
            J<Brit axis={147}>o</Brit>IN <Brit axis={183}>u</Brit>S ON<Brit axis={60}>c</Brit>HAIN
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col items-center rounded-[6px] bg-ocspink p-8">
        <HackathonSlab />
      </div>
    </>
  );
}

import { HowItWorksCard } from 'apps/web/src/components/Bootcamp/HowItWorks/HowItWorksCard';

const featureItems = [
  {
    number: '1',
    title: 'Apply',
    description: (
      <div className="text-md font-sans text-white">
        <p>We are looking for crypto proficient, senior-level Web2 Engineers who want to acquire the skills necessary to build dApps.</p>

        <br />

        <p>Once you submit your application, please give us 5 to 7 days to respond.
        </p>
      </div>
    ),
  },
  {
    number: '2',
    title: 'Onboard',
    description:
      'Upon acceptance, you will be invited to the Base Bootcamp Onboarding Course where you will receive all relevant onboarding materials (student handbook, mentor-pairing info, invite to private Base Bootcamp Discord channel, invite to launch day, etc).',
  },
  {
    number: '3',
    title: 'Kickoff',
    description: 'On day 1 of your cohort we will gather via Google Meet for our initial kick-off. From here, we’ll pair you with your mentor (an experienced Smart Contract Developer) and you’ll start the program.',
  },
  {
    number: '4',
    title: 'Build!',
    description: (
      <div className="text-md font-sans text-white">
        <p>For 8 weeks, you’ll meet with your mentor and work asynchronously through our <a className="underline" target="_blank" href="https://docs.base.org/base-camp/docs/welcome">Base Camp curriculum</a>. During the final 2 weeks of the program you’ll build your final project - a real world dApp, which you’ll demo virtually on Demo Day.</p>

        <br />

        <p>Upon graduation, you’ll earn an exclusive soulbound <a className="underline" href="https://opensea.io/collection/base-bootcamp-grad" target="_blank">Base Bootcamp Grad NFT</a>.
        </p>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col space-y-24 bg-black px-8 pt-12">
      <div className="flex w-full flex-col font-display text-3xl text-white md:text-5xl lg:text-6xl">
        <p>How it works</p>
      </div>
      <div className="scrollbar flex w-full flex-row justify-between space-x-6 overflow-x-auto pb-12 2xl:overflow-x-hidden">
        {featureItems.map((item) => (
          <HowItWorksCard key={item.number} featureItem={item} />
        ))}
      </div>
    </div>
  );
}

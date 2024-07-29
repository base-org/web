import { FeatureCard } from 'apps/web/src/components/Features/FeatureCard';

function OpenSourceDescription() {
  return (
    <p className="text-md font-sans text-white">
      Base is built on Optimism’s open-source{' '}
      <a href="http://optimism.io" target="_blank" rel="noreferrer noopener" className="underline">
        OP Stack
      </a>
      . We’re joining as the second Core Dev team working on the OP Stack to ensure it’s a public
      good available to everyone; and contributing a portion of sequencer revenue to funding public
      goods.
    </p>
  );
}

const featureItems = [
  {
    icon: 'ethereum',
    title: 'Ethereum L2',
    description:
      'Base is built as an Ethereum L2, with the security, stability, and scalability you need to power your onchain apps. Confidently deploy any EVM codebase and onramp your users and assets from Ethereum L1, Coinbase, and other interoperable chains.',
  },
  {
    icon: 'base',
    title: (
      <div className="font-mono text-lg uppercase text-white">
        <p>Big features,</p>
        <p>small fees</p>
      </div>
    ),
    description:
      'Get the EVM environment at a fraction of the cost. Get early access to Ethereum features like Account Abstraction (ERC4337), simple developer APIs for gasless transactions, and smart contract wallets.',
  },
  {
    icon: 'terminal',
    title: (
      <div className="font-mono text-lg uppercase text-white">
        <p>Open Source,</p>
        <p>powered by Optimism</p>
      </div>
    ),
    description: <OpenSourceDescription />,
  },
  {
    icon: 'coinbase',
    title: 'Scaled by Coinbase',
    description:
      'Base is an easy way for decentralized apps to leverage Coinbase’s products and distribution. Seamless Coinbase integrations, easy fiat onramps, and access to the $130B assets on platform in the Coinbase ecosystem.',
  },
];

export async function Features() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col space-y-24 bg-black px-8 pt-12">
      <div className="flex w-full flex-col font-display text-3xl text-white md:text-5xl lg:text-6xl">
        <h2>
          Making Ethereum
          <br />
          accessible to <span className="italic">everyone</span>
        </h2>
      </div>
      <div className="scrollbar flex w-full flex-row justify-between space-x-6 overflow-x-auto pb-12 2xl:overflow-x-hidden">
        {featureItems.map((item) => (
          <FeatureCard key={item.icon} featureItem={item} />
        ))}
      </div>
    </div>
  );
}

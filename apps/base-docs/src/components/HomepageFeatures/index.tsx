import clsx from 'clsx';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Secured by Ethereum',
    description: (
      <>
        Base is an Ethereum L2 built with the security and scalability you need to power your
        decentralized apps. Confidently onramp and secure user assets from L1 and easily
        interoperate with other L2 chains.
      </>
    ),
  },
  {
    title: 'Big features, small fees',
    description: (
      <>
        Get the EVM environment at a fraction of the cost. Get early access to Ethereum features
        like Account Abstraction (ERC4337), simple developer APIs for gasless transactions, and
        smart contract wallets.
      </>
    ),
  },
  {
    title: 'Open source',
    description: (
      <>
        Base is built on the MIT-licensed OP Stack, in collaboration with Optimism. We’re joining as
        the second Core Dev team working on the OP Stack to ensure it’s a public good available to
        everyone.
      </>
    ),
  },
  {
    title: 'Scaled by Coinbase',
    description: (
      <>
        Base is the easiest way for decentralized apps to leverage Coinbase’s products and
        distribution. Seamless Coinbase integrations, easy fiat onramps, and access to 100m+ users
        and $100B+ assets in the Coinbase ecosystem.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4 feature margin-vert--lg margin-horiz--lg')}>
      <div className="text--center padding--md">
        <h3 className="feature-title">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row feature-row">
          {FeatureList.map((props, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

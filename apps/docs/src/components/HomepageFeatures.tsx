import Link from '@docusaurus/Link';
import clsx from 'clsx';

import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Secured by Ethereum',
    description: (
      <>
        {
          "Base is a layer-2 optimistic rollup which inherits security from Ethereum. Read about Base's "
        }
        <Link to="/docs/security">security properties</Link>.
      </>
    ),
  },
  {
    title: 'Operated by Coinbase',
    description: (
      <>
        The most trusted company in crypto. Read our <Link to="/docs/about/roadmap"> roadmap</Link>.
      </>
    ),
  },
  {
    title: 'Built by you',
    description: (
      <>
        Get started with our{' '}
        <Link to="/docs/developers/building-on-base">guide to building on Base.</Link>
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

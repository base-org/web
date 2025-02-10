import { Card, CardProps } from 'apps/web/src/components/Developers/Shared/Card';
import faces from 'apps/web/src/components/Developers/Appchains/lighteningBolt.svg';
import complianceProduct from 'apps/web/src/components/Developers/Appchains/complianceProduct.svg';
import globe from 'apps/web/src/components/Developers/Appchains/globe.svg';
import Image, { StaticImageData } from 'next/image';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Title from 'apps/web/src/components/base-org/typography/Title';

const INFO_CARDS: CardProps[] = [
  {
    icon: (
      <Image
        src={faces as StaticImageData}
        alt="faces"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Builder-friendly fees',
    description:
      'Base charges a competitive, fixed monthly service fee. No complicated vendor commitments, no negotiating for best price (already is), and no sequencer fees.',
  },
  {
    icon: (
      <Image
        src={complianceProduct as StaticImageData}
        alt="complianceProduct"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Enterprise-grade infra',
    description:
      'Fully-managed sequencers and nodes, maintenance and upgrades, and block explorer. Plus real-time monitoring and alerts for any disruptions in chain performance.',
  },
  {
    icon: (
      <Image
        src={globe as StaticImageData}
        alt="globe"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Base developer tools',
    description:
      'Seamless integration with Smart Wallet, Paymaster, Bundler, OnchainKit, and AgentKit — right out of the box — to help you build and grow your app.',
  },
];

export function L2InfoCards() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Title level={TitleLevel.Title1}>Everything that makes Base the fastest growing L2.</Title>
      <div className="grid w-full grid-cols-1 gap-20 md:grid-cols-3">
        {INFO_CARDS.map((card) => {
          return (
            <Card
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              iconClassName="text-[#C9A4FA]"
            />
          );
        })}
      </div>
    </div>
  );
}

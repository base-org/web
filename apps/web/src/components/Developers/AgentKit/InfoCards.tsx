import { Card, CardProps } from 'apps/web/src/components/Developers/Shared/Card';
import dropsActive from 'apps/web/src/components/Developers/AgentKit/dropsActive.svg';
import blockchain from 'apps/web/src/components/Developers/AgentKit/blockchain.svg';
import metaverse from 'apps/web/src/components/Developers/AgentKit/metaverse.svg';
import Image from 'next/image';

const INFO_CARDS: CardProps[] = [
  {
    icon: <Image src={dropsActive} alt="dropsActive" width={32} height={32} className="h-8 w-8" />,
    title: 'No coding required',
    description:
      'Use our videos and templates to create an AgentKit agent in less than five minutes. No development experience required.',
  },
  {
    icon: <Image src={blockchain} alt="blockchain" width={32} height={32} className="h-8 w-8" />,
    title: 'Built-in onchain',
    description:
      'Secure access to features for reliable onchain operations, including trades, transfers, and contract deployments.',
  },
  {
    icon: <Image src={metaverse} alt="metaverse" width={32} height={32} className="h-8 w-8" />,
    title: 'Infinitely customizable',
    description:
      "AgentKit can be used with any framework, any model, and with as many or as little actions as you'd like.",
  },
];

export function InfoCards() {
  return (
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
  );
}

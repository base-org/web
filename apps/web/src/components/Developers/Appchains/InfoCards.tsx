import { Card, CardProps } from 'apps/web/src/components/Developers/Shared/Card';
import lightningBolt from 'apps/web/src/components/Developers/Appchains/lighteningBolt.svg';
import taxesReceipt from 'apps/web/src/components/Developers/Appchains/taxesReceipt.svg';
import perpetualSwap from 'apps/web/src/components/Developers/Appchains/perpetualSwap.svg';
import Image, { StaticImageData } from 'next/image';

const INFO_CARDS: CardProps[] = [
  {
    icon: (
      <Image
        src={lightningBolt as StaticImageData}
        alt="lightningBolt"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'High-speed, low-cost throughput ',
    description:
      'Faster transactions with one-second block times, roundtrips in less than 10 seconds, all for a fraction of a cent.',
  },
  {
    icon: (
      <Image
        src={taxesReceipt as StaticImageData}
        alt="taxesReceipt"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Access to millions of users',
    description:
      "Access to the Base ecosystem and Coinbase retail users through direct send and receive with Coinbase's custodial platform.",
  },
  {
    icon: (
      <Image
        src={perpetualSwap as StaticImageData}
        alt="perpetualSwap"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Open-source',
    description:
      'Built on the OP Enclave framework for fast withdrawals and a seamless integration between your appchain and Base.',
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

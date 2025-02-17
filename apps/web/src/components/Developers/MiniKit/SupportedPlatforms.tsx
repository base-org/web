import bg1 from 'apps/web/src/components/Developers/MiniKit/bg1.png';
import bg2 from 'apps/web/src/components/Developers/MiniKit/bg2.png';
import walletLogo from 'apps/web/src/components/Developers/MiniKit/walletLogo.svg';
import warpcastLogo from 'apps/web/src/components/Developers/MiniKit/warpcastLogo.svg';
import Image, { StaticImageData } from 'next/image';
import Title from 'apps/web/src/components/base-org/typography/Title';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ReactNode } from 'react';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';

type SupportedPlatformCardProps = {
  title?: string;
  value: string;
  description: string;
  image: StaticImageData;
  logo: ReactNode;
};

function SupportedPlatformCard({
  title,
  value,
  description,
  image,
  logo,
}: SupportedPlatformCardProps) {
  return (
    <div className="relative flex min-h-[212px] flex-col justify-between gap-10 overflow-hidden rounded-lg p-6">
      <Image src={image} alt="Template background" layout="fill" objectFit="cover" />
      <div className="z-10 flex items-center gap-2 text-white">
        {logo}
        {title && (
          <Title level={TitleLevel.Title4} className="font-bold">
            {title}
          </Title>
        )}
      </div>

      <div className="z-10 flex flex-col">
        <Title level={TitleLevel.Title1}>{value}</Title>
        <Text variant={TextVariant.Body}>{description}</Text>
      </div>
    </div>
  );
}

export function SupportedPlatforms() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div>
        <Title level={TitleLevel.Title1}>
          Supported platforms.{' '}
          <Title level={TitleLevel.Title1} as="span" className="text-dark-palette-foregroundMuted">
            Reach millions instantly with a new lines of code.
          </Title>
        </Title>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <SupportedPlatformCard
          description="A sufficiently decentralized social network"
          value="Warpcast"
          image={bg2}
          logo={
            <Image
              src={warpcastLogo as StaticImageData}
              alt="Warpcast logo"
              width={18}
              height={16}
            />
          }
        />
        <SupportedPlatformCard
          description="Coming soon"
          value="Coinbase Wallet"
          image={bg1}
          logo={
            <Image src={walletLogo as StaticImageData} alt="Wallet logo" width={20} height={20} />
          }
        />
      </div>
    </div>
  );
}

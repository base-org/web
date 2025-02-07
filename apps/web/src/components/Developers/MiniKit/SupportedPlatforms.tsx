import bg1 from 'apps/web/src/components/Developers/MiniKit/bg1.png';
import bg2 from 'apps/web/src/components/Developers/MiniKit/bg2.png';
import Image, { StaticImageData } from 'next/image';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

type SupportedPlatformCardProps = {
  title: string;
  value: string;
  description: string;
  image: StaticImageData;
};

function SupportedPlatformCard({ title, value, description, image }: SupportedPlatformCardProps) {
  return (
    <div className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-lg p-6">
      <Image src={image} alt="Template background" layout="fill" objectFit="cover" />
      <Title level={TitleLevel.Title3} className="z-10">
        {title}
      </Title>

      <div className="z-10 flex flex-col gap-2">
        <Title level={TitleLevel.Display1}>{value}</Title>
        <Title level={TitleLevel.Headline}>{description}</Title>
      </div>
    </div>
  );
}

export function SupportedPlatforms() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="p-4">
        <Title level={TitleLevel.Title1}>
          Supported platforms.{' '}
          <Title level={TitleLevel.Title1} as="span" className="text-dark-palette-foregroundMuted">
            Reach millions instantly with a new lines of code.
          </Title>
        </Title>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <SupportedPlatformCard
          title="Coinbase Wallet"
          description="Daily Active Users"
          value="10M"
          image={bg1}
        />
        <SupportedPlatformCard
          title="Warpcast"
          description="Daily Active Users"
          value="12K"
          image={bg2}
        />
      </div>
    </div>
  );
}
